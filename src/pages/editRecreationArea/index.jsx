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
} from "../../styles/apartamentoStyles";
import AptoTexts from "../../components/AptoTexts";
import AptoItens from "../../components/AptoItens";
import RegrasApto from "../../components/RegrasApto";
import { useState } from "react";
import leftArrow from "../../assets/leftArrow.svg"
import Button from "../../components/commom/Button";
import GridFotos from "../../components/GridFotos"

const editRecreationArea = () => {
  const [description, setDescription] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [aptoTitle, setAptoTitle] = useState("");
  const [address, setAddress] = useState("");
  const [camas, setCamas] = useState();
  const [radioInputs, setRadioInputs] = useState("")


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

  return (
    <Container>
      <Header>
        <Navigation variant={"admin"} />
      </Header>
      <Main>
        <RedirectArea>
          <Button variant={"image"} style={{display:"flex", flexDirection:"row", gap:"1vw", alignItens: "center"}}>
           <Image src={leftArrow} alt={"arrow"}></Image> 
            <a>Todos os Apartamentos  </a>
            <a>/</a>
            <a>Dados do Apartamentos  </a>
            <a>/</a>
            <a>Editar Apartamento  </a>
          </Button>
        </RedirectArea>
          <h2 style={{marginBottom:"3vh"}}>Editar Área de Lazer</h2>
        <FotosArea>
          <h3>Adicionar fotos do espaço de lazer</h3>
          <GridFotos></GridFotos>
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
              <InfoAptoForm  setAptoTitle={setAptoTitle} setAddress={setAddress} setMainCamas={setCamas} setRadioInputs={setRadioInputs}/>
            </InfoBox>
            <InfoBox>
              <AptoItens
                title={"Itens do Espaço"}
                itens={itensApto}
                setItens={setItensApto}
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
              <AptoTexts
                title={"Descrição"}
                text={
                  "Coloque aqui mais informações sobre a área de lazer, regras de convivência e detalhes adicionais."
                }
                setText={setDescription}
                required
              />
            </InfoBox>
            <InfoBox>
              <RegrasApto title={"Regras de convivencia"} />
            </InfoBox>
            <InfoBox>
              <RegrasApto title={"Locais nos Arredores"} />
            </InfoBox>
          </RightSide>
        </InfoApto>
      </Main>
    </Container>
  );
};

export default editRecreationArea;
