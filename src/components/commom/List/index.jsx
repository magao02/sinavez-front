import Image from "next/image";

import { useCallback } from 'react';

import UserIcon from "../../../assets/user_icon.svg";
import DeleteIcon from "../../../assets/remove_icon.svg";

import Button from "../Button";

import { Container } from "./styles";

const List = (props) => ListVariant(props);

function ListVariant({ variant, data, toggleFormUp, remove }) {
  switch (variant) {
    case "dependente": {

      const removeDependent = () => {
        remove(data.urlDep)
      }

      return (
        <Container>
          <Image src={UserIcon} />
          <p>{data.name}</p>
          <p>{data.nascimento}</p>
          <p>{data.cpf}</p>
          <p>{data.rg}</p>
          <p>{data.emissao}</p>
          <Button variant="image" onClick={removeDependent}>
            <Image src={DeleteIcon} />
          </Button>
        </Container>
      );
    }
    case "associados": {
      return (
        <Container>  
          <p>{data.name}</p>
          <p>{data.cpf}</p>
          <Button variant="image" onClick={() => toggleFormUp(data)}>
            <img src="https://img.icons8.com/office/30/000000/pdf.png" />
          </Button>
        </Container>
      );
    }
  }
}

export default List;
