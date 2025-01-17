import Navigation from "../../components/commom/Nav";
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
import * as service from "../../services/apartments";
import ConfirmButtons from "../../components/commom/ConfirmButtons";
import CalendarButton from "../../components/CalendarButton";
import { Modal } from "../../components/commom/Modal";
import cancel_img from "../../assets/cancel_alterations.svg";
import { ModalOneButton } from "../../components/commom/ModalOneButton";
import { useRouter } from "next/router";
import AlertModal from "../../components/commom/AlertModal";
import { v4 as uuid } from "uuid";

const createApartment = () => {

  // INFORMACOES DO APTO
  const [description, setDescription] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [aptoTitle, setAptoTitle] = useState("");
  const [address, setAddress] = useState("");
  const [camas, setCamas] = useState([{
    
  }]);

  const [radioInputs, setRadioInputs] = useState({
    tipo: "Comum",
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
  const [commumArea, setCommunAreas] = useState([
    {
      name: "Garagem",
      checked: false,
    },
    {
      name: "Auditório",
      checked: false,
    },
    {
      name: "Churrasqueira",
      checked: false,
    },
    {
      name: "Área Gourmet",
      checked: false,
    },
    {
      name: "Lavanderia",
      checked: false,
    },
    {
      name: "Cozinha Compartilhada",
      checked: false,
    },
    {
      name: "Recreação Infantil",
      checked: false,
    }
  ]);

  const [itensApto, setItensApto] = useState([
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

  const validaCamas = () => camas.every((data) => data.Quantidade > 0 && data.tipo != undefined)

  // REQUISICAO POST
  const createRequisicaoApto = async () => {
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

    if(aptoTitle == "" || address  == "" || !validaCamas()){

      return;
    }else{
  

    var req = {
      titulo: aptoTitle,
      endereco: address,
      tipo: radioInputs.tipo != undefined ? radioInputs.tipo : false,
      andar: radioInputs.andar == "Terreo" ? 0 : 1,
      suite: radioInputs.suite != undefined ? radioInputs.suite : false,
      wifi: radioInputs.wifi != undefined ? radioInputs.wifi : false,
      animais: radioInputs.animais != undefined ? radioInputs.animais : false,
      diaria: !isNaN(parseFloat(dailyRate)) ? parseFloat(dailyRate) : 0,
      camas: beds,
      descricao: description,
      itens: itens,
      areasComuns: areas,
      locaisArredores: locaisValues,
      regrasConvivencia: regrasValues,
    };

    const res = await service.createApartament(req, authContext.token);
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
    await service.setApartmentPhotos(pictures, url, authContext.token);
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
        name: "Garagem",
        checked: false,
      },
      {
        name: "Churrasqueira",
        checked: false,
      },
      {
        name: "Auditório",
        checked: false,
      },
      {
        name: "Churrasqueira",
        checked: false,
      },
      {
        name: "Área Gourmet",
        checked: false,
      },
      {
        name: "Lavanderia",
        checked: false,
      },
      {
        name: "Cozinha Compartilhada",
        checked: false,
      },
      {
        name: "Recreação Infantil",
        checked: false,
      }
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


    //CAMAS
    setCamas([{

      Quantidade: 0
    }])


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

  // FUNCOES RELACIONADAS AOS BOTOES DO MODAL DE CUIDADO
  const handleCancelAll = () => {
    setCancelAll(true);
    setShowCautionMsg(false);
    modelData(oldData[0])
    setShowCancelModal(false)
  };

  const handleSaveAll = () => {
    setSaveAll(true);
    setShowCautionMsg(false);
    createRequisicaoApto()
  };

  const checkAlterations = () => {
    if(showCautionMsg){
      setShowModalUnsaved(true)
    }else{
      router.push("/manageReservations")
    }
  }

  useEffect(() => {
    if (!authContext.auth || !authContext.admin) {
        router.push("/login");
      return;
    }
},[authContext.auth])

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
            <a>Todos os Apartamentos </a>
            <a>/</a>
            <a style={{"textDecoration": "underline"}}>Criar Apartamento </a>
          </Button>
        </RedirectArea>
        <h2 style={{ marginBottom: "3vh" }}>Criar Apartamento</h2>
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
                setText={setDescription}
                text={description}
                placeholder={
                  "Coloque aqui mais informações sobre o apartamento, mais regras de convivência e detalhes adicionais"
                }
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
          showSaveModal && (
              <ModalOneButton
                title={"SUCESSO"}
                asideText={"Apartamento criado com sucesso!"}
                img={sucess_img.src}>
              </ModalOneButton>
          )
        }
      </Main>
    </Container>
  );
};

export default createApartment;
