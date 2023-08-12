import Input from "../commom/Input";
import {
  AddBedButton,
  CamaInputContainer,
  Container,
  InputContainer,
  CheckBoxInputs,
} from "./styles";
import RadioInput from "../commom/RadioInput";
import { useEffect, useState } from "react";
import CamaInput from "../CamaInput";
import { v4 as uuid } from 'uuid';


const InfoAptoForm = ({setAptoTitle, setAddress, setMainCamas, setRadioInputs, camas}) => {
  // CAMAS
  const [camaInfo, setCamaInfo] = useState([{
    id: uuid(),
    tipo: "",
    Quantidade: ""
  }]);

  const [disableButton, setDisableButton] = useState(true);

  const [radioInput, setRadioInput] = useState({
    tipo: "",
    andar: "",
    suite: "",
    wifi: "",
    animais: "",
  });

  useEffect(() => {
    setMainCamas(camaInfo)
    setRadioInputs(radioInput)
  })

  // FUNCOES RELACIONADAS A TITULO
  const handleTitle = (event) => setAptoTitle(event.target.value);

  // FUNCOES RELACIONADAS AO ENDERECO
  const handleAddress = (event) => setAddress(event.target.value);

  // FUNCOES RELACIONADAS A CAMA
  const addCamas = () => {
      setCamaInfo([...camaInfo, {
        id: uuid(),
        tipo: "",
        Quantidade: ""
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
      <h3>Informacoes do Apartamento</h3>
      <InputContainer>
        <Input
          variant="default"
          name="Título"
          type="text"
          placeholder="Título do apartamento"
          onChange={handleTitle}
        />
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
        <Input
          variant="default"
          name="Capacidade Máxima*"
          type="number"
          placeholder="Capacidade Máxima*"
        />
        }
        <Input
          variant="default"
          name="Endereço"
          type="text"
          placeholder="Endereço"
          onChange={handleAddress}
        />
        <CheckBoxInputs>
          <RadioInput
            title={"Tipo"}
            op1={"Comum"}
            op2={"PCD"}
            addRadioInfo={addRadioInfo}
          />
          <RadioInput
            title={"Andar"}
            op1={"Terreo"}
            op2={"1°"}
            addRadioInfo={addRadioInfo}
          />
          <RadioInput title={"Suite"} addRadioInfo={addRadioInfo} />
          <RadioInput title={"Wifi"} addRadioInfo={addRadioInfo} />
          <RadioInput
            title={"Animais"}
            border={"none"}
            addRadioInfo={addRadioInfo}
          />
        </CheckBoxInputs>
      </InputContainer>
    </Container>
  );
};

export default InfoAptoForm;
