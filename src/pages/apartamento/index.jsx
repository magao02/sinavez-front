import Navigation from "../../components/commom/Nav";
import Door from "../../assets/Door.svg";
import Image from "next/image";
import InfoAptoForm from "../../components/InfoAptoForm";

import {
  Container,
  Main,
  Header,
  GridFotos,
  BusyButton,
  LeftSide,
  InfoApto,
  RightSide,
  ReservarButton,
  ButtonArea,
  InfoBox
} from "../../styles/apartamentoStyles";
import AptoTexts from "../../components/AptoTexts";
import AptoItens from "../../components/AptoItens";
import RegrasApto from "../../components/RegrasApto";


const apartamento = () => {

    return (
        <Container>
          <Header></Header>
          <Main>
            <GridFotos></GridFotos>
            <InfoApto>
              <LeftSide>
                <ButtonArea>
                  <BusyButton><Image src={Door} />OCUPADO</BusyButton>
                  <ReservarButton>RESERVAR</ReservarButton>
                </ButtonArea>
                <InfoBox>
                  <InfoAptoForm />
                </InfoBox>
                <InfoBox>
                  <AptoTexts title={"Descrição do apartamento"} text={"Coloque aqui mais informações sobre o apartamento, mais regras de convivência e detalhes adicionais"}/>
                </InfoBox>
                <InfoBox>
                  <AptoItens title={"Itens do apartamento"}/>
                </InfoBox>
                <InfoBox>
                  <AptoTexts title={"Adicione o Valor da Diária do Apartamento"} text={"Valor por Diária"} type={"number"}/>
                </InfoBox>
              </LeftSide>
              <RightSide>
              <InfoBox>
                  <AptoItens title={"Areas Comuns"} />
                </InfoBox>
                <InfoBox>
                  <RegrasApto title={"Regras de convivencia"}/>
                </InfoBox>
                <InfoBox>
                  <RegrasApto title={"Locais nos Arredores"}/>
                </InfoBox>
              </RightSide>
            </InfoApto>
          </Main>
        </Container>
    )
}

export default apartamento;