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

const apartamento = () => {
  const [description, setDescription] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [aptoTitle, setAptoTitle] = useState("");
  const [address, setAddress] = useState("");
  const [camas, setCamas] = useState();
  const [radioInputs, setRadioInputs] = useState("")


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
          <h2 style={{marginBottom:"3vh"}}>Editar o Apartamento</h2>
        <FotosArea>
          <h3>Adicionar Fotos do apartamento</h3>
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
              <AptoTexts
                title={"Descrição do apartamento"}
                text={
                  "Coloque aqui mais informações sobre o apartamento, mais regras de convivência e detalhes adicionais"
                }
                setText={setDescription}
              />
            </InfoBox>
            <InfoBox>
              <AptoItens
                title={"Itens do apartamento"}
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
              <AptoItens
                title={"Areas Comuns"}
                itens={commumArea}
                setItens={setCommunAreas}
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

export default apartamento;
