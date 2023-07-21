import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { useAdmin } from "../../contexts/AdminContext";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import DataTable from "../../components/commom/DataTable";
import Button from "../../components/commom/Button";
import SearchBar from "../../components/commom/SearchBar";
import DarkBackground from "../../components/commom/DarkBackground"
import FirstStepForm from "../../components/UserDataForm/FirstStep";
import SecondStepForm from "../../components/UserDataForm/SecondStep";
import ThirdStepForm from "../../components/UserDataForm/ThirdStep";
import DependentsContainer from "../../components/DependentsContainer";

import AddIcon from "../../assets/add_icon.svg";

import Image from "next/image";

import {
  Container,
  Main,
  Title,
  MainContainer,
  MainHead,
  AddAssociateBox
} from "../../styles/associadosStyles";

const Associados = () => {
  const [associados, setAssociados] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [admToggle, setAdmToggle] = useState(false);
  const [addAssociateToggle, setAddAssociateToggle] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [associadoData, setAssociadoData] = useState([]);

  const router = useRouter();

  const authContext = useAuth();
  const adminContext = useAdmin();

  const toggleAddAssociate = useCallback(() => {
    setAddAssociateToggle((p) => !p);
  }, []);

  

  const [globalMessage, setGlobalMessage] = useState();
  const [collectedData, setCollectedData] = useState({});

  const yearsController = (data, yearVariant) => {
    setYears({ toggle: true });
    setYearVariant(yearVariant);
    setDataToSubmit(data);
  }

  const dataCollector = (data) => {
    setCollectedData({ ...collectedData, ...data });
    nextStepAddAssociate();
  };

  const handleAddAssosiate = useCallback(async () => {
    try {
      const addAssociateResponse = await service.signUp(collectedData);
      setAssociados((p) => [...p, collectedData]);
      setCurrentStep(1);
      toggleAddAssociate();
    } catch (error) { 
      setGlobalMessage(error.response.data.message);
    } 
  });

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

  // removendo usuário
  const userRemove = useCallback(async (userUrl) => {
    console.log("Tentando remover usuário com CPF:", userUrl);
    try {
      const removeUserResponse = await service.removeUser(userUrl, authContext.token);
      setAssociados((p) => p.filter((associate) => associate.urlUser !== userUrl));
      console.log("Usuário removido com sucesso!");
    } catch (error) {
      console.log("Erro ao remover usuario:", error.response.data.message);
    }
  });

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

  const editDependente = useCallback((urlAssociado, associadoName) => {
    setAssociadoData([urlAssociado, associadoName]);
    setDependentesToggle(true);
  }, [])

  const nextStepAddAssociate = useCallback(() => {
    setCurrentStep((p) => ++p);
  }, []);

  const previousStepAddAssociate = useCallback(() => {
    setCurrentStep((p) => --p);
  }, []);

  

  useEffect(() => {
    getAssociados();
    if (!authContext.auth) {
      router.push("/login");
      return;
    } else if (!authContext.admin) {
      router.push("/login");
      return;
    } else if (associados !== undefined) {
      return;
    }
  }, []);

  return (
    <Container>
      <Navigation selectedPage={"associados"} variant={checkNav()} />
      {addAssociateToggle && (
        <>
          <DarkBackground pageHeight={"200vh"} />
          <AddAssociateBox>
            {currentStep == 1 && (
              <FirstStepForm previousData={collectedData} globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} />
            )}
            {currentStep == 2 && (
              <SecondStepForm previousData={collectedData} globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} firstButton={previousStepAddAssociate} />
            )}
            {currentStep == 3 && (
              <ThirdStepForm previousData={collectedData} globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} firstButton={previousStepAddAssociate} handleAddAssosiate={handleAddAssosiate}/>
            )}
          </AddAssociateBox>
        </>
      )}
      {associados && (
        <MainContainer>
          <Title>
            Gerenciar associados
          </Title>
          <MainHead>
            <SearchBar setSearch={setSearchTerm} placeHolder={"Procurar pelo nome"}></SearchBar>
            <Button variant={"default"} onClick={toggleAddAssociate}>
              <Image src={AddIcon} />
              Adicionar Associado
            </Button>
          </MainHead>
          <Main>
            <DataTable searchTerm={searchTerm} headers={["Associado", "Profissão"]} data={associados} userRemove = {userRemove} />
          </Main>
        </MainContainer>
      )}
    </Container>
  );
};

export default Associados;
