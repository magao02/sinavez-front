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
  LoadingContainer,
} from "../../styles/apartamentoStyles";
import AptoTexts from "../../components/AptoTexts";
import AptoItens from "../../components/AptoItens";
import RegrasApto from "../../components/RegrasApto";
import { useEffect, useState } from "react";
import leftArrow from "../../assets/leftArrow.svg";
import Button from "../../components/commom/Button";
import GridFotos from "../../components/GridFotos";
import { useAuth } from "../../contexts/AuthContext";
import * as service from "../../services/apartments";
import ConfirmButtons from "../../components/commom/ConfirmButtons";
import CalendarButton from "../../components/CalendarButton";
import { v4 as uuid } from "uuid";
import { Modal } from "../../components/commom/Modal";
import cancel_img from "../../assets/cancel_alterations.svg";
import UserComputer from "../../assets/user_computer.svg";
import { ModalOneButton } from "../../components/commom/ModalOneButton";
import { useRouter } from "next/router";
import AlertModal from "../../components/commom/AlertModal";
import isEqual from "lodash.isequal";
import loading from "../../assets/loading_Apto.svg"

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
  const [urlApto, setUrlApto] = useState("");
  const [loadingData, setLoadingData] = useState(true)

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
    if (!authContext.auth || !authContext.admin) {
      router.push("/login");
    return;
    }
    if(router.isReady){
      getApartmentInfo();
    }
  }, [router.isReady, authContext.auth]);

  const validaCamas = () => camas.every((data) => data.Quantidade > 0)

  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);

  // REQUISICAO PUT
  const updateRequisicaoApto = async () => {
    if(aptoTitle == "" || address == "" || !validaCamas){
      
    }else{
      setShowSaveModal(true)
      setIsMakingRequest(true);

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

    var beds = []
    camas.forEach((data) => {
      var obj = {
        tipo: data.tipo,
        quantidade: parseInt(data.Quantidade)
      }
      beds.push(obj)
    })

    var req = {
      titulo: aptoTitle,
      endereco: address,
      tipo: radioInputs.tipo,
      andar: radioInputs.andar == "Terreo" ? 0 : 1,
      suite: radioInputs.suite,
      wifi: radioInputs.wifi,
      animais: radioInputs.animais,
      diaria: parseFloat(dailyRate),
      camas: beds,
      descricao: description,
      itens: itens,
      areasComuns: areas,
      locaisArredores: locaisValues,
      regrasConvivencia: regrasValues,
    };

    await service.updateApartment(authContext.token, req, urlApto);

    if (!isEqual(fotos, oldData.pictures)) {
      setIsUploadingPhotos(true);
      const pictures = await Promise.all(fotos.map(async (f, i) => {
        let req = await fetch(f, {
          // mode: "no-cors",
          cache: "no-cache",
        });
        const type = req.headers.get("Content-Type");
        let blob = await req.blob();
        return new File([blob], `upload${i}`, { type });
      }));
      await service.setApartmentPhotos(pictures, urlApto, authContext.token);
    }

    setIsUploadingPhotos(false);
    setIsMakingRequest(false);
  }
  };

  // REQUISICAO GET DO APARTAMENTO
  const getApartmentInfo = async () => {
    var { data } = await service.getApartment(authContext.token, router.query.url);
    setUrlApto(router.query.url)
    setLoadingData(false)

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

    // Images
    setFotos(data.pictures);
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
    updateRequisicaoApto()
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

  if(loadingData){
    return (
      <LoadingContainer>
        <img src={loading.src}></img>
      </LoadingContainer>
    )
  }else{
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
              <a onClick={() => checkAlterations()}>Todos os Apartamentos </a>
              <a>/</a>
              <a onClick={() => routeToAmbientData()} >Dados do Apartamentos </a>
              <a>/</a>
              <a style={{"textDecoration": "underline"}}>Editar Apartamento </a>
            </Button>
          </RedirectArea>
          <h2 style={{ marginBottom: "3vh" }}>Editar o Apartamento</h2>
          <FotosArea>
            <h3>Adicionar Fotos do apartamento</h3>
            <GridFotos images={fotos} setImages={setFotos} onChange={() => setShowCautionMsg(true)} />
          </FotosArea>
          <InfoApto onClick={() => setShowCautionMsg(true)}>
            <LeftSide>
              <ButtonArea>
                  <CalendarButton datas={datas} setDatas={setDatas} />
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
                  title={"Regras de Convivência"}
                  type={"regras"}
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
            isMakingRequest && <ModalOneButton
              title="Aguarde"
              asideText={isUploadingPhotos ? "Fazendo upload das fotos..." : "Guardando seus dados..."}
              hideButton={true}
              img={UserComputer.src}
            />
          }
  
          {
            (!isMakingRequest && showSaveModal) && (
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
  }
};

export default editApartment;
