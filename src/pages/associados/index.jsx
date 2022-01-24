import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import ListWrapper from '../../components/commom/ListWrapper';
import SearchBar from "../../components/commom/SearchBar";

import {
  Container,
  ContentContainer,
  ControllerContainer
} from "./styles";

const Associados = () => {

  const [associados, setAssociados] = useState();

  const authContext = useAuth();

  const handleErrorAssociados = useCallback(async (error) => {
    console.log(error.response.data.message);
  })

  const getAssociados = useCallback(async () => {
    try {
      const associadosResponse = await service.getAssociados(
        authContext.token
      );
        console.log(associadosResponse)
        setAssociados(associadosResponse.data)
    }
    catch (error) {
      await handleErrorAssociados(error);
    }
  })

  useEffect(() => {
    if (associados !== undefined) {
      return;
    }
    getAssociados();
  })

  return (
    <Container>
      <Navigation variant="logged" />
        {associados && <ContentContainer>
          <ControllerContainer>
            <SearchBar />
          </ControllerContainer>
          <ListWrapper data={associados} />
        </ContentContainer>}
    </Container>
  );
};

export default Associados;
