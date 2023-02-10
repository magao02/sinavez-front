import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import Image from "next/image";

import AddButton from "../../assets/add_button.svg";

import * as service from "../../services/accounts";

import DependsForm from "../../components/DependentsContainer";
import ListWrapper from "../../components/commom/ListWrapper";
import SearchBar from "../../components/commom/SearchBar";
import Button from "../../components/commom/Button";

import {
  Container,
  ContentContainer,
  ControllerContainer,
  Title,
  LoadingMessage,
} from "../../styles/dependentesStyles";

const UserDependentesPage = ({associadoData, setDependentesToggle}) => {
  const urlAssociado = associadoData[0]
  const associadoName = associadoData[1]

  const [formUp, setFormUp] = useState(false);
  const [dependents, setDependents] = useState();
  const [globalMessage, setGlobalMessage] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const authContext = useAuth();

  const toggleFormUp = useCallback(async () => {
    setFormUp(!formUp);
  }, [setFormUp, formUp]);

  const handleErrorOnDependent = useCallback(async (error) => {
    setGlobalMessage(error.response.data.message);
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        const addDependentResponse = await service.addDependent(
          data,
          urlAssociado,
          authContext.token
        );
        alert(addDependentResponse.data.message);
        toggleFormUp();
      } catch (error) {
        await handleErrorOnDependent(error);
      }
    },
    [
      urlAssociado,
      authContext.token,
      handleErrorOnDependent,
      toggleFormUp,
    ]
  );

  const getDependents = useCallback(async () => {
    try {
      const dependentsReponse = await service.getDependents(
        urlAssociado,
        authContext.token
      );
      setDependents(dependentsReponse.data);
    } catch (error) {
      await handleErrorOnDependent(error);
    }
  }, [urlAssociado, authContext.token, handleErrorOnDependent]);

  const dependentRemove = useCallback(
    async (urlDependent) => {
      try {
        const dependentRemoveResponse = await service.removeDependent(
          authContext.token,
          urlDependent
        );
        alert(`${dependentRemoveResponse.data.message}, Recarregue a Página!`);
      } catch (error) {
        console.log(error);
      }
    },
    [authContext.token]
  );

  const handleClosePage = useCallback(() => {
    setDependentesToggle(false);
  }, [setDependentesToggle]);

  useEffect(() => {
    getDependents();
  }, [dependents, getDependents]);

  return (
    <Container>
      <Button variant={"close"} onClick={handleClosePage}>
        &#10005;
      </Button>
      {!formUp && !dependents && (
        <LoadingMessage>Carregando...</LoadingMessage>
      )}
      {formUp && (
        <DependsForm
          submitForm={handleSubmit}
          globalMessage={globalMessage}
          variant="default"
        />
      )}
      {!formUp && dependents && (
        <ContentContainer>
          <Title>Dependente(s) de {associadoName}</Title>
          <ControllerContainer>
            <SearchBar
              setSearch={setSearchTerm}
              placeHolder="Digite o nome do Dependente"
              />
            <Button variant="image" onClick={toggleFormUp}>
              <Image src={AddButton} alt="botão para adicionar dependente" />
            </Button>
          </ControllerContainer>
          <ListWrapper
            data={dependents}
            variant="dependente"
            remove={dependentRemove}
            searchTerm={searchTerm}
          />
        </ContentContainer>
      )}
    </Container>
  );
};

export default UserDependentesPage;
