import Navigation from "../../components/commom/Nav";
import Door from "../../assets/Door.svg";
import Image from "next/image";
import InfoAptoForm from "../../components/InfoAptoForm";
import sucess_img from "../../assets/sucess_img.svg"

import {
  Container,
  Main,
  Header,
  FotosArea,
  BusyButton,
  LeftSide,
  InfoApto,
  RightSide,
  CalendarWrapper,
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
import * as service from "../../services/Apto";
import ConfirmButtons from "../../components/commom/ConfirmButtons";
import CalendarButton from "../../components/CalendarButton";
import { v4 as uuid } from "uuid";
import { Modal } from "../../components/commom/Modal";
import cancel_img from "../../assets/cancel_alterations.svg";
import { ModalOneButton } from "../../components/commom/ModalOneButton";
import DarkBackground from "../../components/commom/DarkBackground";

const editApartment = () => {
  // INFORMACOES DO APTO
  const [description, setDescription] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [aptoTitle, setAptoTitle] = useState("");
  const [address, setAddress] = useState("");
  const [camas, setCamas] = useState([]);
  const [radioInputs, setRadioInputs] = useState([]);
  const [locais, setLocais] = useState([]);
  const [regras, setRegras] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [datas, setDatas] = useState([]);

  // State para funcao de cancelar alteracoes e salvar Alteracoes
  const [oldData, setOldData] = useState([]);

  // Modal de alertar alteracao
  const [showCautionMsg, setShowCautionMsg] = useState(false);
  const [cancelAll, setCancelAll] = useState(false);
  const [saveAll, setSaveAll] = useState(false);

  // Modal de cancelar e salvar Alteracao
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false)

  // ITENS
  const [itensApto, setItensApto] = useState([]);
  const [commumArea, setCommunAreas] = useState([]);

  const authContext = useAuth();

  useEffect(() => {
    getApartmentInfo();
  }, []);

  // REQUISICAO POST
  const postRequisicaoApto = () => {
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
        var img = URL.createObjectURL(data.file);
        images.push(img);
      }
    });

    var req = {
      titulo: aptoTitle,
      endereco: address,
      tipo: radioInputs.tipo,
      andar: radioInputs.andar == "Terreo" ? 0 : 1,
      suite: radioInputs.suite,
      wifi: radioInputs.wifi,
      animais: radioInputs.animais,
      diaria: parseFloat(dailyRate),
      camas: camas,
      descricao: description,
      itens: itens,
      areasComuns: areas,
      locaisArredores: locaisValues,
      regrasConvivencia: regrasValues,
      images: images,
      reservas: [
        {
          dataInicial: datas[0],
        },
        {
          dataFinal: datas[1] ? datas[1] : datas[0],
        },
      ],
    };

    console.log(req);

    //service.createApartament(req, authContext.urlUser, authContext.token);
  };
  // REQUISICAO GET DO APARTAMENTO
  const getApartmentInfo = async () => {
    var { data } = await service.getAllApartaments(authContext.token);

    modelData(data[3]);
    setOldData(data[3]);
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

    // CAMAS
    var descricao = data.camas;
    var obj = [];
    descricao.forEach((data) => {
      var item = {
        id: uuid(),
        tipo: data.tipo,
        Quantidade: data.quantidade ? data.quantidade : 1,
      };
      obj.push(item);
    });
    setCamas(obj);

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

    // Datas
    if (data.reservas.length > 0) {
      var dates = data.reservas;
      var obj = [];
      obj.push(dates.dataInicial);
      obj.push(dates.dataFinal);
      setDatas(obj);
    }

    // Images
    var imgs = data.images;
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
    setShowCancelModal(!showCancelModal)
  };

  const handleSaveAll = () => {
    setSaveAll(true);
    setShowCautionMsg(false);
  };

  return (
    <Container>
      <Header>
        <Navigation variant={"admin"} />
      </Header>
      <Main>
        <RedirectArea onClick={postRequisicaoApto}>
          <Button
            variant={"image"}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1vw",
              alignItens: "center",
            }}
          >
            <Image src={leftArrow} alt={"arrow"}></Image>
            <a>Todos os Apartamentos </a>
            <a>/</a>
            <a>Dados do Apartamentos </a>
            <a>/</a>
            <a>Editar Apartamento </a>
          </Button>
        </RedirectArea>
        <h2 style={{ marginBottom: "3vh" }}>Editar o Apartamento</h2>
        <FotosArea onChange={() => setShowCautionMsg(true)}>
          <h3>Adicionar Fotos do apartamento</h3>
          <GridFotos Images={fotos} setImages={setFotos}></GridFotos>
        </FotosArea>
        <InfoApto onClick={() => setShowCautionMsg(true)}>
          <LeftSide>
            <ButtonArea>
              <BusyButton>
                <Image src={Door} />
                OCUPADO
              </BusyButton>
              <CalendarWrapper onClick={() => setShowCautionMsg(true)}>
                <CalendarButton datas={datas} setDatas={setDatas} />
              </CalendarWrapper>
            </ButtonArea>
            <InfoBox>
              <InfoAptoForm
                setAptoTitle={setAptoTitle}
                setAddress={setAddress}
                camaInfo={camas ? camas : []}
                setCamaInfo={setCamas}
                radioInput={radioInputs}
                setRadioInput={setRadioInputs}
                camas={true}
                title={aptoTitle}
                address={address}
              />
            </InfoBox>
            <InfoBox>
              <AptoTexts
                title={"Descrição do apartamento"}
                placeholder={
                  "Coloque aqui mais informações sobre o apartamento, mais regras de convivência e detalhes adicionais"
                }
                setText={setDescription}
                text={description}
                required
              />
            </InfoBox>
            <InfoBox>
              <AptoItens
                title={"Itens do apartamento"}
                itens={itensApto}
                setItens={setItensApto}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
              />
            </InfoBox>
            <InfoBox>
              <AptoTexts
                title={"Adicione o Valor da Diária do Apartamento"}
                placeholder={"Valor por Diária"}
                type={"number"}
                setText={setDailyRate}
                text={dailyRate}
              />
            </InfoBox>
          </LeftSide>
          <RightSide>
            <InfoBox>
              <AptoItens
                title={"Areas Comuns"}
                itens={commumArea}
                setItens={setCommunAreas}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
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
                setShowSaveModal(true)
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
