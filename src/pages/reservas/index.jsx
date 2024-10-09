import { useAuth } from "../../contexts/AuthContext";
import {

    Content,

    NavSpacing,

} from "../../styles/apartamentosStyles";
import { Body1, Body2, Title2 } from "../../styles/commonStyles";
import {
  FeatureContent,
  Card,
  CardInner,
  CardImage,
  StyledButton,
  ButtonContainer,
  Details,
  
  Features,
} from "../../styles/userReservasStyles";
import { Button } from "../../components/commom/Button";
import { useEffect, useState } from "react";
import { getReservationsByUser } from "../../services/apartments";

import Navigation from "../../components/commom/Nav";
const Reservas = () => {
  const [apts, setApts] = useState([]);
  const authContext = useAuth();
  useEffect(async () => {
    await getReservas();
  }, [authContext.token]);
  const getReservas = async () => {
    const req = await getReservationsByUser(authContext.token, authContext.urlUser);
    const data = req;
    setApts(data);
    console.log(data);
  };

  const layouReserva = (apt, dado) => {
    const status = () =>{
      if (dado.status == 'Cancelado') {
        return "Reserva cancelada"
      } else if (dado.status != 'Cancelado' && new Date(dado.dataChegada) > new Date()) {
        return "Reservado"
      } else {
        return "Reserva concluída"
      }
    }
     return (
    <Card  >
      <CardImage reservado={true}>
       
        <img src={apt.fotos[0].url} alt="Imagem do apartamento" />
      </CardImage>

      <CardInner>
        <Details>
          <Title2>{apt.nome}</Title2>
          <Body1>Data de Chegada: {new Date(dado.dataChegada).toLocaleDateString()}</Body1>
             <Body2>Data de Saída: {new Date(dado.dataSaida).toLocaleDateString()} </Body2>
             <Body2>Diária: R$ {dado.diaria},00</Body2>
              <Body2>Dias: {dado.dias}</Body2>
             <Body2>Hóspedes (Adultos): {dado.hospedes.adultos}</Body2>
             <Body2>status: {status()}</Body2>
             {status() == "Reservado" && 
               <ButtonContainer>
                  <StyledButton onClick={()=> cancelarReserva()} >Cancelar Reserva</StyledButton>

              </ButtonContainer>
              }
         
        </Details>
        
       
      </CardInner>
    </Card>
  );
  }
  const cancelarReserva = () => {
    alert("Reserva cancelada com sucesso")
  }
  return (
    <div>
      <Navigation selectedPage="reservas" variant={authContext?.admin ? "admin" : "logged"} />
      <NavSpacing />
      <Content>
        <h1>Suas Reservas</h1>
        <div>
          {apts.map((apt) => (
           
        <div key={apt.aptID}>
         
              {apt.dados.map((dado) => (
            
            layouReserva(apt,dado)
          ))}
        </div>
      ))}

        </div>

      </Content>
    </div>
  );
}
export default Reservas;