import Image from "next/image";
import Navigation from "../../components/commom/Nav";

import { Title1, Title2, Subtitle2, Body2, Body3, Subtitle1, Body1 } from "../../styles/commonStyles";
import {
  Content,
  NavSpacing,
  WarningCard,
  RulesCard,
  Column,
  Details,
  MapContainer,
  ReservationDetailsCard,
  CardWithName,
  Breadcrumbs,
  TripDetails
} from "../../styles/reservaStyles";


import IconRedWarning from "../../assets/icon_red_warning.svg";
import MapaImage from "../../assets/apartamento/mapa.png";
import PiscinaImage from "../../assets/apartamento/piscina.png";
import IconArrowLeft from "../../assets/icon_arrow_left.svg";
import Button from "../../components/commom/Button";

const Page = () => {
  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Breadcrumbs>
          <Image src={IconArrowLeft} />
          <Title1>Pedir pra reservar</Title1>
        </Breadcrumbs>

        <Details>
          <Column>
            <TripDetails>
              <Subtitle1>Sua viagem</Subtitle1>
              <div>
              </div>
            </TripDetails>

            <WarningCard>
              <Image src={IconRedWarning} />
              <div>
                <Subtitle2 red>Atenção</Subtitle2>
                <Body3 red>Controles e chaves devem ser devolvidos na saída.</Body3>
              </div>
            </WarningCard>

            <RulesCard>
            <Subtitle1>Regras de convivência</Subtitle1>
              <Body2 primary>
                <ol>
                  <li>Ao contrário da crença popular, o Lorem Ipsum não é simplesmente texto;</li>
                  <li>Ao contrário da crença popular, o Lorem Ipsum não é simplesmente texto;</li>
                  <li>Ao contrário da crença popular, o Lorem Ipsum não é simplesmente texto;</li>
                  <li>Ao contrário da crença popular, o Lorem Ipsum não é simplesmente texto;</li>
                </ol>
              </Body2>
            </RulesCard>

            <MapContainer>
              <Title2>Veja a localização no mapa</Title2>
              <img src={MapaImage.src} />
            </MapContainer>
          </Column>
          <Column>
            <ReservationDetailsCard>
              <div className="title">
                <Title2>Dados da sua reserva</Title2>
              </div>

              <CardWithName>
                <img src={PiscinaImage.src} />
                <div className="text">
                  <Body3>Espaço inteiro: apartamento</Body3>
                  <Body1 strong>Apartamento VG FUN 419 - Vista piscinas e mar</Body1>
                </div>
              </CardWithName>

              <div className="row top-spacing">
                <Subtitle2>Valores da reserva</Subtitle2>
                <div className="row-separator" />
              </div>

              <div className="row">
                <Body2 blue>Valor da diária</Body2>
                <Body1 primary><b>R$ 40,00</b></Body1>
              </div>
              
              <div className="row">
                <Body2 blue>Número de diárias</Body2>
                <Body1 primary><b>4</b></Body1>
              </div>
              
              <div className="row-separator" />

              <div className="row">
                <Title2>Total</Title2>
                <Title1>R$ 160,00</Title1>
              </div>

            </ReservationDetailsCard>

            <Button>RESERVE AGORA</Button>
          </Column>
        </Details>

      </Content>
    </div>
  )
};

export default Page;