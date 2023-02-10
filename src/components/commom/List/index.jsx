import Image from "next/image";

import UserIcon from "../../../assets/user_icon.svg";
import DeleteIcon from "../../../assets/remove_icon.svg";
import EditIcon from "../../../assets/edit_icon.svg";
import AdminIcon from "../../../assets/admin_icon.svg";
import pdfIcon from "../../../assets/pdf_icon.svg";

import Button from "../Button";

import { Container } from "./styles";

const List = (props) => ListVariant(props);

function ListVariant({ variant, data, remove, edit, promote, yearsController, dependente }) {
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
      const editYears = () => {
        localStorage.setItem('urlAssociado', data.urlUser);
        yearsController(data, "edit");
      };

      const downloadYears = () => {
        localStorage.setItem('urlAssociado', data.urlUser);
        yearsController(data, "download");
      };
      
      const removeUser = () => {
        remove(data.urlUser);
      };
      const editUser = () => {
        edit(data);
      };
      const promoteUser = () => {
        promote(data.urlUser);
      };

      const editDependente = () => {
        dependente(data.urlUser, data.name)
      }

      return (
        <Container variant="associados">
          <p>{data.name}</p>
          <p>{data.cpf}</p>
          <Button variant="associado" onClick={editDependente}>
            Editar Dependentes
          </Button>
          <Button variant="image" onClick={editYears}>
            <p>Editar Impostos</p>
          </Button>
          <Button variant="image" onClick={editUser}>
            <Image src={EditIcon} alt="botão para editar associado" />
          </Button>
{/*           <Button variant="image" onClick={promoteUser}>
            <Image src={AdminIcon} alt="botão para promover associado" />
          </Button> */}
          <Button variant="image" onClick={downloadYears}>
            <Image src={pdfIcon} alt="botão para baixar pdf" />
          </Button>
          <Button variant="image" onClick={removeUser}>
            <Image src={DeleteIcon} alt="botão para deletar associado" />
          </Button>
        </Container>
      );
    }
  }
}

export default List;
