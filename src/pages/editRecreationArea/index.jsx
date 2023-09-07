import Navigation from "../../components/commom/Nav";
import Door from "../../assets/Door.svg";
import Image from "next/image";
import InfoAptoForm from "../../components/InfoAptoForm";
import sucess_img from "../../assets/sucess_img.svg"
import unsaved from "../../assets/unsaved.svg"

import {
  Container,
  Main,
  Header,
  FotosArea,
  LeftSide,
  InfoApto,
  RightSide,
  ButtonArea,
  InfoBox,
  RedirectArea,
  CautionBox,
} from "../../styles/apartamentoStyles";
import AptoTexts from "../../components/AptoTexts";
import AptoItens from "../../components/AptoItens";
import RegrasApto from "../../components/RegrasApto";
import { useEffect, useState } from "react";
import leftArrow from "../../assets/leftArrow.svg";
import Button from "../../components/commom/Button";
import GridFotos from "../../components/GridFotos";
import { useAuth } from "../../contexts/AuthContext";
import * as service from "../../services/recreationArea";
import ConfirmButtons from "../../components/commom/ConfirmButtons";
import CalendarButton from "../../components/CalendarButton";
import { v4 as uuid } from "uuid";
import { Modal } from "../../components/commom/Modal";
import cancel_img from "../../assets/cancel_alterations.svg";
import { ModalOneButton } from "../../components/commom/ModalOneButton";
import { useRouter } from "next/router";
import AlertModal from "../../components/commom/AlertModal";

const editApartment = () => {
  // INFORMACOES DO APTO
  const [description, setDescription] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [aptoTitle, setAptoTitle] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(0)
  const [radioInputs, setRadioInputs] = useState([]);
  const [locais, setLocais] = useState([]);
  const [regras, setRegras] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [datas, setDatas] = useState([]);
  const [urlRec, setUrlRec] = useState("");

  // State para funcao de cancelar alteracoes e salvar Alteracoes
  const [oldData, setOldData] = useState([]);

  // Modal de alertar alteracao
  const [showCautionMsg, setShowCautionMsg] = useState(false);
  const [cancelAll, setCancelAll] = useState(false);
  const [saveAll, setSaveAll] = useState(false);

  // Modal de cancelar e salvar Alteracao
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showModalUnsaved, setShowModalUnsaved] = useState(false);
  const [showModalAlterations, setShowModalAlterations] = useState({
    boolean: false,
    text: "Alterações Salvas"
  });

  // ITENS
  const [itensApto, setItensApto] = useState([]);
  const [commumArea, setCommunAreas] = useState([]);

  const authContext = useAuth();
  const router = useRouter();

  useEffect(() => {
    getRecreationInfo();
  }, []);

  // REQUISICAO POST
  const updateRequisicaoRA = () => {
    var itens = [];
    itensApto.map((data) => {
      if (data.checked) {
        itens.push(data.name);
      }
    });

    var areas = [];
    commumArea.map((data) => {
      if (data.checked) areas.push(data.name);
    });

    var locaisValues = [];
    locais.map((data) => {
      if (data.value != "") {
        locaisValues.push(data.value);
      }
    });

    var regrasValues = [];
    regras.map((data) => {
      if (data.value != "") {
        regrasValues.push(data.value);
      }
    });

    var images = [];
    fotos.forEach((data) => {
      if (data.name != "") {
        var img = data.file;
        images.push(img);
      }
    });

    if(aptoTitle == "" || address == "" || capacity == 0){
      
    }else{

    var req = {
      titulo: aptoTitle,
      endereco: address,
      tipo: radioInputs.tipo,
      andar: radioInputs.andar == "Terreo" ? 0 : 1,
      suite: radioInputs.suite,
      wifi: radioInputs.wifi,
      animais: radioInputs.animais,
      diaria: parseFloat(dailyRate),
      capacidadeMaxima: capacity,
      descricao: description,
      itens: itens,
      areasComuns: areas,
      locaisArredores: locaisValues,
      regrasConvivencia: regrasValues,
      images: images
    };

    service.updateRecreationArea(authContext.token, req, urlRec);
  }
  };

  // REQUISICAO GET DO AREA
  const getRecreationInfo = async () => {
    var { data } = await service.getRecreationArea(authContext.token, localStorage.urlAmbient);
    setUrlRec(localStorage.urlAmbient)

    modelData(data);
    setOldData(data);
  };

  const modelData = (data) => {
    // Itens
    var itens = data.itens;
    var objItens = getItens(itens);
    setItensApto(objItens);

    // Areas
    var areas = getItens(data.areasComuns);
    setCommunAreas(areas);

    // Regras
    var rules = data.regrasConvivencia;
    var obj = [];
    rules.forEach((data, key) => {
      var item = {
        id: uuid(),
        placeholder:
          "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
        value: data,
      };
      obj.push(item);
    });
    setRegras(obj);

    // Locais nos arredores
    var locaisNosArredores = data.locaisArredores;
    var obj = [];
    locaisNosArredores.forEach((data, key) => {
      var item = {
        id: uuid(),
        placeholder:
          "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
        value: data,
      };
      obj.push(item);
    });
    setLocais(obj);

    // Descricao
    var descricao = data.descricao;
    setDescription(descricao);

    // Valor da diaria
    var diaria = data.diaria;
    setDailyRate(diaria);

    // CAPACIDADE MAXIMA
    setCapacity(data.capacidadeMaxima)


    // TITULO
    var title = data.titulo;
    setAptoTitle(title);

    // ENDERECO
    var endereco = data.endereco;
    setAddress(endereco);

    // RADIOS INPUTS
    var tipo = data.tipo;
    var andar = data.andar;
    var wifi = data.wifi;
    var animais = data.animais;
    var suite = data.suite;
    var obj = {
      tipo: tipo,
      andar: andar,
      suite: suite,
      wifi: wifi,
      animais: animais,
    };
    setRadioInputs(obj);

    // Images
    var imgs = data.pictures;
    var obj = [];
    for (let idx = 0; idx < 7; idx++) {
      var item = {
        id: idx,
        name: "",
        file: imgs[idx] != undefined ? imgs[idx] : "",
      };
      obj.push(item);
    }
    setFotos(obj);
  };

  // MODELA OS DADOS DOS ITENS
  const getItens = (itens) => {
    var obj = [];
    itens.forEach((data) => {
      obj.push({
        name: data,
        checked: true,
      });
    });
    return obj;
  };

  // FUNCOES RELACIONADAS AOS BOTOES DO MODAL DE CUIDADO
  const handleCancelAll = () => {
    setCancelAll(true);
    setShowCautionMsg(false);
    modelData(oldData);
    setShowCancelModal(false)
  };

  const handleSaveAll = () => {
    setSaveAll(true);
    setShowCautionMsg(false);
    updateRequisicaoRA()
  };

  const checkAlterations = () => {
    if(showCautionMsg){
      setShowModalUnsaved(true)
    }else{
      router.push("/manageReservations")
    }
  }

  const routeToAmbientData = () => {
    if(showCautionMsg){
      setShowModalUnsaved(true)
    }else{
      router.push("/ambienteDados")
    }
  }

  return (
    <Container>
      <Header>
        <Navigation variant={"admin"} />
      </Header>
      <Main>
        <RedirectArea>
          <Button
            onClick={() => checkAlterations()}
            variant={"image"}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1vw",
              alignItens: "center",
            }}
          >
            <Image onClick={() => checkAlterations()} src={leftArrow} alt={"arrow"}></Image>
            <a onClick={() => checkAlterations()}> Todos as Áreas de Lazer </a>
            <a>/</a>
            <a onClick={() => routeToAmbientData()}>Dados da Área de Lazer </a>
            <a>/</a>
            <a>Editar Área de Lazer </a>
          </Button>
        </RedirectArea>
        <h2 style={{ marginBottom: "3vh" }}>Editar a Área de Lazer</h2>
        <FotosArea onClick={() => setShowCautionMsg(true)}>
          <h3>Adicionar Fotos da Áreas de Lazer</h3>
          <GridFotos Images={fotos} setImages={setFotos}></GridFotos>
        </FotosArea>
        <InfoApto onClick={() => setShowCautionMsg(true)}>
          <LeftSide>
            <ButtonArea>
                <CalendarButton datas={datas} setDatas={setDatas} />
            </ButtonArea>
            <InfoBox>
              <InfoAptoForm
                mainTitle={"Informações do Espaço"}
                setAptoTitle={setAptoTitle}
                setAddress={setAddress}
                radioInput={radioInputs}
                setRadioInput={setRadioInputs}
                title={aptoTitle}
                address={address}
                capacity={capacity}
                setCapacity={setCapacity}
              />
            </InfoBox>
            <InfoBox>
              <AptoItens
                title={"Itens do Espaço"}
                itens={commumArea}
                setItens={setCommunAreas}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
              />
            </InfoBox>
            <InfoBox>
              <AptoTexts
                title={"Adicione Valor da Diária desse espaço"}
                placeholder={"Valor por Diária"}
                type={"number"}
                setText={setDailyRate}
                text={dailyRate}
              />
            </InfoBox>
          </LeftSide>
          <RightSide>
            <InfoBox>
              <AptoTexts
                title={"Descrição"}
                placeholder={
                  "Coloque aqui mais informações sobre o apartamento, mais regras de convivência e detalhes adicionais"
                }
                setText={setDescription}
                text={description}
                required
              />
            </InfoBox>
            <InfoBox>
              <RegrasApto
                title={"Regras de convivencia"}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
                inputsBase={regras}
                setInputsBase={setRegras}
              />
            </InfoBox>
            <InfoBox>
              <RegrasApto
                title={"Locais nos Arredores"}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
                inputsBase={locais}
                setInputsBase={setLocais}
              />
            </InfoBox>
          </RightSide>
        </InfoApto>

        {showCautionMsg && (
          <CautionBox>
            <h3 style={{ color: "#3C3E45" }}>
              Cuidado - você tem alterações que não foram salvas!
            </h3>
            <ConfirmButtons
              handleCancel={() => setShowCancelModal(true)}
              save={() => {
                handleSaveAll()
              }}
            ></ConfirmButtons>
          </CautionBox>
        )}

        {showCancelModal && (
          <Modal
            title="Cancelar Alterações"
            img={cancel_img.src}
            asideText="Deseja realmente cancelar as alterações não salvas?"
            ConfirmText="SALVAR ALTERAÇÕES"
            ConfirmColor="Green"
            CancelText="CANCELAR ALTERAÇÕES"
            handleCancel={() => {
              handleCancelAll()
              setShowCancelModal(false)
            }}
            handleSave={() => {
              handleSaveAll()
              setShowCancelModal(false)
              setShowSaveModal(true)
            }}
          />
        )}

        {showModalUnsaved && (
          <Modal
            title="Alterações Não Salvas"
            img={unsaved.src}
            asideText="Deseja sair sem salvar as alterações?"
            ConfirmText="SIM"
            ConfirmColor="Green"
            CancelText="NÃO"
            handleCancel={() => {
              handleSaveAll()
              setShowModalUnsaved(false)
              setShowModalAlterations({boolean: true, text: "Alterações Salvas"})
              setTimeout(() => {
                router.push("/manageReservations")
              ,[10000]})
            }}
            handleSave={() => {
              handleCancelAll()
              setShowModalUnsaved(false)
              setShowModalAlterations({boolean: true, text: "Alterações não Salvas"})
              setTimeout(() => {
                router.push("/manageReservations")
              ,[1000]})
            }}
          />
        )}

        {showModalAlterations.boolean && (
            <AlertModal
              title={showModalAlterations.text}
            />
        )}

        {
          showSaveModal && (
              <ModalOneButton
                title={"SUCESSO"}
                asideText={"Alterações salvas com sucesso!"}
                img={sucess_img.src}>
              </ModalOneButton>
          )
        }
      </Main>
    </Container>
  );
};

export default editApartment;
