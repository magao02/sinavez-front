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
  TripDetails,
} from "../../styles/reservaStyles";


import IconRedWarning from "../../assets/icon_red_warning.svg";
import MapaImage from "../../assets/apartamento/mapa.png";
import PlaceholderImage from "../../assets/apartamento/placeholder.png";
import IconArrowLeft from "../../assets/icon_arrow_left.svg";
import LoadingSpinner from "../../assets/loading_spinner.svg";
import PersonConfirm from "../../assets/person_confirm.svg";
import WomanExclamation from "../../assets/woman_exclamation.svg";
import Button from "../../components/commom/Button";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { dateToDMY, dayDifference } from "../../utils/date";
import { getRecreationArea, reserveRecreationArea } from "../../services/recreationArea";
import { getApartment, reserveApartment } from "../../services/apartments";
import BigConfirmPopup from "../../components/BigConfirmPopup";

const Page = () => {
  const authContext = useAuth();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const [model, setModel] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const isArea = useMemo(() => {
    return router.query.area == "true";
  }, [router.query]);

  useEffect(async () => {
    if (!router.query.id) return;
    const req = isArea ? await getRecreationArea(authContext.token, router.query.id) : await getApartment(authContext.token, router.query.id);
    const data = req.data;
    setModel(data);
    setIsLoaded(true);
  }, [router, authContext, isArea]);
  
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
    if (isArea) {
      return applyPlural(+router.query.pessoas, "pessoa");
    } else {
      return [
        applyPlural(+router.query.adultos, "adulto"),
        applyPlural(+router.query.criancas, "criança"),
        applyPlural(+router.query.bebes, "bebê"),
        `${applyPlural(+router.query.animais, "animal")} de estimação`
      ].join('; ');
    }
  }, [router, isArea]);

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
    return Math.max(1, dayDifference(new Date(router.query.saidaDate), new Date(router.query.chegadaDate)) + 1);
  }, [model, router]);

  const totalDiarias = useMemo(() => {
    return formatPrice((model.diaria ?? 0) * numDiarias);
  }, [valorDiaria, numDiarias]);

  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [requestErrored, setRequestErrored] = useState(false);

  const doRequest = async () => {
    const data = {
      dataChegada: router.query.chegadaDate,
      dataSaida: router.query.saidaDate,
      horarioChegada: router.query.chegadaTime,
      horarioSaida: router.query.saidaTime,
      adultos: +router.query.adultos,
      criancas: +router.query.criancas,
      bebes: +router.query.bebes,
      animais: +router.query.animais,
      pessoas: +router.query.pessoas,
    };
    console.log("data is", data);
    setIsMakingRequest(true);
    try {
      if (router.query.area === "true") {
        await reserveRecreationArea(authContext.token, router.query.id, authContext.urlUser, data);
      } else {
        await reserveApartment(authContext.token, router.query.id, authContext.urlUser, data);
      }
      setIsRequestDone(true);
    } catch (err) {
      console.log(err);
      setRequestErrored(true);
    }
    setIsMakingRequest(false);
  }

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
    <>
      <Navigation selectedPage="apartamentos" variant={authContext?.admin ? "admin" : "logged"} />
      <NavSpacing />
      { isLoaded && <Content>
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
                <img src={(model.pictures ?? [])[0] ?? PlaceholderImage.src} />
                <div className="text">
                  <Body3>Espaço inteiro: { isArea ? "area de lazer" : "apartamento" }</Body3>
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

            { isMakingRequest ?
              <Button>RESERVE AGORA <Image src={LoadingSpinner} /></Button> : 
              <Button onClick={doRequest}>RESERVE AGORA</Button>
            }
          </Column>
        </Details>

      </Content> }
      { isRequestDone && <BigConfirmPopup
        title="Sucesso"
        body="Reserva foi feita com sucesso"
        image={PersonConfirm.src}
        cancelText="OK"
        onCancel={() => setIsRequestDone(false)}
      /> }
      { requestErrored && <BigConfirmPopup
        title="Erro ao fazer a reserva"
        body="Houve um erro fazendo a reserva. Talvez alguma reserva com esse horario já existe."
        image={WomanExclamation.src}
        cancelText="OK"
        onCancel={() => setRequestErrored(false)}
      /> }
    </>
  )
};

export default Page;
