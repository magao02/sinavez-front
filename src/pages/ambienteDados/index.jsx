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
import * as serviceApto from "../../services/Apto";
import * as serviceArea from "../../services/RecreationArea";
import AmbientModal from "../../components/AmbientModal";
import MonthsOptions from "../../components/MonthsOptions";
import no_reservas from "../../assets/no_reservas.svg"
import ReservaModal from "../../components/ReservaModal";

const ambienteDados = () => {
  
  
    const authContext = useAuth();
    const router = useRouter();
    
    const [ambientData, setAmbientData] = useState([]);
    const [reservas, setReservas] = useState([])
    
    
    const redirectPage = () => {
        router.push("/manageReservations");
    };

    const redirectToReservas = () => {
      router.push("/reservas")
    }
    
    useEffect(async () => {
      try{
        var {data} = await serviceApto.getApartament(authContext.token, localStorage.getItem("urlAmbient"))
        setReservas(data.reservas)
        setAmbientData(data)
      }catch{
        const { data } = await serviceArea.getApartament(authContext.token, localStorage.getItem("urlAmbient"))
        setAmbientData(data)
        setReservas(data.reservas)
      }
    },[]);
  
    const getIcons = (data) => {
        var obj = {
            "suite": data.suite,
            "wifi": data.wifi,
            "animais": data.animais,
            "arCondicionado": data.itens && data.itens.includes("ar condicionado") ? true : false 
        }
        return obj;
    }

const checkBusy = (datas) => {
    const data1 = new Date("05/04/2023")
    const data2 = new Date("10/05/2023")
    const today = new Date()

    if(data1 < today && data2 > today){
      return true
    }else{
      return false
    }
}

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
            <AmbientModal title={ambientData.titulo} itens={getIcons(ambientData)} status={checkBusy(ambientData.reservas)} url={ambientData.urlApt} showVerMais={false}>
            </AmbientModal>
        </AmbientWrapper>
        <ReservasArea>
            <TitleArea>
              <h2>Reservas feitas para esse Ambiente</h2>
            </TitleArea>
            <DataArea>
              <MonthsArea>
                <MonthsOptions></MonthsOptions>
              </MonthsArea>
              <ReservasContent>
                {
                  reservas.length != 0 ?
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
                    <ReservaModal></ReservaModal>
                    <ReservaModal></ReservaModal>
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
