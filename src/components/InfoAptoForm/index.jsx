import Input from "../commom/Input";
import {
  AddBedButton,
  CamaInputContainer,
  Container,
  InputContainer,
  CheckBoxInputs,
  InputBox,
  ErrorMsg
} from "./styles";
import RadioInput from "../commom/RadioInput";
import { useEffect, useState } from "react";
import CamaInput from "../CamaInput";
import { v4 as uuid } from 'uuid';


const InfoAptoForm = ({setAptoTitle, setAddress, camaInfo, setCamaInfo, radioInput, setRadioInput, camas, title, address, capacity, setCapacity, mainTitle}) => {

  // CAMAS
  /*const [camaInfo, setCamaInfo] = useState([{
    id: uuid(),
    tipo: "",
    Quantidade: ""
  }]); */

  /*const [radioInput, setRadioInput] = useState({
    tipo: "",
    andar: "",
    suite: "",
    wifi: "",
    animais: "",
  });*/

  /*useEffect(() => {
    setMainCamas(camaInfo)
    setRadioInputs(radioInput)
  })*/

  // FUNCOES RELACIONADAS A TITULO
  const handleTitle = (event) => setAptoTitle(event.target.value);

  // FUNCOES RELACIONADAS AO ENDERECO
  const handleAddress = (event) => setAddress(event.target.value);

  // FUNCOES RELACIONADAS A CAMA
  const addCamas = () => {
      setCamaInfo([...camaInfo, {
        id: uuid(),
        tipo: "Solteiro",
        Quantidade: 1
      }])
  };

  const deleteCama = (id) => {
      if(camaInfo.length > 1){
        var itensFiltered = camaInfo.filter((data) => data.id != id);
        setCamaInfo(itensFiltered);
      }
  };

  const map = (id) => {
    var retorno = false;
    for (let idx = 0; idx < camaInfo.length; idx++) {
      if(camaInfo[idx].id == id){
        retorno = true;
        break;
      }
    }

    return retorno;
  }

  const handleCama = (id, e) => {
    const novoObjeto = [...camaInfo];
    var qntd = "1";
    var tipoValue = "";

  
    if (typeof novoObjeto[id]?.["tipo"] !== "undefined") {
      tipoValue = novoObjeto[id]["tipo"];
    }

    if (typeof novoObjeto[id]?.["Quantidade"] !== "undefined") {
      qntd = novoObjeto[id]["Quantidade"];
    }

    if(!map(id)){
      novoObjeto[id] = {
        id: id,
        tipoDeCama: e.target.name == "tipo" ? e.target.value : tipoValue,
        Quantidade: e.target.name == "Quantidade" ? e.target.value : qntd,
    }}else{
        for (let idx = 0; idx < camaInfo.length; idx++) {
          if(camaInfo[idx].id == id){
            novoObjeto[idx][e.target.name] = e.target.value
          }
        }
    }

    setCamaInfo(novoObjeto.filter((data) => data != undefined))
  };

  // BOTOES DE RADIO
  const addRadioInfo = (item) => {
    setRadioInput({ ...radioInput, [item.title]: item.value });
  };
  
  return (
    <Container>
      <h3>{mainTitle ? mainTitle : "Informacoes do Apartamento"}</h3>
      <InputContainer>
      <InputBox>
          <Input
            variant="default"
            name="Título"
            type="text"
            placeholder="Título do apartamento"
            onChange={handleTitle}
            value={title}
          />
          {
            title.length == 0 &&
            <ErrorMsg>Campo Obrigatorio*</ErrorMsg>
          }
         </InputBox>
        {camas ? 
        <CamaInputContainer>
            {camaInfo.map((data) => {
              return (
                <CamaInput
                  id={data.id}
                  deleteCama={deleteCama}
                  handleCama={handleCama}
                  option={data.tipo}
                  value={data.Quantidade}
                />
              );
            })}
          <AddBedButton onClick={addCamas}>
            +<span>ADICIONAR CAMA</span>
          </AddBedButton>
        </CamaInputContainer>
        :
        <InputBox>
          <Input
            variant="default"
            name="Capacidade Máxima*"
            type="number"
            placeholder="Capacidade Máxima*"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          {
            capacity == 0 && 
            <ErrorMsg>Campo Obrigatorio</ErrorMsg>
          }
        </InputBox>
        }
        <InputBox>
          <Input
            variant="default"
            name="Endereço"
            type="text"
            placeholder="Endereço"
            onChange={handleAddress}
            value={address}
          />
          {
            address.length == 0  &&
            <ErrorMsg>Campo Obrigatorio*</ErrorMsg>
          }
        </InputBox>
        <CheckBoxInputs>
          {
            camas ?
              <RadioInput
                title={"Tipo"}
                op1={"Comum"}
                op2={"PCD"}
                addRadioInfo={addRadioInfo}
                value={radioInput.tipo == "Comum" ?  true : false}
              />
          :
              <RadioInput
                title={"Tipo"}
                op1={"Lazer"}
                op2={"Trabalho"}
                addRadioInfo={addRadioInfo}
                value={radioInput.tipo == "Lazer" ?  true : false}
              />
          }
          <RadioInput
            title={"Andar"}
            op1={"Terreo"}
            op2={"1°"}
            addRadioInfo={addRadioInfo}
            value={radioInput.andar == 0 || radioInput.andar == "Terreo" ?  true : false}
          />
          {
            camas ?
              <RadioInput title={"Suite"} addRadioInfo={addRadioInfo} value={radioInput.suite == true || radioInput.suite == "true"  ?  true : false}/>
            :
              <RadioInput title={"Banheiro"} addRadioInfo={addRadioInfo} value={radioInput.suite == true || radioInput.suite == "true"  ?  true : false}/>
          }
          <RadioInput title={"Wifi"} addRadioInfo={addRadioInfo}  value={radioInput.wifi == true || radioInput.wifi == "true" ?  true : false}/>
          <RadioInput
            title={"Animais"}
            border={"none"}
            addRadioInfo={addRadioInfo}
            value={radioInput.animais == true || radioInput.animais == "true" ?  true : false}
          />
        </CheckBoxInputs>
      </InputContainer>
    </Container>
  );
};

export default InfoAptoForm;
