import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { useAdmin } from "../../contexts/AdminContext";

import * as service from "../../services/accounts";

import SearchBar from "../../components/commom/SearchBar";
import Navigation from "../../components/commom/Nav";
import ListWrapper from "../../components/commom/ListWrapper";
import PdfPage from "../../components/PdfPage";
import DependentsContainer from "../../components/DependentsContainer";

import {
  Container,
  ContentContainer,
  ControllerContainer,
} from "../../styles/associadosStyles";

const Associados = () => {
  const initialForm = {
    toggle: false,
    type: { pdf: false, dependente: false },
  };
  const [form, setForm] = useState(initialForm);
  const [associados, setAssociados] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const authContext = useAuth();
  const adminContext = useAdmin();

  const formController = (type, data) => {
    if (type === "pdf") {
      setForm({
        toggle: true,
        type: { pdf: true, dependente: false },
      });
      adminContext.setAssociado(data);
    } else if (type == "dependente") {
      setForm({
        toggle: true,
        type: { pdf: false, dependente: true },
      })
      adminContext.setAssociado(data);
      adminContext.setUrlUserEdit(data.urlUser);
    } else {
      setForm(initialForm);
    }
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

  const userPromote = useCallback(
    async (userUrl) => {
      try {
        const userPromoteResponse = await service.setAdmin(
          userUrl,
          authContext.token
        );
        alert(userPromoteResponse);
      } catch (error) {
        console.log(error);
      }
    },
    [authContext.token]
  );

  const editUserData = useCallback(async (userUrl) => {
    adminContext.setUrlUserEdit(userUrl);
    router.push("/redefinir");
  });

  const checkNav = () => {
    if (authContext.admin == 'true' || authContext.admin == true) {
      return "admin"
    }
    else {
      return "logged";
    }
  }

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
      <Navigation variant={checkNav()} />
      {associados && !form.toggle && (
        <ContentContainer>
          <ControllerContainer>
            {/* <SearchBar
              setSearch={setSearchTerm}
              placeHolder="Digite o nome ou CPF do associado"
            /> */}
          </ControllerContainer>
          <ListWrapper
            data={associados}
            variant="associados"
            searchTerm={searchTerm}
            setForm={formController}
            remove={userRemove}
            edit={editUserData}
            promote={userPromote}
          />
        </ContentContainer>
      )}
      {form.toggle && form.type.pdf && <PdfPage outsideForm={formController} />}
      {form.toggle && form.type.dependente && (
        <ContentContainer>
          <DependentsContainer variant="admin" />
        </ContentContainer>
      )}
    </Container>
  );
};

export default Associados;
