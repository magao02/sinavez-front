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

const Feature = ({ text }) => {
  let image;
  // this sucks
  switch (text) {
    case "1 Suíte": image = IconBathtub; break;
    case "Wifi Grátis": image = IconWifi; break;
    case "Aceita pets": image = IconPet; break;
    case "Ar-condicionado": image = IconWind; break;
    default: image = IconWifi; break;
  }
  return (
    <FeatureContent>
      <Image src={image} width="32" height="32" className="icon" />
      {text}
    </FeatureContent>
  );
};

const Apartamento = ({ nome, image, reserva, proxReserva, features }) => {
  return (
    <Card>
      <CardImage>
        <img src={image.src} alt="Imagem do apartamento" />
      </CardImage>

      <CardInner>
        <Details>
          <Title>{nome}</Title>
          <Reserva>Reserva mais proxima: De {reserva.from} até {reserva.to}</Reserva>
          <Reserva small>Proxima reserva: {proxReserva.from} até {proxReserva.to}</Reserva>
          <Features>
            {features.map(text => (
              <Feature text={text} />
            ))}
          </Features>
        </Details>
        
        <ButtonContainer>
          <Button>VER MAIS</Button>
        </ButtonContainer>
      </CardInner>
    </Card>
  );
};

export default Apartamento;
