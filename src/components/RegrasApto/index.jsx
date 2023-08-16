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
import { useEffect, useState } from "react";
import trash from "../../assets/trash.svg";
import Input from "../commom/Input";
import ConfirmButtons from "../commom/ConfirmButtons";

const RegrasApto = ({
  title,
  cautionModal,
  cancelAll,
  setCancelAll,
  setSaveAll,
  saveAll,
  inputsBase,
  setInputsBase,
}) => {
  const [edit, setEdit] = useState(false);
  const [inputId, setInputId] = useState(4);
  const [newRuleInput, setNewRuleInput] = useState("");

  const [oldInput, setOldInput] = useState(inputsBase);

  useEffect(() => {
    setOldInput(inputsBase);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    inputsBase.forEach((data) => {
      if (data.id == id) {
        data.value = value;
      }
    });
  };

  const addInput = () => {
    setInputId(1 + inputId);
    setInputsBase([
      ...inputsBase,
      {
        id: inputId,
        placeholder:
          "Informe uma regra de convivencia para reforcar aos hospedes que sigam enquanto estiverem usando o servico",
        value: newRuleInput,
      },
    ]);
    setNewRuleInput("");
  };

  const deleteInput = (id) => {
    if (inputsBase.length > 1) {
      var filtered = inputsBase.filter((data) => data.id != id);
      setInputsBase(filtered);
    }
  };

  const HandleSave = () => {
    setOldInput(inputsBase);
    setEdit(!edit);
    cautionModal(title, !edit);
  };

  const handleCancel = (data) => {
    setInputsBase(data);
    setEdit(!edit);
    cautionModal(title, !edit);
  };

  const showEdit = () => {
    setEdit(!edit);
    cautionModal(title, !edit);
    setCancelAll(false);
    setSaveAll(false);
  };

  return (
    <Container>
      <Wrapper>
        <h3>{title}</h3>
        <EditButton onClick={showEdit}>
          <Image src={edit_pen} />
        </EditButton>
      </Wrapper>
      <RegrasArea>
        {inputsBase.map((item) => {
          return (
            <InputContainer>
              {edit && (
                <DeleteButton
                  name={item.id}
                  onClick={(e) => deleteInput(e.target.id)}
                >
                  <Image id={item.id} src={trash} alt={"trashIcon"} />
                </DeleteButton>
              )}
              <Input
                variant="default"
                type="text"
                placeholder={item.placeholder}
                onChange={handleChange}
                id={item.id}
                value={item.value}
              ></Input>
            </InputContainer>
          );
        })}
      </RegrasArea>
      <Wrapper>
        <Input
          id="addInput"
          placeholder="Nova Regra"
          value={newRuleInput}
          onChange={(e) => setNewRuleInput(e.target.value)}
        ></Input>
        <AddButton onClick={addInput}>
          <span>+</span>ADICIONAR
        </AddButton>
      </Wrapper>
      <Wrapper>
        {edit && (
          <ConfirmButtons
            handleCancel={handleCancel}
            data={oldInput}
            save={HandleSave}
            cancelAll={cancelAll}
            saveAll={saveAll}
          ></ConfirmButtons>
        )}
      </Wrapper>
    </Container>
  );
};

export default RegrasApto;
