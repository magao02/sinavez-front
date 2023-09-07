import {
  Header,
  Container,
  RedirectArea,
  TitleArea,
  MainContent,
  AmbientWrapper,
  ReservasArea,
  MonthsArea,
  DataArea,
  ReservasContent,
  NoReservations,
  ButtonReserva,
  MsgArea,
  ReservasInfo
} from "../../styles/AmbienteDadosStyles";
import Navigation from "../../components/commom/Nav";
import Button from "../../components/commom/Button";
import Image from "next/image";
import leftArrow from "../../assets/leftArrow.svg";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as serviceApto from "../../services/apartments";
import * as serviceArea from "../../services/recreationArea"
import ApartmentCard from "../../components/commom/ApartmentCard";
import MonthsOptions from "../../components/MonthsOptions";
import no_reservas from "../../assets/no_reservas.svg"
import ReservaCard from "../../components/ReservaCard";

const ambienteDados = () => {
    const authContext = useAuth();
    const router = useRouter();
    
    const [ambientData, setAmbientData] = useState([]);
    const [reservas, setReservas] = useState([])
    const [url, setUrl] = useState("")
    const [month, setMonth] = useState(1)
    
    
    const redirectPage = () => {
        router.push("/manageReservations");
    };

    const redirectToReservas = () => {
      router.push("/reservas")
    }

    const getMonth = ( data ) => {
      if(data == "") return;

      const newDate = new Date(data);
      newDate.setDate(newDate.getDate() + 1);

      const formatter = Intl.DateTimeFormat("pt-br", {
        month: "numeric"
      })

      return formatter.format(newDate)
    }

    var reservasFiltered = reservas != undefined ? reservas.filter(( reserva ) => getMonth(reserva.dataChegada) == month) : []
    
    useEffect(async () => {
      try{
        var { data } = await serviceApto.getApartment(authContext.token, localStorage.getItem("urlAmbient"))
        const reqReservas = await serviceApto.getReservations(authContext.token, localStorage.getItem("urlAmbient"))
        setAmbientData(data)
        setReservas(reqReservas.data)
        setUrl(localStorage.getItem("urlAmbient"))
      }catch{
        const { data } = await serviceArea.getRecreationArea(authContext.token, localStorage.getItem("urlAmbient"))
        const reqReservas = await serviceArea.getReservations(authContext.token, localStorage.getItem("urlAmbient"))
        setAmbientData(data)
        setReservas(reqReservas.data);
        setUrl(localStorage.getItem("urlAmbient"))
      }
    },[]);


  return (
    <Container>
      <Header>
        <Navigation variant={"admin"}></Navigation>
      </Header>
      <MainContent>
        <RedirectArea>
          <Button
            variant={"image"}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1vw",
              alignItens: "center",
            }}
          >
            <Image src={leftArrow} alt={"arrow"} onClick={redirectPage}></Image>
            <a onClick={redirectPage}>Todos os Ambientes</a>
            <a>/</a>
            <a>Detalhes de Reservas do ambiente</a>
          </Button>
        </RedirectArea>
        <TitleArea>
          <h2>Dados do ambiente</h2>
        </TitleArea>
        <AmbientWrapper>
            <ApartmentCard obj={ambientData} url={url} showEditButton={true}></ApartmentCard>
        </AmbientWrapper>
        <ReservasArea>
            <TitleArea>
              <h2>Reservas feitas para esse Ambiente</h2>
            </TitleArea>
            <DataArea>
              <MonthsArea>
                <MonthsOptions setMonth={setMonth}></MonthsOptions>
              </MonthsArea>
              <ReservasContent>
                {
                  reservasFiltered.length == 0 ?
                    <NoReservations>
                      <MsgArea>
                        <h2>Ainda não há reservas</h2>
                        <h2>nesse mês para esse ambiente!</h2>
                      </MsgArea>
                      <ButtonReserva onClick={redirectToReservas}>FAÇA UMA RESERVA</ButtonReserva>
                      <img src={no_reservas.src}></img>
                    </NoReservations>
                  :
                  <ReservasInfo>
                    {
                      reservasFiltered.map(( reserva ) => {
                        return (
                          <ReservaCard obj={reserva}></ReservaCard>
                        )
                      })
                    }
                  </ReservasInfo>
                }
              </ReservasContent>
            </DataArea>
        </ReservasArea>
      </MainContent>
    </Container>
  );
};

export default ambienteDados;
