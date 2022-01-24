import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import Image from "next/image";

import AddButton from "../../assets/add_button.svg";

import * as service from "../../services/accounts";

import DependsForm from "../../components/DependentsContainer";
import Navigation from "../../components/commom/Nav";
import List from "../../components/commom/List";
import ListWrapper from '../../components/commom/ListWrapper';
import SearchBar from "../../components/commom/SearchBar";
import Button from "../../components/commom/Button";

import {
  Container,
  ContentContainer,
  ControllerContainer
} from "./styles";

const UserData = () => {
  const [formUp, setFormUp] = useState(false);
  const [dependents, setDependents] = useState();

  const authContext = useAuth();

  const toggleFormUp = () => {
    setFormUp(!formUp);
  };

  const handleErrorOnDependent = useCallback(async (error) => {
    console.log(error.response.data.message);
  });

  const handleSubmit = useCallback(async (data) => {
    console.log(data);
    try {
      const addDependentResponse = await service.addDependent(
        data,
        authContext.urlUser,
        authContext.token
      );
      console.log(addDependentResponse.data.message)
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
      setDependents(dependentsReponse.data);
    } catch (error) {
      await handleErrorOnDependent(error);
    }
  });

  useEffect(() => {
    if (dependents !== undefined) {
      return;
    }
    getDependents();
  }, []);

  return (
    <Container>
      <Navigation variant="logged" />
      {formUp && <DependsForm submitForm={handleSubmit} />}
      {!formUp && (
        <ContentContainer>
          <ControllerContainer>
            <SearchBar />
            <Button variant="image" onClick={toggleFormUp}>
              <Image src={AddButton} />
            </Button>
          </ControllerContainer>
          <ListWrapper data={dependents}/>
        </ContentContainer>
      )}
    </Container>
  );
};

export default UserData;
