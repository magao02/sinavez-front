import {
  NavSpacing,
  Content,
  Details,
  Column,
  BlueOutlineCard,
  Features,
  FeatureCard,
  ImageGallery,
  Breadcrumbs,
  Header,
  BlueFeatureCard,
  BlueFeatures,
  DescriptionCard,
  DescriptionBox,
  ReservationDetailsCard,
  RulesCard,
  WarningCard,
  Locations,
  Location,
  MapContainer,
  FullImageGallery,
} from "./styles";
import { Title1, Title2, Subtitle1, Subtitle2, Body1, Body2, Body3 } from "../../styles/commonStyles";

import { useState } from "react";

import Navigation from "../../components/commom/Nav";
import Image from "next/image";

import PlaceholderImage from "../../assets/apartamento/placeholder.png";
import PlaceholderImageHD from "../../assets/apartamento/placeholderhd.png";
import MapaImage from "../../assets/apartamento/mapa.png";
import IconWifi from "../../assets/apartamento/wifi.svg";
import IconArrowLeft from "../../assets/icon_arrow_left.svg";
import IconDoubleBed from "../../assets/apartamento/icon_double_bed.svg";
import IconRedWarning from "../../assets/icon_red_warning.svg";
import IconLocation from "../../assets/icon_gray_location.svg";
import { DropdownInput, SearchInput } from "../../components/SearchInputs";
import Button from "../../components/commom/Button";

const ApartmentDetails = ({ area, objectUrl }) => {
  const [viewingImages, setViewingImages] = useState(false);

  const rulesCard = (
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
  );

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Breadcrumbs>
          <Image src={IconArrowLeft} />
          { !area && <Body1 primary>Todos apartamentos / Detalhes de reservas do apartamento / <u>Detalhes do apartamento</u></Body1> }
          { area && <Body1 primary>Todos apartamentos / <u>Detalhes da área de lazer</u></Body1> }
        </Breadcrumbs>
        <Header>
          <ImageGallery>
            <img src={PlaceholderImage.src} />
            <img src={PlaceholderImage.src} />
            <img src={PlaceholderImage.src} />
            <div className="button">
              <Button onClick={_ => setViewingImages(true)}>VER TODAS AS FOTOS</Button>
            </div>
          </ImageGallery>
          { !area && <div>
            <Title1>Apartamento {objectUrl}</Title1>
            <Body1>Apartamento Padrão (sem adaptação para PCD), 2 andar</Body1>
          </div> }
          {area && <div>
            <Title1>Piscina</Title1>
            <Body1>Piscina de 300m²</Body1>
          </div> }
        </Header>
        <Details>
          <Column className="features-column">
            { !area && <BlueFeatures>
              {
                Array(4).fill(0).map((_, i) =>
                  <BlueFeatureCard key={i}>
                    <Image src={IconDoubleBed} />
                    {i + 1} Cama casal
                  </BlueFeatureCard>
                )
              }
            </BlueFeatures> }

            <BlueOutlineCard>
              <div>
                <Subtitle2>{ area ? "Itens disponíveis" : "Itens do Apartamento" }</Subtitle2>
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

            { !area && <BlueOutlineCard>
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
            </BlueOutlineCard> }

            <BlueOutlineCard>
              <div>
                <Subtitle2>Locais Próximos</Subtitle2>
              </div>
              <Locations>
                <Location>
                  <Image src={IconLocation} />
                  <Body3 primary>Rodoviária Fulano de Tal</Body3>
                </Location>
                <Location>
                  <Image src={IconLocation} />
                  <Body3 primary>Rodoviária Fulano de Tal</Body3>
                </Location>
                <Location>
                  <Image src={IconLocation} />
                  <Body3 primary>Rodoviária Fulano de Tal</Body3>
                </Location>
                <Location>
                  <Image src={IconLocation} />
                  <Body3 primary>Praia Nome Aqui com muita areia e sal bem </Body3>
                </Location>
                <Location>
                  <Image src={IconLocation} />
                  <Body3 primary>Praia Nome Aqui com muita areia e sal bem </Body3>
                </Location>
              </Locations>
            </BlueOutlineCard>

            { area && rulesCard }

            <DescriptionCard>
              <Subtitle2>Descrição deste quarto</Subtitle2>
              <Body3 primary>Leia abaixo mais informações e mais detalhes sobre o apartamento.</Body3>
              <DescriptionBox>
                <Body2 primary>
                  <b>ATENÇÃO:</b> Controles e chaves devem ser devolvidos na saída.<br />
                  <br />
                  O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.<br />
                  <br />
                  <b>Sobre a Cozinha compartilhada:</b> O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres.
                </Body2>
              </DescriptionBox>
            </DescriptionCard>
          </Column>

          <Column>
            <ReservationDetailsCard>
              <Title2>Dados da sua reserva</Title2>
              <div className="row">
                <SearchInput label="Chegada" type="date" innerLabel="Data" />
                <SearchInput label="Saída" type="date" innerLabel="Data" />
              </div>
              
              <div className="row-separator" />
              
              <div className="row">
                <DropdownInput label="Hóspedes" options={["2 adultos;  1 criança;  1 bebê; 2 animais de estimação"]} />
              </div>
              
              <div className="row-separator" />
              
              <Subtitle2>Horários</Subtitle2>
              
              <div className="row">
                <Body2 primary><b>Chegada:</b> 11:00 manhã</Body2>
                <Body2 primary><b>Saída:</b> 18:00 noite</Body2>
              </div>
              
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
                <Body1 primary>Total</Body1>
                <Body1 primary>R$ 160,00</Body1>
              </div>

              <div className="button-container">
                <Button>RESERVE AGORA</Button>
                <Body3 red>Você ainda não irá pagar*</Body3>
              </div>
            </ReservationDetailsCard>

            <WarningCard>
              <Image src={IconRedWarning} />
              <div>
                <Subtitle2 red>Atenção</Subtitle2>
                <Body3 red>Controles e chaves devem ser devolvidos na saída.</Body3>
              </div>
            </WarningCard>

            { !area && rulesCard }
          </Column>
        </Details>

        <MapContainer>
          <Title2>Veja a localização no mapa</Title2>
          <Image src={MapaImage} />
        </MapContainer>
      </Content>

      { viewingImages && <FullImageGallery>
        <div className="background" onClick={_ => setViewingImages(false)} />
        <div className="images">
          <img src={PlaceholderImageHD.src} />
          <img src={PlaceholderImageHD.src} />
          <img src={PlaceholderImageHD.src} />
          <img src={PlaceholderImageHD.src} />
        </div>
      </FullImageGallery> }
    </div>
  );
};

export default ApartmentDetails;