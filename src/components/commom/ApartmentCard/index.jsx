import Button from "../Button"

import Image from "next/image";

import {
  FeatureContent,
  Card,
  CardInner,
  CardImage,
  ButtonContainer,
  Details,
  Features,
} from "./styles.js";


import IconWifi from "../../../assets/apartamento/wifi.svg"
import IconPet from "../../../assets/apartamento/pet.svg";
import IconBathtub from "../../../assets/apartamento/bathtub.svg";
import IconWind from "../../../assets/apartamento/wind.svg";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Body1, Body2, Title2 } from "../../../styles/commonStyles";
import Placeholder from "../../../assets/apartamento/placeholder.png";

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

const ApartmentCard = ({ obj, url, showEditButton }) => {
  const isReservado = !!obj.reservado;

  const image = (obj.pictures ?? [])[0] ?? Placeholder.src;

  const isArea = !!obj.urlRec;
  const isApt = !isArea;

  const router = useRouter();

  const features = useMemo(() => {
    let feats = [];
    obj.wifi && feats.push("wifi");
    obj.suite && feats.push("suite");
    obj.animais && feats.push("animais");
    return feats;
  }, [obj]);

  const handleRedirectVerMais = () => {
    router.push(`/ambienteDados?url=${url}&ambientType=${isApt ? "apto" : "recreationArea"}`)
  }

  const handleRedirectEdit = () => {
    isApt ? url = `/editApartment?url=${router.query.url}` : url = `/editRecreationArea?url=${router.query.url}` 
    router.push(url)
  }

  return (
    <Card>
      <CardImage reservado={isReservado}>
        <p>{isReservado ? "Reservado agora" : "Livre agora"}</p>
        <img src={image} alt="Imagem do apartamento" />
      </CardImage>

      <CardInner>
        <Details>
          <Title2>{obj.titulo}</Title2>
          <Body1>Reserva mais proxima: {obj.closestReserva ? `De ${obj.closestReserva.chegada} até ${obj.closestReserva.saida}` : "Nenhuma"}</Body1>
          <Body2>Proxima reserva: {obj.nextClosestReserva ? `De ${obj.nextClosestReserva.chegada} até ${obj.nextClosestReserva.saida}` : "Nenhuma"}</Body2>
          <Features>
            {features.map(f => (
              <Feature type={f} key={f} />
            ))}
          </Features>
        </Details>
        

        {
          !showEditButton ?
            <ButtonContainer>
                <Button onClick={handleRedirectVerMais}>VER MAIS</Button>
            </ButtonContainer>
          :
          <ButtonContainer>
            <Button onClick={handleRedirectEdit}>EDITAR DADOS</Button>
          </ButtonContainer>
        }
      </CardInner>
    </Card>
  );
};

export default ApartmentCard;
