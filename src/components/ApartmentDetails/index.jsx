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
import { getApartment } from "../../services/apartments";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { getRecreationArea } from "../../services/recreationArea";
import { dayDifference } from "../../utils/date";

const ApartmentDetails = ({ area, objectUrl, query }) => {
  const [viewingImages, setViewingImages] = useState(false);
  const [model, setModel] = useState({});

  const authContext = useAuth();

  const router = useRouter();

  useEffect(async () => {
    if (!objectUrl) return;
    const req = area ? await getRecreationArea(authContext.token, objectUrl) : await getApartment(authContext.token, objectUrl);
    const data = req.data;
    setModel(data);
  }, [area, objectUrl, authContext]);

  const rulesCard = useMemo(() => (
    <RulesCard>
      <Subtitle1>Regras de convivência</Subtitle1>
      <Body2 primary>
        <ol>
          { model.regrasConvivencia?.map(regra => <li>{regra}</li>) }
        </ol>
      </Body2>
    </RulesCard>
  ), [model]);

  const formatPrice = value => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const defaultedQuery = useMemo(() => {
    query = query ?? {};
    delete query.id;
    return {
      ...query,
      adultos: query.adultos ?? 1,
      criancas: query.criancas ?? 0,
      bebes: query.bebes ?? 0,
      animais: query.animais ?? 0,
      chegadaTime: query.chegadaTime ?? '11:00',
      saidaTime: query.saidaTime ?? '11:00',
    };
  }, [query]);
  
  const valorDiaria = useMemo(() => {
    return formatPrice(model.diaria ?? 0);
  }, [model]);

  const numDiarias = useMemo(() => {
    return dayDifference(new Date(defaultedQuery.saidaDate), new Date(defaultedQuery.chegadaDate));
  }, [model, defaultedQuery]);

  const totalDiarias = useMemo(() => {
    return formatPrice((model.diaria ?? 0) * numDiarias);
  }, [valorDiaria, numDiarias]);

  const goToReservationPage = () => {
    const queryStr = new URLSearchParams({ ...defaultedQuery, area });
    router.push(`/reservar/${objectUrl}?${queryStr}`);
  };

  const goBack = () => {
    router.push(`/apartamentos`);
  };

  const applyPlural = (count, str) => {
    if (count == 1) {
      return `${count} ${str}`;
    } else if (str.endsWith("l")) {
      return `${count} ${str.substr(0, str.length - 1)}is`;
    } else {
      return `${count} ${str}s`;
    }
  };

  const formatTime = (time) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 18) {
      return `${time} noite`;
    } else if (hour >= 12) {
      return `${time} tarde`;
    } else {
      return `${time} manhã`;
    }
  };

  const hospedesStr = useMemo(() => {
    return [
      applyPlural(defaultedQuery.adultos, "adulto"),
      applyPlural(defaultedQuery.criancas, "criança"),
      applyPlural(defaultedQuery.bebes, "bebê"),
      `${applyPlural(defaultedQuery.animais, "animal")} de estimação`
    ].join('; ');
  }, [defaultedQuery]);

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Breadcrumbs>
          <Image onClick={goBack} src={IconArrowLeft} className="button" />
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
          <Title1>{model.titulo}</Title1>
          {/* i dont think this is correct */}
          <Body1>{model.tipo}, {model.andar}º andar</Body1>
        </Header>
        <Details>
          <Column className="features-column">
            { !area && <BlueFeatures>
              {
                model.camas?.map((cama, i) => <BlueFeatureCard key={i}>
                  <Image src={IconDoubleBed} />
                  {cama.quantidade} Cama {cama.tipo}
                </BlueFeatureCard>)
              }
            </BlueFeatures> }

            <BlueOutlineCard>
              <div>
                <Subtitle2>{ area ? "Itens disponíveis" : "Itens do Apartamento" }</Subtitle2>
              </div>
              <Features>
                {
                  model.itens?.map(item => <FeatureCard>
                    <Image src={IconWifi} width="32" height="32" />
                    <Body2>{item}</Body2>
                  </FeatureCard>)
                }
              </Features>
            </BlueOutlineCard>

            { !area && <BlueOutlineCard>
              <div>
                <Subtitle2>Áreas comuns</Subtitle2>
                <Body3>Verifique a disponibilidade de uso das áreas comuns durante sua estadia. Caso queria usufruir de alguma em especifico faça a reserva aqui.</Body3>
              </div>
              <Features>
                {
                  model.areasComuns?.map(text => <FeatureCard>
                    <Image src={IconWifi} width="32" height="32" />
                    <Body2>{text}</Body2>
                  </FeatureCard>)
                }
              </Features>
            </BlueOutlineCard> }

            <BlueOutlineCard>
              <div>
                <Subtitle2>Locais Próximos</Subtitle2>
              </div>
              <Locations>
                {
                  model.locaisArredores?.map(text => <Location>
                    <Image src={IconLocation} />
                    <Body3 primary>{text}</Body3>
                  </Location>)
                }
              </Locations>
            </BlueOutlineCard>

            { area && rulesCard }

            <DescriptionCard>
              <Subtitle2>Descrição deste quarto</Subtitle2>
              <Body3 primary>Leia abaixo mais informações e mais detalhes sobre o apartamento.</Body3>
              <DescriptionBox>
                <Body2 primary>
                  {model.descricao}
                </Body2>
              </DescriptionBox>
            </DescriptionCard>
          </Column>

          <Column>
            <ReservationDetailsCard>
              <Title2>Dados da sua reserva</Title2>
              <div className="row">
                <SearchInput label="Chegada" type="date" innerLabel="Data" disabled initialValue={defaultedQuery.chegadaDate} />
                <SearchInput label="Saída" type="date" innerLabel="Data" disabled initialValue={defaultedQuery.saidaDate} />
              </div>
              
              <div className="row-separator" />
              
              <div className="row">
                <DropdownInput label="Hóspedes" disabled options={[hospedesStr]} />
              </div>
              
              <div className="row-separator" />
              
              <Subtitle2>Horários</Subtitle2>
              
              <div className="row">
                <Body2 primary><b>Chegada:</b> {formatTime(defaultedQuery.chegadaTime)}</Body2>
                <Body2 primary><b>Saída:</b> {formatTime(defaultedQuery.saidaTime)}</Body2>
              </div>
              
              <div className="row top-spacing">
                <Subtitle2>Valores da reserva</Subtitle2>
                <div className="row-separator" />
              </div>
              
              <div className="row">
                <Body2 blue>Valor da diária</Body2>
                <Body1 primary><b>R$ {valorDiaria}</b></Body1>
              </div>
              
              <div className="row">
                <Body2 blue>Número de diárias</Body2>
                <Body1 primary><b>{numDiarias}</b></Body1>
              </div>
              
              <div className="row-separator" />

              <div className="row">
                <Body1 primary>Total</Body1>
                <Body1 primary>R$ {totalDiarias}</Body1>
              </div>

              <div className="button-container">
                <Button onClick={goToReservationPage}>RESERVE AGORA</Button>
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