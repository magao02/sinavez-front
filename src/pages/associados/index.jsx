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
import ImpostosPage from "../../components/ImpostosPage";
import UserDependentesPage from "../../components/UserDependentesPage";

import {
  Container,
  ContentContainer,
  ControllerContainer,
  LoadingMessage,
} from "../../styles/associadosStyles";

const Associados = () => {
  const initialForm = {
    toggle: false,
    type: { pdf: false, dependente: false },
  };
  const [form, setForm] = useState(initialForm);
  const [associados, setAssociados] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [urlUserEdit, setUrlUserEdit] = useState();
  const [dependentesToggle, setDependentesToggle] = useState(false);

  const router = useRouter();

  const authContext = useAuth();
  const adminContext = useAdmin();

  const formController = (type, data, year) => {
    setYear(year)
    if (type === "pdf") {
      setForm({
        toggle: true,
        type: { pdf: true, dependente: false },
      });
      adminContext.setAssociado(data);
    } else if (type == "dependente") {
      adminContext.setAssociado(data);
      setUrlUserEdit(data.urlUser);
      setForm({
        toggle: true,
        type: { pdf: false, dependente: true },
      });
    } else if (type === "initialForm") {
      setForm(initialForm);
    } else {
      setForm(initialForm);
    }
  };

  const initialYears = {
    toggle: false,
  };
  const [years, setYears] = useState(initialYears);
  const [dataToSubmit, setDataToSubmit] = useState(initialYears);
  const [yearVariant, setYearVariant] = useState();
  const [year, setYear] = useState();

  const yearsController = (data, yearVariant) => {
    setYears({ toggle: true });
    setYearVariant(yearVariant);
    setDataToSubmit(data);
  }

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

  const editUserData = useCallback(async (data) => {
    setUrlUserEdit(data.urlUser);
    localStorage.setItem('urlAssociado', data.urlUser)
    router.push("/redefinir", data.userUrl);
  });

  const viewProfile = useCallback(async (data) => {
    console.log(data.urlUser);
  });

  const checkNav = () => {
    if (authContext.admin == "true" || authContext.admin == true) {
      return "admin";
    } else {
      return "logged";
    }
  };

  const [associadoData, setAssociadoData] = useState([]);

  const editDependente = useCallback((urlAssociado, associadoName) => {
    setAssociadoData([urlAssociado, associadoName]);
    setDependentesToggle(true);
  }, [])

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
      {!associados && !form.toggle && !years.toggle && (
        <LoadingMessage>Carregando...</LoadingMessage>
      )}
      {dependentesToggle && associadoData && (
        <UserDependentesPage associadoData={associadoData} setDependentesToggle={setDependentesToggle}/>
      )}
      {associados && !form.toggle && !years.toggle && !dependentesToggle && (
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
            searchTerm={searchTerm}
            yearsController={yearsController}
            remove={userRemove}
            edit={editUserData}
            dependente={editDependente}
            promote={userPromote}
          />
        </ContentContainer>
      )}
      {years.toggle && !form.toggle && associados && (
        <ImpostosPage dataToSubmit={dataToSubmit} data={associados} variant={yearVariant} setYears={setYears} setForm={formController} />
      )}
      {form.toggle && form.type.pdf && (
        <PdfPage setForm={formController} outsideForm={formController} ano={year} />
      )}
      {form.toggle && form.type.dependente && (
        <ContentContainer>
          <DependentsContainer
            variant="admin"
            url={urlUserEdit}
            token={authContext.token}
          />
        </ContentContainer>
      )}
    </Container>
  );
};

export default Associados;
