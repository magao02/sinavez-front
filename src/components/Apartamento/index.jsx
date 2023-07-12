import styled from "styled-components";

import Button from "../commom/Button";

import Image from "next/image";

import {
  FeatureContent,
  Card,
  ButtonContainer,
  Details,
  Title,
  Reserva,
  Features,
} from "./styles.js";

const Feature = ({ text }) => {
  return (
    <FeatureContent>
      <img src="https://source.unsplash.com/random/20x20" width="20" height="20"/>
      {text}
    </FeatureContent>
  );
};

const Apartamento = ({ nome, image, reserva, proxReserva, features }) => {
  return (
    <Card>
      <img src={image} />

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
    </Card>
  );
};

export default Apartamento;
