import Image from "next/image";

import UserIcon from "../../../assets/user_icon.svg";
import DeleteIcon from "../../../assets/remove_icon.svg";
import EditIcon from "../../../assets/edit_icon.svg";
import pdfIcon from "../../../assets/pdf_icon.svg";

import Button from "../Button";

import { Container } from "./styles";

const List = (props) => ListVariant(props);

function ListVariant({ variant, data, toggleFormUp, remove, edit }) {
  switch (variant) {
    case "dependente": {
      const removeDependent = () => {
        remove(data.urlDep);
      };

      return (
        <Container variant="dependente">
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
      const removeUser = () => {
        remove(data.urlUser);
      };
      const editUser = () => {
        edit(data.urlUser);
      }
      return (
        <Container variant="associados">
          <p>{data.name}</p>
          <p>{data.cpf}</p>
          <Button variant="image" onClick={() => toggleFormUp(data)}>
            <Image
              src={pdfIcon}
              alt="botão para gerar pdf"
            />
          </Button>
          <Button variant="image" onClick={editUser}>
            <Image
              src={EditIcon}
              alt="botão para editara associado"
            />
          </Button>
          <Button variant="image" onClick={removeUser}>
            <Image
              src={DeleteIcon}
              alt="botão para deletar associado"
            />
          </Button>
        </Container>
      );
    }
  }
}

export default List;
