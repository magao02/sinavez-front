import Image from "next/image";

import { useCallback, useState } from "react";

import { useAuth } from "../../../contexts/AuthContext";

import impostoPdf from "../../../pdf/imposto";

import * as services from "../../../services/accounts";

import UserIcon from "../../../assets/user_icon.svg";
import DeleteIcon from "../../../assets/remove_icon.svg";
import EditIcon from "../../../assets/edit_icon.svg";
import AdminIcon from "../../../assets/admin_icon.svg";
import pdfIcon from "../../../assets/pdf_icon.svg";

import Button from "../Button";

import { Container } from "./styles";

const List = (props) => ListVariant(props);

function ListVariant({ variant, data, remove, edit, promote, setForm }) {
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
      const authContext = useAuth();

      const startPdfForm = () => {
        setForm("pdf", data);
      };

      const startDependentPage = () => {
        setForm("dependente", data);
      };

      const removeUser = () => {
        remove(data.urlUser);
      };
      const editUser = () => {
        edit(data.urlUser);
      };
      const promoteUser = () => {
        promote(data.urlUser);
      };

      const getImposto = useCallback(async () => {
        try {
          const responseImposto = await services.getImpostos(
            data.urlUser,
            authContext.token
          );
          return responseImposto.data;
        } catch (error) {
          console.log(error);
        }
      });

      const handleImposto = useCallback(async () => {
        const responseData = await getImposto();
        impostoPdf(responseData);
        console.log(data);
      });

      const generatePdf = async() => {
          handleImposto();
      };

      return (
        <Container variant="associados">
          <p>{data.name}</p>
          <p>{data.cpf}</p>
          <Button variant="associado" onClick={startDependentPage}>
            Dependente
          </Button>
          <Button variant="image" onClick={startPdfForm}>
            <Image src={pdfIcon} alt="botão para gerar pdf" />
          </Button>
          <Button variant="image" onClick={editUser}>
            <Image src={EditIcon} alt="botão para editara associado" />
          </Button>
          <Button variant="image" onClick={promoteUser}>
            <Image src={AdminIcon} alt="botão para promover associado" />
          </Button>
          <Button variant="image" onClick={generatePdf}>
            <p>Baixar PDF</p>
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
