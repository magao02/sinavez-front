import { useAuth } from "../../contexts/AuthContext";
import { format } from 'date-fns';
import { FaRegTrashAlt } from "react-icons/fa";
import {

    Content,

    NavSpacing,

} from "../../styles/apartamentosStyles";
import { Body1, Body2, Title2 } from "../../styles/commonStyles";
import Button from "../../components/commom/Button"
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
const pillStyle = {
  display: 'inline-block',
  padding: '5px 10px',
  borderRadius: '20px',
  fontWeight: '400',
  
  
};
const cellStyle = {
  padding: '15px 20px',  // Aumentando o padding para mais espaço interno
  border: 'none',  // Removendo a borda
  lineHeight: '1.8', // Aumentando o espaçamento entre as linhas
};
import { useEffect, useState } from "react";
import { cancelReservation } from "../../services/apartments";
import styles from './style.module.css';
import Navigation from "../../components/commom/Nav";
import { Modal } from "../../components/lancamentoModal";
import { addLanCamento, getLancamentos, deleteLancamento } from "../../services/lancamentos";
const Reservas = () => {
  const [apts, setApts] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
    const authContext = useAuth();
  useEffect( () => {
     getLancamentoss();
  }, []);
  const getLancamentoss = async () => {
    const req = await getLancamentos(authContext.token);
    if (req.status == 200) {
      setLancamentos(req.data);
    }
    console.log(req)
  };

  const layouReserva = (apt, dado) => {
    const cancelarReserva = async () => {
      console.log(apt.urlApt, dado._id)
      const req = await cancelReservation(authContext.token, apt.urlApt, dado._id);
      if (req.status == 200) {
        getReservas();
      }
    }
    const status = () => {
      console.log(dado)
      if (dado.cancelled) {
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

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  
  const handleSave = async (dados) => {
    console.log(dados)
    const req = await addLanCamento(dados, authContext.token);
    console.log(req)
    if (req.status == 200) {
      getLancamentoss();
    }
    console.log("salvar")
    onClose()
  }

  const handleDelete = async (item) => {
    console.log(item._id)
    const req = await deleteLancamento(item._id , authContext.token);
    console.log(req)
    if (req.status == 200) {
      getLancamentoss();
    }
  }

  return (
    <div>
      <Navigation selectedPage="reservas" variant={authContext?.admin ? "admin" : "logged"} />
      <NavSpacing />
      <Content>
        <div className={styles.lancamentoHeader}>
          <h1>Lançamentos</h1> 
         
            
        </div>
        
        <table className={styles.tableClass} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{backgroundColor: 'hsl(240 4.76% 95.88%)'}}>
          <tr>
            <th style={{padding: '10px'}}>Descrição</th>
            <th style={{padding: '10px'}}>Data</th>
            <th style={{padding: '10px'}}>Valor</th>
              <th style={{ padding: '10px' }}>Tipo</th>
              <th style={{ padding: '10px' }}>Comprovante</th>
              <th style={{padding: '10px'}}></th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((item, index) => (
            <tr key={index}>
              <td style={{...cellStyle}} >{item.descricao}</td>
              <td style={{...cellStyle}}>{format(new Date(item.data), 'dd/MM/yyyy')}</td>
              <td style={{...cellStyle}}>{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td style={{...cellStyle}}><span
                  style={{
                  ...pillStyle,
                    color: item.tipo === 'recebimento' ? 'hsl(146.01 79.89% 35.1% / 1)' : 'hsl(339.20000000000005 90.36% 51.18% / 1)',
                    backgroundColor: item.tipo === 'recebimento' 
      ? 'hsl(145.96000000000004 79.46% 43.92% / .2)'  // verde claro com opacidade
      : 'hsl(339.20000000000005 90.36% 51.18% / .2)',
                  }}
                >
                  {item.tipo}
              </span></td>
              <td style={{...cellStyle}}>{item.urlComprovante ? (
    <a href={item.urlComprovante} download="comprovante">Baixar o comprovante</a>
  ) : (
    'Sem comprovante'
  )}</td>
            </tr>
          ))}
        </tbody>
        </table>
       
       

      </Content>
    </div>
  );
}
export default Reservas;