import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { useAdmin } from "../../contexts/AdminContext";

import * as service from "../../services/accounts";

import SearchBar from "../../components/commom/SearchBar";
import Navigation from "../../components/commom/Nav";
import ListWrapper from "../../components/commom/ListWrapper";
import PdfPage from "../../components/PdfPage";

import {
  Container,
  ContentContainer,
  ControllerContainer,
} from "../../styles/associadosStyles";

const Associados = () => {
  const [formUp, setFormUp] = useState(false);
  const [associados, setAssociados] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const authContext = useAuth();
  const adminContext = useAdmin();

  const toggleFormUp = (data) => {
    setFormUp(!formUp);
    adminContext.setAssociado(data);
  };

  const handleErrorAssociados = useCallback(
    async (error) => {
      if (
        error.response.data.message ==
        "Usuário sem permissão de visualizar os assessores."
      ) {
        router.push("/usuario");
      }
    },
    [router]
  );

  const getAssociados = useCallback(async () => {
    try {
      const associadosResponse = await service.getAssociados(authContext.token);
      setAssociados(associadosResponse.data);
    } catch (error) {
      await handleErrorAssociados(error);
    }
  }, [authContext.token, handleErrorAssociados]);

  const userRemove = useCallback(
    async (userUrl) => {
      try {
        const userRemoveResponse = await service.removeUser(
          userUrl,
          authContext.token
        );
        alert(`${userRemoveResponse.data.message}, Recarregue a Página!`);
      } catch (error) {
        console.log(error);
      }
    },
    [authContext.token]
  );

  useEffect(() => {
    if (!authContext.auth) {
      router.push("/login");
      return;
    } else if (!authContext.admin) {
      router.push("/login");
      return;
    } else if (associados !== undefined) {
      return;
    }
    getAssociados();
  });

  return (
    <Container>
      <Navigation variant="logged" />
      {associados && !formUp && (
        <ContentContainer>
          <ControllerContainer>
            <SearchBar
              setSearch={setSearchTerm}
              placeHolder="Digite o nome ou CPF do associado"
            />
          </ControllerContainer>
          <ListWrapper
            data={associados}
            variant="associados"
            toggleForm={toggleFormUp}
            searchTerm={searchTerm}
            remove={userRemove}
          />
        </ContentContainer>
      )}
      {formUp && <PdfPage outsideForm={toggleFormUp} />}
    </Container>
  );
};

export default Associados;
