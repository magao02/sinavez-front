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
  ReservasInfo,
  LoadingContainer
} from "../../styles/AmbienteDadosStyles";
import Navigation from "../../components/commom/Nav";
import Button from "../../components/commom/Button";
import Image from "next/image";
import leftArrow from "../../assets/leftArrow.svg";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as serviceApto from "../../services/apartments";
import * as serviceArea from "../../services/recreationArea"
import ApartmentCard from "../../components/commom/ApartmentCard";
import MonthsOptions from "../../components/MonthsOptions";
import no_reservas from "../../assets/no_reservas.svg"
import ReservaCard from "../../components/ReservaCard";
import { dateFromDMY } from "../../utils/date";
import loading from "../../assets/loading_Apto.svg"

const ambienteDados = () => {
  
    const authContext = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!authContext.auth || !authContext.admin || !authContext.adminMaster) {
          router.push("/login");
        return;
      }
  },[authContext.auth])
    
    const [ambientData, setAmbientData] = useState([]);
    const [reservas, setReservas] = useState([])
    const [url, setUrl] = useState("")
    const [isMakingRequest, setIsMakingRequest] = useState(true)

    const isApt = !!ambientData.urlApt 

    const getMonth = ( data ) => {
      if(data == "") return;
      return dateFromDMY(data).getUTCMonth() + 1;
    }

    const [month, setMonth] = useState(new Date().getUTCMonth() + 1);
    
    
    const redirectPage = () => {
        router.push("/manageReservations");
    };

    const redirectToReservas = () => {
      router.push(`/associadosReservar?urlAmbient=${url}&ambientType=${isApt ? "apto" : "recreationArea"}`)
    }

    const handlePagamento = ( id ) => {
        var copy = [...reservas]
        var reserva  = copy.filter((reservas) => reservas.id == id)[0]
        reserva.pagamento.pago = !reserva.pagamento.pago
        setReservas(copy)

        isApt ? serviceApto.updatePayment(authContext.token, ambientData.urlApt, id, reserva.pagamento.pago) : serviceArea.updatePayment(authContext.token, ambientData.urlRec, id, reserva.pagamento.pago)
    }

    const handleFile = ( id, file ) => {
        var copy = [...reservas]
        var reserva  = copy.filter((reservas) => reservas.id == id)[0]
        reserva.pagamento.files.push(file)
        setReservas(copy)

        isApt ? serviceApto.uploadPayment(authContext.token, ambientData.urlApt, id, reserva.pagamento.files) : serviceArea.updatePayment(authContext.token, ambientData.urlRec, id, reserva.pagamento.files)
    }

    const deleteFile = (id, file) => {
        var copy = [...reservas]
        var reserva = copy.filter((reservas) => reservas.id == id)[0]
        var idx = reserva.pagamento.files.indexOf(file)
        reserva.pagamento.files.slice(idx)
        setReservas(copy)
        isApt ? serviceApto.deletePayment(authContext.token, ambientData.urlApt, id, file.url) : serviceArea.deletePayment(authContext.token, ambientData.urlApt, id, file.url)
    }

    var reservasFiltered = reservas != undefined ? reservas.filter(( reserva ) => getMonth(reserva.dataChegada) == month) : []
    
    useEffect(async () => {
      if(router.isReady){
        if(router.query.ambientType == "apto") {
          var { data } = await serviceApto.getApartment(authContext.token, router.query.url)
          const reqReservas = await serviceApto.getReservations(authContext.token, router.query.url)
          setAmbientData(data)
          setReservas(reqReservas.data)
          setUrl(router.query.url)
        }else{
          const { data } = await serviceArea.getRecreationArea(authContext.token, router.query.url)
          const reqReservas = await serviceArea.getReservations(authContext.token, router.query.url)
          setAmbientData(data)
          setReservas(reqReservas.data)
          setUrl(router.query.url)
        }
        setIsMakingRequest(false)
      }
    },[router.isReady]);

    if (isMakingRequest){
      return (
        <LoadingContainer>
            <img src={loading.src}></img>
        </LoadingContainer>
      )
    }else{
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
                    <MonthsOptions month={month} setMonth={setMonth}></MonthsOptions>
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
                              <ReservaCard obj={reserva} id={reserva.id} handlePagamento={handlePagamento} handleFile={handleFile} deleteFile={deleteFile}></ReservaCard>
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
    }
};

export default ambienteDados;
