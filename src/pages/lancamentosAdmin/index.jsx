import { useAuth } from "../../contexts/AuthContext";
import { format,startOfMonth, endOfMonth } from 'date-fns';
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
import Input from "../../components/commom/Input";

import { useEffect, useState, useRef } from "react";
import { cancelReservation } from "../../services/apartments";
import styles from './style.module.css';
import Navigation from "../../components/commom/Nav";
import { Modal } from "../../components/lancamentoModal";
import { addLanCamento, getLancamentos, deleteLancamento } from "../../services/lancamentos";
import { SearchInput } from "../../components/SearchInputs";
const Reservas = () => {
  const [lancamentos, setLancamentos] = useState([]);
  const [lancamentosFiltro, setLancamentosFiltro] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const nameRef = useRef(null);
  const [descricao, setDescricao] = useState('');
    const today = new Date();
  const [dataInicio, setDataInicio] = useState(startOfMonth(today));
  const [dataFim, setDataFim] = useState(endOfMonth(today));

    const authContext = useAuth();
  useEffect( () => {
     getLancamentoss();
  }, []);
  const getLancamentoss = async () => {
    const req = await getLancamentos(authContext.token);
    if (req.status == 200) {
      setLancamentos(req.data);
      filterLancamentosDate();
      
    }
  };

  

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const filterLancamentosDate = () => {
    console.log(lancamentos)
    const lancamentosFiltrados = lancamentos.filter((lancamento) => {
      console.log(lancamento.data)
      const data = new Date(lancamento.data);

      var descricaoValida = true
      if (descricao !== '') {
        descricaoValida = lancamento.descricao
        .toLowerCase()
        .includes(descricao.toLowerCase());
        
      }

      return data >= new Date(dataInicio) && data <= new Date(dataFim) && descricaoValida;
    });
    console.log(lancamentosFiltrados)
    setLancamentosFiltro(lancamentosFiltrados);
  }
  
  useEffect(() => {
      filterLancamentosDate();

  }, [dataInicio, dataFim, lancamentos, descricao]);
  
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

  const setandodataInicio = (e) => {

    const data = e.target.value;
    setDataInicio(data);
    filterLancamentosDate();

  }
  
  const setandoDataFim = (e) => {
    const data = e.target.value;
    setDataFim(data);
    filterLancamentosDate();
  }
  const handleChange = (e) => {
    setDescricao(e.target.value);
  }

  return (
    <div>
      <Navigation selectedPage="reservas" variant={authContext?.admin ? "admin" : "logged"} />
      <NavSpacing />
      <Content>
        <div className={styles.lancamentoHeader}>
          <h2>Lançamentos</h2> 
          <div style={{ width: '600px', display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
            <Input
              variant="default-optional"
              label={"Descrição"}
              name={"descricao"}
              placeholder={"Digite a descrição"}
              ref={nameRef}
              initialValue={''}
              onChange={handleChange}
                  
              
            />
            <SearchInput style={{ width: '150px !important' }} label="Data ínicio" type="date" innerLabel="Data" initialValue={startOfMonth(today)} onChange={setandodataInicio} />
            <SearchInput style={{ maxWidth: '150px' }} label="Data fim" type="date" innerLabel="Data"  initialValue={endOfMonth(today)} onChange={setandoDataFim}/>
          </div>

          <Button variant='editButton' onClick={onOpen}> Novo lançamento</Button>
            
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
          {lancamentosFiltro.map((item, index) => (
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
                <td><FaRegTrashAlt style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item)}></FaRegTrashAlt></td>
            </tr>
          ))}
        </tbody>
        </table>
        {isOpen && (
        <Modal onClose={onClose} handleSave={handleSave} />
      )}
       

      </Content>
    </div>
  );
}
export default Reservas;