import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import Image from "next/image";

import AddButton from "../../assets/add_button.svg";

import * as service from "../../services/accounts";

import DependsForm from "../../components/DependentsContainer";
import Navigation from "../../components/commom/Nav";
import List from "../../components/commom/List";
import ListWrapper from "../../components/commom/ListWrapper";
import SearchBar from "../../components/commom/SearchBar";
import Button from "../../components/commom/Button";

import { Container, ContentContainer, ControllerContainer } from "./styles";

const Dependentes = () => {
  const [formUp, setFormUp] = useState(false);
  const [dependents, setDependents] = useState();
  const [globalMessage, setGlobalMessage] = useState();

  const authContext = useAuth();

  const router = useRouter();

  const toggleFormUp = () => {
    setFormUp(!formUp);
  };

  const handleErrorOnDependent = useCallback(async (error) => {
    setGlobalMessage(error.response.data.message);
  });

  const handleSubmit = useCallback(async (data) => {
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
  });

  const getDependents = useCallback(async () => {
    try {
      const dependentsReponse = await service.getDependents(
        authContext.urlUser,
        authContext.token
      );
      console.log(dependentsReponse);
      setDependents(dependentsReponse.data);
    } catch (error) {
      await handleErrorOnDependent(error);
    }
  });

  const dependentRemove = useCallback(async (urlDependent) => {
    console.log(urlDependent)
    try {
    const dependentRemoveResponse = await service.removeDependent(
      authContext.token,
      urlDependent,
    );
    console.log(dependentRemoveResponse);
    alert("Dependente Removido, Recarregue a Página!")
    }
    catch (error) {
      console.log(error)
    }
  });

  useEffect(() => {
    if (!authContext.auth) {
      router.push("/login");
      return;
    } else if (dependents !== undefined) {
      return;
    }
    getDependents();
  }, []);

  return (
    <Container>
      <Navigation variant="logged" />
      {formUp && (
        <DependsForm submitForm={handleSubmit} globalMessage={globalMessage} />
      )}
      {!formUp &&(
        <ContentContainer>
          <ControllerContainer>
            <SearchBar />
            <Button variant="image" onClick={toggleFormUp}>
              <Image src={AddButton} />
            </Button>
          </ControllerContainer>
          <ListWrapper
            data={dependents}
            variant="dependente"
            remove={dependentRemove}
          />
        </ContentContainer>
      )}
    </Container>
  );
};

export default Dependentes;
