import styled from "styled-components";

import Button from "../commom/Button";

import Image from "next/image";

import {
  FeatureContent,
  Card,
  CardInner,
  CardImage,
  ButtonContainer,
  Details,
  Title,
  Reserva,
  Features,
} from "./styles.js";

import IconWifi from "../../assets/apartamento/wifi.svg";
import IconPet from "../../assets/apartamento/pet.svg";
import IconBathtub from "../../assets/apartamento/bathtub.svg";
import IconWind from "../../assets/apartamento/wind.svg";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Feature = ({ type }) => {
  let image = IconWifi;
  let text = type;
  switch (type) {
    case "suite":
      text = "1 Suíte";
      image = IconBathtub;
      break;
    case "wifi":
      text = "Wifi Grátis";
      image = IconWifi;
      break;
    case "animais":
      text = "Aceita pets";
      image = IconPet;
      break;
  }
  return (
    <FeatureContent>
      <Image src={image} width="32" height="32" className="icon" />
      {text}
    </FeatureContent>
  );
};

const Apartamento = ({ obj, queryData }) => {
  // TODO: figure out how reservations should work
  const isReservado = false;
  const reserva = { from: '??', to: '??' };
  const proxReserva = { from: '??', to: '??' };

  const image = obj.images[0];

  const isArea = !!obj.urlRec;
  const isApt = !isArea;
  const url = useMemo(() => {
    const query = queryData ? `?adultos=${queryData.adultos}&criancas=${queryData.criancas}&bebes=${queryData.bebes}&animais=${queryData.animais}` : '';
    return isApt ? `/apartamento/${obj.urlApt}${query}` : `/area/${obj.urlRec}${query}`;
  }, [obj, queryData]);

  const router = useRouter();

  const redirect = () => {
    router.push(url);
  };

  const features = useMemo(() => {
    let feats = [];
    obj.wifi && feats.push("wifi");
    obj.suite && feats.push("suite");
    obj.animais && feats.push("animais");
    return feats;
  }, [obj]);

  return (
    <Card>
      <CardImage reservado={isReservado}>
        <p>{isReservado ? "Reservado agora" : "Livre agora"}</p>
        <img src={image.src} alt="Imagem do apartamento" />
      </CardImage>

      <CardInner>
        <Details>
          <Title>{obj.titulo}</Title>
          <Reserva>Reserva mais proxima: De {reserva.from} até {reserva.to}</Reserva>
          <Reserva small>Proxima reserva: {proxReserva.from} até {proxReserva.to}</Reserva>
          <Features>
            {features.map(f => (
              <Feature type={f} key={f} />
            ))}
          </Features>
        </Details>
        
        <ButtonContainer>
          <Button onClick={redirect}>VER MAIS</Button>
        </ButtonContainer>
      </CardInner>
    </Card>
  );
};

export default Apartamento;
