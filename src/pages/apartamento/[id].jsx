import {
  NavSpacing,
  Content,
  Title1,
  Subtitle2,
  Details,
  Column,
  BlueOutlineCard,
  Body1,
  Body3,
  Title2,
  Features,
  FeatureCard,
  Body2,
  ImageGallery,
  Breadcrumbs,
  Header,
} from "../../styles/apartamentoStyles";

import Navigation from "../../components/commom/Nav";
import Image from "next/image";

import PlaceholderImage from "../../assets/apartamento/placeholder.png";
import MapaImage from "../../assets/apartamento/mapa.png";
import IconWifi from "../../assets/apartamento/wifi.svg";
import IconArrowLeft from "../../assets/icon_arrow_left.svg";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Breadcrumbs>
          <Image src={IconArrowLeft} />
          <Body1 primary>Todos apartamentos / Detalhes de reservas do apartamento / <u>Detalhes do apartamento</u></Body1>
        </Breadcrumbs>
        <Header>
          <ImageGallery>
            <img src={PlaceholderImage.src} />
            <img src={PlaceholderImage.src} />
            <img src={PlaceholderImage.src} />
          </ImageGallery>
          <div>
            <Title1>Apartamento {router.query.id}</Title1>
            <Body1>Apartamento Padrão (sem adaptação para PCD), 2 andar</Body1>
          </div>
        </Header>
        <Details>
          <Column>
            <BlueOutlineCard>
              <div>
                <Subtitle2>Itens do Apartamento</Subtitle2>
              </div>
              <Features>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Wi-Fi</Body2>
                </FeatureCard>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Ar-Condicionado</Body2>
                </FeatureCard>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Travesseiro</Body2>
                </FeatureCard>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Frigobar</Body2>
                </FeatureCard>
              </Features>
            </BlueOutlineCard>

            <BlueOutlineCard>
              <div>
                <Subtitle2>Áreas comuns</Subtitle2>
                <Body3>Verifique a disponibilidade de uso das áreas comuns durante sua estadia. Caso queria usufruir de alguma em especifico faça a reserva aqui.</Body3>
              </div>
              <Features>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Garagem</Body2>
                </FeatureCard>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Auditório</Body2>
                </FeatureCard>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Cozinha compartilhada</Body2>
                </FeatureCard>
                <FeatureCard>
                  <Image src={IconWifi} width="32" height="32" />
                  <Body2>Frigobar</Body2>
                </FeatureCard>
              </Features>
            </BlueOutlineCard>

            <BlueOutlineCard>
              <div>
                <Subtitle2>Locais Próximos</Subtitle2>
              </div>
            </BlueOutlineCard>
          </Column>

          <Column></Column>
        </Details>
        <Title2>Veja a localização no mapa</Title2>
        <Image src={MapaImage} />
      </Content>
    </div>
  );
};

export default Page;