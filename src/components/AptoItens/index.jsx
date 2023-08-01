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
import { useState } from "react";
import ConfirmButtons from "../commom/ConfirmButtons";

const AptoItens = ({ title, itens, setItens }) => {
  const [edit, setEdit] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [oldItens, setOldItens] = useState(itens);

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
  };

  const HandleSave = () => {
    setOldItens(itens);
    setEdit(!edit);
  };

  return (
    <Container>
      <Header>
        <h3>{title}</h3>
        <EditButton onClick={() => setEdit(!edit)}>
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
          save={HandleSave}
          handleCancel={handleCancel}
        ></ConfirmButtons>
      )}
    </Container>
  );
};

export default AptoItens;
