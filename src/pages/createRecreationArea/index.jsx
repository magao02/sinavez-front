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
  const [radioInputs, setRadioInputs] = useState({
    tipo: "Lazer",
    andar: 0,
    suite: false,
    wifi: false,
    animais: false,
  });
  const [locais, setLocais] = useState([
    {
      id: 1,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    },
    {
      id: 2,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    },
    {
      id: 3,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    },
    {
      id: 4,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    }
  ]);
  const [regras, setRegras] = useState([
    {
      id: 5,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    },
    {
      id: 6,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    },
    {
      id: 7,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    },
    {
      id: 8,
      placeholder: "Informe uma regra de convivência para reforçar aos hospedes que sigam enquanto estiverem usando o serviço.",
      value: "",
    }
  ]);
  const [fotos, setFotos] = useState([]);
  const [datas, setDatas] = useState([]);
  const [urlRec, setUrlRec] = useState("");

  // State para funcao de cancelar alteracoes e salvar Alteracoes
  const [oldData, setOldData] = useState([
    {
      titulo: "",
      endereco: "",
      tipo: radioInputs.tipo,
      andar: radioInputs.andar == "Terreo" ? 0 : 1,
      suite: radioInputs.suite,
      wifi: radioInputs.wifi,
      animais: radioInputs.animais,
      diaria: 0,
      capacidadeMaxima: 0,
      descricao: "",
      itens: [],
      areasComuns: [],
      locaisArredores: [0,1,2,3],
      regrasConvivencia: [0,1,2,3],
    }
  ]
  );

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
  const [commumArea, setCommunAreas] = useState([
    {
      name: "Piscina",
      checked: false,
    },
    {
      name: "Hidro",
      checked: false,
    },
    {
      name: "Sauna",
      checked: false,
    },
    {
      name: "Geladeira",
      checked: false,
    },
    {
      name: "Freezer",
      checked: false,
    },
    {
      name: "2 pias",
      checked: false,
    },
    {
      name: "4 churrasqueira eletrica",
      checked: false,
    },
    {
      name: "Mesa 8 lugares",
      checked: false,
    },
    {
      name: "Ar condicionado",
      checked: false,
    },
  ]);

  const authContext = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authContext.auth || !authContext.admin) {
        router.push("/login");
      return;
    }
},[authContext.auth])

  // REQUISICAO POST
  const postRequisicaoRA = async () => {
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
      itens: areas,
      areasComuns: areas,
      locaisArredores: locaisValues,
      regrasConvivencia: regrasValues,
    };

    const res = await service.createRecreationArea(req, authContext.token);
    const url = res.data.url;

    const pictures = await Promise.all(fotos.map(async (f, i) => {
      let req = await fetch(f, {
        // mode: "no-cors",
        cache: "no-cache",
      });
      const type = req.headers.get("Content-Type");
      let blob = await req.blob();
      return new File([blob], `upload${i}`, { type });
    }));
    await service.setRecreationAreaPhotos(pictures, url, authContext.token);
    setShowSaveModal(true)
  }
  };


  const modelData = (data) => {

    // Itens
    setItensApto([
      {
        name: "Piscina",
        checked: false,
      },
      {
        name: "Hidro",
        checked: false,
      },
      {
        name: "Sauna",
        checked: false,
      },
      {
        name: "Geladeira",
        checked: false,
      },
      {
        name: "Freezer",
        checked: false,
      },
      {
        name: "2 pias",
        checked: false,
      },
      {
        name: "4 churrasqueira eletrica",
        checked: false,
      },
      {
        name: "Mesa 8 lugares",
        checked: false,
      },
      {
        name: "Ar condicionado",
        checked: false,
      },
    ]);

    // Areas
    setCommunAreas([
      {
        name: "Piscina",
        checked: false,
      },
      {
        name: "Hidro",
        checked: false,
      },
      {
        name: "Sauna",
        checked: false,
      },
      {
        name: "Geladeira",
        checked: false,
      },
      {
        name: "Freezer",
        checked: false,
      },
      {
        name: "2 pias",
        checked: false,
      },
      {
        name: "4 churrasqueira eletrica",
        checked: false,
      },
      {
        name: "Mesa 8 lugares",
        checked: false,
      },
      {
        name: "Ar condicionado",
        checked: false,
      },
    ])

    // Regras
    var rules = data.regrasConvivencia;
    var obj = [];
    rules.forEach((data, key) => {
      var item = {
        id: uuid(),
        placeholder:
          "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
        value: "",
      };
      obj.push(item);
    });
    setRegras(obj);
    

    // Locais nos arredores
    var locaisNosArredores = data.locaisArredores;
    var obj = [];
    locaisNosArredores?.forEach((data, key) => {
      var item = {
        id: uuid(),
        placeholder:
          "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
        value: "",
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
    /*var imgs = data.imageUrl;
    var obj = [];
    for (let idx = 0; idx < 7; idx++) {
      var item = {
        id: idx,
        name: "",
        file: imgs[idx] != undefined ? imgs[idx] : "",
      };
      obj.push(item);
    }
    setFotos(obj);*/
  };

  // MODELA OS DADOS DOS ITENS
  const getItens = (itens) => {
    var obj = [];
    itens?.forEach((data) => {
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
    modelData(oldData[0]);
    setShowCancelModal(false)
  };

  const handleSaveAll = () => {
    setSaveAll(true);
    setShowCautionMsg(false);
    postRequisicaoRA()
  };

  const checkAlterations = () => {
    if(showCautionMsg){
      setShowModalUnsaved(true)
    }else{
      router.push("/manageReservations")
    }
  }

  return (
    <Container>
      <Header>
        <Navigation variant={"admin"} />
      </Header>
      <Main>
        <RedirectArea onClick={checkAlterations}>
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
            <a>Todos as Áreas de Lazer </a>
            <a>/</a>
            <a style={{"textDecoration": "underline"}}>Cria Área de Lazer</a>
          </Button>
        </RedirectArea>
        <h2 style={{ marginBottom: "3vh" }}>Cria a Área de Lazer</h2>
        <FotosArea>
          <h3>Adicionar Fotos da Área de Lazer</h3>
          <GridFotos images={fotos} setImages={setFotos} onChange={() => setShowCautionMsg(true)} />
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
          showSaveModal && (
              <ModalOneButton
                title={"SUCESSO"}
                asideText={"Area de lazer criada com sucesso!"}
                img={sucess_img.src}>
              </ModalOneButton>
          )
        }
      </Main>
    </Container>
  );
};

export default editApartment;
