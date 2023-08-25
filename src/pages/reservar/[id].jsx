import Image from "next/image";
import Navigation from "../../components/commom/Nav";
import { DropdownInput, SearchInput } from "../../components/SearchInputs";

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
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { dayDifference } from "../../utils/date";
import { getRecreationArea } from "../../services/recreationArea";
import { getApartment } from "../../services/apartments";

const Page = () => {
  const authContext = useAuth();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const [model, setModel] = useState({});

  useEffect(async () => {
    if (!router.query.id) return;
    const req = router.query.area == 'true' ? await getRecreationArea(authContext.token, router.query.id) : await getApartment(authContext.token, router.query.id);
    const data = req.data;
    setModel(data);
  }, [router, authContext]);
  
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
    if (!time) return '';
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
      applyPlural(+router.query.adultos, "adulto"),
      applyPlural(+router.query.criancas, "criança"),
      applyPlural(+router.query.bebes, "bebê"),
      `${applyPlural(+router.query.animais, "animal")} de estimação`
    ].join('; ');
  }, [router]);

  const formatPrice = value => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const valorDiaria = useMemo(() => {
    return formatPrice(model.diaria ?? 0);
  }, [model]);

  const numDiarias = useMemo(() => {
    return dayDifference(new Date(router.query.saidaDate), new Date(router.query.chegadaDate));
  }, [model, router]);

  const totalDiarias = useMemo(() => {
    return formatPrice((model.diaria ?? 0) * numDiarias);
  }, [valorDiaria, numDiarias]);

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

  return (
    <div>
      <Navigation selectedPage="apartamentos" variant="admin" />
      <NavSpacing />
      <Content>
        <Breadcrumbs>
          <Image src={IconArrowLeft} onClick={goBack} className="button" />
          <Title1>Pedir pra reservar</Title1>
        </Breadcrumbs>

        <Details>
          <Column>
            <TripDetails>
              <Subtitle1>Sua viagem</Subtitle1>
              <div className="row">
                <SearchInput label="Chegada" innerLabel="Data" type="date" variant="light-blue" disabled initialValue={router.query.chegadaDate} />
                <SearchInput label="Chegada" innerLabel="Data" type="date" variant="light-blue" disabled initialValue={router.query.saidaDate} />
              </div>
              <div>
                <Subtitle2 className="pad-bottom">Horários</Subtitle2>
                <div className="row">
                  <Body2 primary><b>Chegada:</b> {formatTime(router.query.chegadaTime)}</Body2>
                  <Body2 primary><b>Saída:</b> {formatTime(router.query.saidaTime)}</Body2>
                </div>
              </div>
              <div>
                <div className="separator" />
                <DropdownInput label="Hóspedes" disabled options={[hospedesStr]} variant="light-shadow" />
              </div>
            </TripDetails>

            <WarningCard>
              <Image src={IconRedWarning} />
              <div>
                <Subtitle2 red>Atenção</Subtitle2>
                <Body3 red>Controles e chaves devem ser devolvidos na saída.</Body3>
              </div>
            </WarningCard>

            {rulesCard}

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
                  <Body1 strong>{model.titulo ?? '?'}</Body1>
                </div>
              </CardWithName>

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
                <Title2>Total</Title2>
                <Title1>R$ {totalDiarias}</Title1>
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
