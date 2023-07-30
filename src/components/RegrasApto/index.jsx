import {
  Container,
  EditButton,
  Wrapper,
  RegrasArea,
  InputContainer,
  DeleteButton,
  AddButton,
} from "./styles";

import edit_pen from "../../assets/edit_pen.svg";
import Image from "next/image";
import { useState } from "react";
import trash from "../../assets/trash.svg";
import Input from "../commom/Input";
import ConfirmButtons from "../commom/ConfirmButtons";

const RegrasApto = ({ title }) => {
  const [edit, setEdit] = useState(false);
  const [inputId, setInputId] = useState(4);
  const [newRuleInput, setNewRuleInput] = useState("");
  const [inputsBase, setInputsBase] = useState([
    {
      id: 0,
      placeholder:
      "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
      value: "",
    },
    {
      id: 1,
      placeholder:
      "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
      value: "",
    },
    {
        id: 2,
        placeholder:
        "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
        value: "",
      },
      {
        id: 3,
      placeholder:
      "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
      value: "",
    },
]);

const [oldInput, setOldInput] = useState(inputsBase);

const handleChange = (event) => {
    const { id, value } = event.target;
    inputsBase.forEach((data) => {
      if(data.id == id){
        data.value = value;
      }
    })
  };

  const addInput = () => {
      setInputId(1 + inputId);
      setInputsBase([...inputsBase, { id: inputId, value: newRuleInput}]);
      setNewRuleInput("")
    };

    const deleteInput = (id) => {
        if(inputsBase.length != 1){
            var filtered = inputsBase.filter((data) => data.id != id)
            setInputsBase(filtered)
        }
    }

    const HandleSave = () => {
        setOldInput(inputsBase)    
        setEdit(!edit)
    }

    
    const handleCancel = ( data ) => {
        setInputsBase(data)
        setEdit(!edit)
    }

  return (
    <Container>
      <Wrapper>
        <h3>{title}</h3>
        <EditButton onClick={() => setEdit(!edit)}>
          <Image src={edit_pen} />
        </EditButton>
      </Wrapper>
      <RegrasArea>
        {inputsBase.map((item) => {
          return (
            <InputContainer >
              {edit && (
                <DeleteButton name={item.id} onClick={(e) => deleteInput(e.target.parentNode.name)}>
                  <Image src={trash} alt={"trashIcon"} />
                </DeleteButton>
              )}
              <Input
                variant="default"
                type="text"
                placeholder={item.placeholder}
                onChange={handleChange}
                id={item.id}
                initialValue={item.value}
              ></Input>
            </InputContainer>
          );
        })}
      </RegrasArea>
      <Wrapper>
        <Input
          placeholder="Nova Regra"
          onChange={(e) => setNewRuleInput(e.target.value)}
        ></Input>
        <AddButton onClick={addInput}>
          <span>+</span>ADICIONAR
        </AddButton>
      </Wrapper>
      <Wrapper>
        {edit && 
            <ConfirmButtons handleCancel={handleCancel} data={oldInput} save={HandleSave}></ConfirmButtons>
        }
      </Wrapper>
    </Container>
  );
};

export default RegrasApto;
