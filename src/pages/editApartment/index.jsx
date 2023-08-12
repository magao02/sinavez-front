import Navigation from "../../components/commom/Nav";
import Door from "../../assets/Door.svg";
import Image from "next/image";
import InfoAptoForm from "../../components/InfoAptoForm";

import {
  Container,
  Main,
  Header,
  FotosArea,
  BusyButton,
  LeftSide,
  InfoApto,
  RightSide,
  ReservarButton,
  ButtonArea,
  InfoBox,
  RedirectArea,
  CautionBox,
} from "../../styles/apartamentoStyles";
import AptoTexts from "../../components/AptoTexts";
import AptoItens from "../../components/AptoItens";
import RegrasApto from "../../components/RegrasApto";
import { useState } from "react";
import leftArrow from "../../assets/leftArrow.svg";
import Button from "../../components/commom/Button";
import GridFotos from "../../components/GridFotos";
import { useAuth } from "../../contexts/AuthContext";
import * as service from "../../services/Apto";
import { useEffect } from "react";
import { Modal } from "../../components/commom/Modal";
import ConfirmButtons from "../../components/commom/ConfirmButtons";

const editApartment = () => {

  // INFORMACOES DO APTO
  const [description, setDescription] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [aptoTitle, setAptoTitle] = useState("");
  const [address, setAddress] = useState("");
  const [camas, setCamas] = useState();
  const [radioInputs, setRadioInputs] = useState("");
  const [locais, setLocais] = useState([]);
  const [regras, setRegras] = useState([]);
  const [fotos, setFotos] = useState([]);
  
  // Modal de Alteracao
  const [showCautionMsg, setShowCautionMsg] = useState(false);
  const [cancelAll, setCancelAll] = useState(false);
  const [saveAll, setSaveAll] = useState(false);
  const [alterations, setAlterations] = useState([false, false, false, false]);

  const authContext = useAuth();

  const [itensApto, setItensApto] = useState([
    {
      name: "Frigobar",
      checked: false,
    },
    {
      name: "Armario",
      checked: false,
    },
    {
      name: "Smart TV",
      checked: false,
    },
    {
      name: "Travesseiro",
      checked: false,
    },
    {
      name: "Lencol de Elastico",
      checked: false,
    },
    {
      name: "Ferro de passar",
      checked: false,
    },
    {
      name: "Armador de Rede",
      checked: false,
    },
    {
      name: "Pratos, talheres e copos",
      checked: false,
    },
    {
      name: "Ar condicionado",
      checked: false,
    },
  ]);

  const [commumArea, setCommunAreas] = useState([
    {
      name: "Garagem",
      checked: false,
    },
    {
      name: "Piscina",
      checked: false,
    },
    {
      name: "Auditorio",
      checked: false,
    },
    {
      name: "Churrasqueira",
      checked: false,
    },
    {
      name: "Area Gourmet",
      checked: false,
    },

    {
      name: "Lavanderia",
      checked: false,
    },
    {
      name: "Cozinha compartilhada",
      checked: false,
    },
    {
      name: "Recreacao infantil",
      checked: false,
    },
  ]);

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
    };

    console.log(req);

    //service.createApartament(req, authContext.urlUser, authContext.token);
  };

  const getApartmentInfo = () => {
    var ap = service.getAllApartaments(authContext.token);
    console.log(ap);
  };
  


  // FUNCOES RELACIONADAS AO MODAL DE ALTERACOES
  const checkAlterations = (title, value) => {
      var copy = [...alterations];

      if (title == "Itens do apartamento") {
        copy[0] = value;
      } else if (title == "Areas Comuns") {
        copy[1] = value;
      } else if (title == "Regras de convivencia") {
        copy[2] = value;
      } else {
        copy[3] = value;
      }
      
      var result = copy.every((data) => data == false);
      if (result) {
        setShowCautionMsg(false);
      } else {
        setShowCautionMsg(true);
      }
      setAlterations(copy)
    }


  const handleCancelAll = () => {
    setCancelAll(true);
    setAlterations([false,false,false,false])
  };

  const handleSaveAll = () => {
    setSaveAll(true);
    setAlterations([false,false,false,false])
  }

  
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
        <FotosArea>
          <h3>Adicionar Fotos do apartamento</h3>
          <GridFotos setFotos={setFotos}></GridFotos>
        </FotosArea>
        <InfoApto>
          <LeftSide>
            <ButtonArea>
              <BusyButton>
                <Image src={Door} />
                OCUPADO
              </BusyButton>
              <ReservarButton>RESERVAR</ReservarButton>
            </ButtonArea>
            <InfoBox>
              <InfoAptoForm
                setAptoTitle={setAptoTitle}
                setAddress={setAddress}
                setMainCamas={setCamas}
                setRadioInputs={setRadioInputs}
                camas={true}
              />
            </InfoBox>
            <InfoBox>
              <AptoTexts
                title={"Descrição do apartamento"}
                text={
                  "Coloque aqui mais informações sobre o apartamento, mais regras de convivência e detalhes adicionais"
                }
                setText={setDescription}
                required
              />
            </InfoBox>
            <InfoBox>
              <AptoItens
                title={"Itens do apartamento"}
                itens={itensApto}
                setItens={setItensApto}
                cautionModal={checkAlterations}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
              />
            </InfoBox>
            <InfoBox>
              <AptoTexts
                title={"Adicione o Valor da Diária do Apartamento"}
                text={"Valor por Diária"}
                type={"number"}
                setText={setDailyRate}
              />
            </InfoBox>
          </LeftSide>
          <RightSide>
            <InfoBox>
              <AptoItens
                title={"Areas Comuns"}
                itens={commumArea}
                setItens={setCommunAreas}
                cautionModal={checkAlterations}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
              />
            </InfoBox>
            <InfoBox>
              <RegrasApto
                title={"Regras de convivencia"}
                setValues={setRegras}
                cautionModal={checkAlterations}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
              />
            </InfoBox>
            <InfoBox>
              <RegrasApto
                title={"Locais nos Arredores"}
                setValues={setLocais}
                cautionModal={checkAlterations}
                cancelAll={cancelAll}
                setCancelAll={setCancelAll}
                setSaveAll={setSaveAll}
                saveAll={saveAll}
              />
            </InfoBox>
          </RightSide>
        </InfoApto>
        {showCautionMsg && (
          <CautionBox>
            <h3 style={{ color: "#3C3E45" }}>
              Cuidado - você tem alterações que não foram salvas!
            </h3>
            <ConfirmButtons handleCancel={handleCancelAll} save={handleSaveAll}></ConfirmButtons>
          </CautionBox>
        )}
      </Main>
    </Container>
  );
};

export default editApartment;
