import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import Image from "next/image";

import AddButton from "../../assets/add_button.svg";

import * as service from "../../services/accounts";

import DependsForm from "../../components/DependentsContainer";
import Navigation from "../../components/commom/Nav";
import ListWrapper from "../../components/commom/ListWrapper";
import SearchBar from "../../components/commom/SearchBar";
import Button from "../../components/commom/Button";

import {
  Container,
  ContentContainer,
  ControllerContainer,
  LoadingMessage,
} from "../../styles/dependentesStyles";

const Dependentes = () => {
  const [formUp, setFormUp] = useState(false);
  const [dependents, setDependents] = useState();
  const [globalMessage, setGlobalMessage] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const authContext = useAuth();

  const router = useRouter();

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
          authContext.urlUser,
          authContext.token
        );
        alert(addDependentResponse.data.message);
        toggleFormUp();
      } catch (error) {
        await handleErrorOnDependent(error);
      }
    },
    [
      authContext.urlUser,
      authContext.token,
      handleErrorOnDependent,
      toggleFormUp,
    ]
  );

  const getDependents = useCallback(async () => {
    try {
      const dependentsReponse = await service.getDependents(
        authContext.urlUser,
        authContext.token
      );
      setDependents(dependentsReponse.data);
    } catch (error) {
      await handleErrorOnDependent(error);
    }
  }, [authContext.urlUser, authContext.token, handleErrorOnDependent]);

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

  const checkNav = () => {
    if (authContext.admin == "true" || authContext.admin == true) {
      return "admin";
    } else {
      return "logged";
    }
  };

  useEffect(() => {
    if (!authContext.auth) {
      router.push("/login");
      return;
    } else if (dependents !== undefined) {
      return;
    }
    getDependents();
  }, [authContext.auth, router, dependents, getDependents]);

  return (
    <Container>
      <Navigation variant={checkNav()} />
      {formUp && (
        <DependsForm
          submitForm={handleSubmit}
          globalMessage={globalMessage}
          variant="default"
        />
      )}
      {!formUp && !dependents && (
        <LoadingMessage>Carregando...</LoadingMessage>
      )}
      {!formUp && dependents && (
        <ContentContainer>
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

export default Dependentes;
