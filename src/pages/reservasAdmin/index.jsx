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
import { SearchInput } from "../../components/SearchInputs";
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
import {  cancelReservation } from "../../services/apartments";
import loading from "../../assets/loading_Apto.svg"

const ambienteDados = () => {
  
    const authContext = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!authContext.auth || !authContext.admin) {
          router.push("/login");
        return;
      }
  },[authContext.auth])
    
    const [ambientData, setAmbientData] = useState([]);
    const [reservas, setReservas] = useState([])
    const [url, setUrl] = useState("")
  const [isMakingRequest, setIsMakingRequest] = useState(true)
  const [reservasFiltered, setReservasFiltered] = useState([])
  const [date, setDate] = useState(new Date());

    const isApt = true

    const getMonth = ( data ) => {
      if(data == "") return;
      return dateFromDMY(data).getUTCMonth() + 1;
    }

    const [month, setMonth] = useState(new Date().getUTCMonth() + 1);
    
    

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
  
    const setandodataInicio = async (e) => {

    const data = e.target.value;
    setDate(data);
    const reqReservas = await serviceApto.getReservationsByDate(authContext.token, date)
          console.log(reqReservas)
          
      setReservas(reqReservas.data)
      setReservasFiltered(reservas != undefined ? reservas.filter(( reserva ) => getMonth(reserva.dataChegada) == month) : [])

  }
  
  const cancelarReserva = async (apt, id) => {
    console.log(apt)
    const req = await cancelReservation(authContext.token, apt, id);
      if (req.status == 200) {
        if(router.query.ambientType == "apto") {
          
          const reqReservas = await serviceApto.getReservationsByDate(authContext.token, date)
          console.log(reqReservas)
          
          setReservas(reqReservas.data)
          setUrl(router.query.url)
        }else{
          const reqReservas = await serviceApto.getReservationsByDate(authContext.token, date)
          setReservas(reqReservas.data)
          setUrl(router.query.url)
        }
        setIsMakingRequest(false)
      }
    alert("Reserva cancelada com sucesso!")
  }


   
    
    useEffect(async () => {
      if(router.isReady){
        if(router.query.ambientType == "apto") {
          var { data } = await serviceApto.getApartment(authContext.token, router.query.url)
          debugger
          const yesterday = new Date(new Date().setDate(new Date().getDate() - 2))
          const reqReservas = await serviceApto.getReservationsByDate(authContext.token, yesterday)
          console.log(reqReservas)
          
          setReservas(reqReservas.data)
          console.log(reservas)
           setReservasFiltered(reservas != undefined ? reservas.filter(( reserva ) => getMonth(reserva.dataChegada) == month) : [])
          setUrl(router.query.url)
        }else{
          const { data } = await serviceArea.getRecreationArea(authContext.token, router.query.url)
          const reqReservas = await serviceArea.getReservations(authContext.token, router.query.url)
          setAmbientData(data)
          setReservas(reqReservas.data)
           setReservasFiltered(reservas != undefined ? reservas.filter(( reserva ) => getMonth(reserva.dataChegada) == month) : [])
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
           
            <ReservasArea>
              <TitleArea>
                            <SearchInput style={{ width: '150px !important' }} label="Data ínicio" type="date" innerLabel="Data" initialValue={date} onChange={setandodataInicio} />
                  <h2>Reservas feitas nesse dia</h2>
                </TitleArea>
                <DataArea>
                
                  <ReservasContent>
                    {
                      reservasFiltered.length == 0 ?
                        <NoReservations>
                          <MsgArea>
                            <h2>Ainda não há reservas</h2>
                            <h2>Procure outra data!</h2>
                          </MsgArea>
                         
                          <img src={no_reservas.src}></img>
                        </NoReservations>
                      :
                      <ReservasInfo>
                       
                        {
                          reservasFiltered.map(( reserva ) => {
                            return (
                              <ReservaCard onChange={cancelarReserva} token={authContext.token} apartment={router.query.url} obj={reserva} id={reserva.id} handlePagamento={handlePagamento} handleFile={handleFile} deleteFile={deleteFile}></ReservaCard>
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
