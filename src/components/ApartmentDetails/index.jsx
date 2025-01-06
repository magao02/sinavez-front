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

import MapaImage from "../../assets/apartamento/mapa.png";
import IconArrowLeft from "../../assets/icon_arrow_left.svg";
import IconDoubleBed from "../../assets/apartamento/icon_double_bed.svg";
import IconSingleBed from "../../assets/apartamento/icon_single_bed.svg";
import IconRedWarning from "../../assets/icon_red_warning.svg";
import IconLocation from "../../assets/icon_gray_location.svg";
import IconCloseBlack from "../../assets/icon_close_black.svg";
import { DropdownInput, SearchInput } from "../../components/SearchInputs";
import Button from "../../components/commom/Button";
import { getApartment } from "../../services/apartments";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { getRecreationArea } from "../../services/recreationArea";
import { dayDifference } from "../../utils/date";


import IconWifi from "../../assets/apartamento/wifi.svg";
import IconWind from "../../assets/apartamento/wind.svg";
import IconLoop from "../../assets/apartamento/loop.svg";
import IconFerro from "../../assets/apartamento/ferro_passar.svg";
import IconArchiveBox from "../../assets/apartamento/archive_box.svg";
import IconForkKnife from "../../assets/apartamento/fork_knife.svg";
import IconIceCream from "../../assets/apartamento/ice_cream.svg";
import IconPillow from "../../assets/apartamento/pillow.svg";
import IconScribbleLoop from "../../assets/apartamento/scribble_loop.svg";
import IconTelevision from "../../assets/apartamento/television.svg";

function iconForItem(item) {
  item = item.toString().toLowerCase().replace(/[-,]/g, '');
  if (item.match(/wifi/)) return IconWifi;
  if (item.match(/frigobar/)) return IconIceCream;
  if (item.match(/condicionado/)) return IconWind;
  if (item.match(/travesseiro/)) return IconPillow;
  if (item.match(/ferro/)) return IconFerro;
  if (item.match(/lençol|lencol/)) return IconLoop;
  if (item.match(/armário|armario/)) return IconArchiveBox;
  if (item.match(/tv|televisão|televisao/)) return IconTelevision;
  if (item.match(/talheres|pratos/)) return IconForkKnife;

  return IconScribbleLoop;
}

import IconGarage from "../../assets/apartamento/area_garage.svg";
import IconAbstract from "../../assets/apartamento/area_abstract.svg";
import IconChurrasqueira from "../../assets/apartamento/area_churrasqueira.svg";
import IconKitchen from "../../assets/apartamento/area_kitchen.svg";
import IconPeople from "../../assets/apartamento/area_people.svg";
import IconPool from "../../assets/apartamento/area_pool.svg";
import IconWashing from "../../assets/apartamento/area_washing.svg";

function iconForArea(item) {
  item = item.toString().toLowerCase().replace(/[-,]/g, '');
  if (item.match(/garagem/)) return IconGarage;
  if (item.match(/auditorio|auditório/)) return IconPeople;
  if (item.match(/cozinha/)) return IconKitchen;
  if (item.match(/piscina/)) return IconPool;
  if (item.match(/lavanderia/)) return IconWashing;
  if (item.match(/churrasqueira/)) return IconChurrasqueira;

  return IconAbstract;
}

import IconBathtub from "../../assets/apartamento/bathtub_blue.svg";
import IconPets from "../../assets/apartamento/pets_blue.svg";

const ApartmentDetails = ({ area, objectUrl, query }) => {
  const [viewingImages, setViewingImages] = useState(false);
  const [model, setModel] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const authContext = useAuth();

  const router = useRouter();

  useEffect(async () => {
    if (!objectUrl) return;
    const req = area ? await getRecreationArea(authContext.token, objectUrl) : await getApartment(authContext.token, objectUrl);
    const data = req.data;
    setModel(data);
    setIsLoaded(true);
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
      pessoas: query.pessoas ?? 4,
      chegadaTime: query.chegadaTime ?? '11:00',
      saidaTime:  '12:00',
    };
  }, [query]);
  
  const valorDiaria = useMemo(() => {
    return formatPrice(model.diaria ?? 0);
  }, [model]);

  const numDiarias = useMemo(() => {
    return dayDifference(new Date(defaultedQuery.saidaDate), new Date(defaultedQuery.chegadaDate)) + 1;
  }, [model, defaultedQuery]);

  const totalDiarias = useMemo(() => {
    return formatPrice((model.diaria ?? 0) * numDiarias);
  }, [valorDiaria, numDiarias]);

  const goToReservationPage = () => {
    const queryStr = new URLSearchParams({ ...defaultedQuery, area });
    router.push(`/reservar/${objectUrl}?${queryStr}`);
  };

  const goBack = () => {
    router.back();
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
    if (area) {
      return applyPlural(defaultedQuery.pessoas, "pessoa");
    } else {
      return [
        applyPlural(defaultedQuery.adultos, "adulto"),
        applyPlural(defaultedQuery.criancas, "criança"),
        applyPlural(defaultedQuery.bebes, "bebê"),
        `${applyPlural(defaultedQuery.animais, "animal")} de estimação`
      ].join('; ');
    }
  }, [defaultedQuery, area]);

  const typeDescription = useMemo(() => {
    return model?.tipo?.toLowerCase()?.trim() === "pcd" ? "Apartamento Adaptado (com adaptação para PCD)" : "Apartamento Padrão (sem adaptação para PCD)";
  }, [model]);

  const andar = useMemo(() => {
    if (model.andar == 0) {
      return "térreo";
    } else {
      return `${model.andar}º andar`;
    }
  }, [model.andar]);

  const closeViewingImages = () => {
    setViewingImages(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant={authContext?.admin ? "admin" : "logged"} />
      <NavSpacing />
      { isLoaded && <Content>
        <Breadcrumbs>
          <Image onClick={goBack} src={IconArrowLeft} className="button" />
          { !area && <Body1 primary>Todos apartamentos / Detalhes de reservas do apartamento / <u>Detalhes do apartamento</u></Body1> }
          { area && <Body1 primary>Todos apartamentos / <u>Detalhes da área de lazer</u></Body1> }
        </Breadcrumbs>
        <Header>
          { !!model.pictures && !!model.pictures.length && <ImageGallery>
            {
              model.pictures.slice(0, 3).map(url => <img src={url} />)
            }
            <div className="button">
              <Button onClick={_ => setViewingImages(true)}>VER TODAS AS FOTOS</Button>
            </div>
          </ImageGallery> }
          <Title1>{model.titulo}</Title1>
          { !area && <Body1>{typeDescription}, {andar}</Body1> }
        </Header>
        <Details>
          <Column className="features-column">
            { !area && <BlueFeatures>
              {
                model.camas?.map((cama, i) => <BlueFeatureCard key={i}>
                  <Image src={cama.tipo.toString().toLowerCase() === "casal" ? IconDoubleBed : IconSingleBed} />
                  {cama.quantidade} Cama {cama.tipo}
                </BlueFeatureCard>)
              }
              {
                model.suite && <BlueFeatureCard>
                  <Image src={IconBathtub} />
                  1 banheiro
                </BlueFeatureCard>
              }
              {
                model.animais && <BlueFeatureCard>
                  <Image src={IconPets} />
                  Não aceita pets
                </BlueFeatureCard>
              }
            </BlueFeatures> }

            <BlueOutlineCard>
              <div>
                <Subtitle2>{ area ? "Itens disponíveis" : "Itens do Apartamento" }</Subtitle2>
              </div>
              <Features>
                {
                  model.itens?.map(item => <FeatureCard>
                    <Image src={iconForItem(item)} width="32" height="32" />
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
                    <Image src={iconForArea(text)} width="32" height="32" />
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
      </Content> }

      { viewingImages && <FullImageGallery>
        <div className="background" onClick={closeViewingImages} />
        <div className="images">
          <div className="icon" onClick={closeViewingImages}>
            <Image src={IconCloseBlack} />
          </div>
          {
            model.pictures.map(url => <img src={url} />)
          }
        </div>
      </FullImageGallery> }
    </div>
  );
};

export default ApartmentDetails;