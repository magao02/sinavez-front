import React from "react";
import { Container, Label, CheckBox, Button } from "./styles";
import Image from "next/image";
import trash from "../../../assets/trash.svg";

const CheckBoxReserv = ({
  label,
  showTrash,
  selectedItems,
  setCheckedItems,
  item,
}) => {
  const handleCheckboxClick = () => {
    if (setCheckedItems) {
      setCheckedItems(item); // Define o associado selecionado como este
    }
  };

  return (
    <Container>
      <CheckBox
        name="Itens"
        id={label}
        value={label}
        onClick={handleCheckboxClick}
        checked={selectedItems === item} // Verifica se o associado atual é o selecionado
      ></CheckBox>
      <Label>{label}</Label>
    </Container>
  );
};

export default CheckBoxReserv;
