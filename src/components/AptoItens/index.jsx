import {
  Container,
  Header,
  EditButton,
  AddItemArea,
  AddButton,
  CheckBoxArea,
} from "./styles";
import edit_pen from "../../assets/edit_pen.svg";
import Image from "next/image";
import Input from "../commom/Input";
import CheckBox from "../CheckBox";
import { useEffect, useRef, useState } from "react";
import ConfirmButtons from "../commom/ConfirmButtons";

const AptoItens = ({ title, itens, setItens, cautionModal, cancelAll, setCancelAll, setSaveAll, saveAll }) => {
  const [edit, setEdit] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [oldItens, setOldItens] = useState(itens);
  const hasReceivedItens = useRef(false);


  useEffect(() => {
    if(!hasReceivedItens.current && itens.length >= 1){
      setOldItens(itens)
      hasReceivedItens.current = true
    }
  }, [itens])

  const addItens = () => {
    if (newItem.trim() != "") {
      var newAux = {
        name: newItem,
        checked: false,
      };
      setItens([...itens, newAux]);
    }
  };

  const deleteItem = (item) => {
    var copy = [...itens];
    var copy = copy.filter((data) => data.name != item.id);
    setItens(copy);
  };

  const setChecked = (item) => {
    var copy = [...itens];
    copy.map((data) => {
      if (data.name == item.id) {
        data.checked = !data.checked;
      }
    });
    setItens(copy);
  };

  const handleCancel = () => {
    setItens(oldItens);
    setEdit(!edit);
    cautionModal(title, !edit);
  };

  const HandleSave = () => {
    setOldItens(itens);
    setEdit(!edit);
    cautionModal(title, !edit);
  };

  const showEdit = () => {
    setEdit(!edit) 
    cautionModal(title, !edit);
    setCancelAll(false);
    setSaveAll(false)
  }

  return (
    <Container>
      <Header>
        <h3>{title}</h3>
        <EditButton onClick={showEdit}>
          <Image src={edit_pen} alt="EditPen" />
        </EditButton>
      </Header>
      <CheckBoxArea>
        <CheckBox
          showTrash={edit}
          options={itens}
          setChecked={setChecked}
          deleteItem={deleteItem}
        />
      </CheckBoxArea>
      <AddItemArea>
        <Input
          type="text"
          placeholder="Novo Item"
          onChange={(e) => setNewItem(e.target.value)}
        />
        <AddButton onClick={addItens}>+ ADICIONAR</AddButton>
      </AddItemArea>
      {edit && (
        <ConfirmButtons
          cancelAll={cancelAll}
          save={HandleSave}
          handleCancel={handleCancel}
          saveAll={saveAll}
        ></ConfirmButtons>
      )}
    </Container>
  );
};

export default AptoItens;
