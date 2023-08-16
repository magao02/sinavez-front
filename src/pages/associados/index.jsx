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

import Pattern from "../../assets/pattern.svg"
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
import CancelForm from "../../components/CancelForm";
import DataUser from "../../components/DataUser";

const Associados = () => {
  const [associados, setAssociados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [admToggle, setAdmToggle] = useState(false);
  const [addAssociateToggle, setAddAssociateToggle] = useState();
  const [currentStep, setCurrentStep] = useState(1);

  const [associadoData, setAssociadoData] = useState([]);
  const [removeAssociateToggle, setRemoveAssociateToggle] = useState();
  const [dataUserToggle, setDataUserToggle] = useState();

  const [dataUser, setDataUser] = useState();
  const [newDataUser, setNewDataUser] = useState();
  
  const [associadoName, setAssociadoName] = useState();
  const [urlUser, setUrlUser] = useState();

  const [globalMessage, setGlobalMessage] = useState();
  const [collectedData, setCollectedData] = useState({});

  const router = useRouter();

  const authContext = useAuth();
  const adminContext = useAdmin();

  // Toggle para abrir e fechar o modal de adicionar associado
  const toggleAddAssociate = useCallback(() => {
    setAddAssociateToggle((p) => !p);
  }, []);

  // Toggle para abrir e fechar o modal de remover associado
  const toggleRemoveAssociate = useCallback(() => {
    setRemoveAssociateToggle((p) => !p);
  }, []);

  // Toggle para abrir e fechar o modal da tela de dados do usuário
  const toggleDataUser = useCallback(() => {
    setDataUserToggle((p) => !p);

  }, []);

  const yearsController = (data, yearVariant) => {
    setYears({ toggle: true });
    setYearVariant(yearVariant);
    setDataToSubmit(data);
  }

  //  coletando dados do usuário
  const dataCollector = (data) => {
    setCollectedData({ ...collectedData, ...data });
    nextStepAddAssociate();
  };


  // adicionando usuário
  const handleAddAssociate = useCallback(async () => {
    try {
      const addAssociateResponse = await service.signUp(collectedData);
      setAssociados((p) => [...p, addAssociateResponse.data.user]);
      setCurrentStep(1);
      toggleAddAssociate();
    } catch (error) { 
      setGlobalMessage(error.response.data.message);
    } 
  }, [associados, collectedData]);

  // pega dos dados do usuário
  const takeData = useCallback((data) => {
    setRemoveAssociateToggle((p) => !p);
    setAssociadoName(data.name);
    setUrlUser(data.urlUser);
  }, []);

  // pega dos dados do usuário
  const takeDataUser = useCallback(async (data) => {
    try {
      const dataUserResponse =  await service.getUserData(data.urlUser, authContext.token);
      setDataUser(dataUserResponse.data);
      setUrlUser(data.urlUser);
      setAssociadoName(data.name);
      setDataUserToggle((p) => !p);
      console.log(dataUserResponse.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  });

  // editando dados do usuário
  const handleEditUser = useCallback(async(dataNova, urlUser) => {
    try {
      const editResponse = await service.setUserData(urlUser, dataNova, authContext.token);
      //setAssociados((p) => [...p, editResponse.data.user]);
      setDataUser(editResponse.data.user);
      console.log(editResponse.data);
    } catch (error) {
      console.log("Deu erro");
    }
  }, [associados]);

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

  // fechando modal de dados do usuário
  const closer = useCallback(() => {
    setDataUserToggle(false);
  });

  // pegando dados dos associados
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
    try {
      const removeUserResponse = await service.removeUser(userUrl, authContext.token);
      setAssociados((p) => p.filter((associado) => associado.urlUser !== userUrl));
      toggleRemoveAssociate();

     {dataUserToggle ? toggleDataUser() : null};

      } catch (error) {
      console.log("Erro ao remover usuario:", error.response.data.message);
      setAssociados((p) => [...p]);
    }
  }, [associados]);

  // adionar dependente
  const addDependente = useCallback(async (data, urlAssociado) => {
     try {
       const addDependentResponse = await service.addDependent(data, urlAssociado, authContext.token);
       console.log(addDependentResponse.data);
       
     } catch (error) {
       console.log(error.response.data.message);
     }

    console.log(data);
  });

  // remover dependente
  const removeDependente = useCallback(async (urlDependente, urlAssociado) => {
    try {
      const removeDependentResponse = await service.removeDependent(authContext.token, urlDependente);
      console.log(removeDependentResponse.data);
    } catch (error) {
      console.log(error.response.data.message);
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
              <ThirdStepForm previousData={collectedData} globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} firstButton={previousStepAddAssociate} handleAddAssociate={handleAddAssociate}/>
            )}
          </AddAssociateBox>
        </>
      )}
      {associados && (
        <>
      
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
              <DataTable searchTerm={searchTerm} headers={["Associado", "Profissão"]} data={associados} takeData={takeData} takeDataUser={takeDataUser}/>
            </Main>

          </MainContainer>
          { removeAssociateToggle && (
          <>
            <DarkBackground pageHeight={"170vh"} zIndex={true}/>
            <CancelForm cancelForm={toggleRemoveAssociate} associadoName={associadoName} userRemove={userRemove} urlAssociado={urlUser} toggleDataUser={closer}/>
          </>
          )}

          { dataUserToggle && (
          <>
            <DataUser  back={toggleDataUser} data={dataUser} cancelForm={toggleRemoveAssociate} urlUser={urlUser} authContext={authContext} handleEditUser={handleEditUser} dataCollector={dataCollector} addDependente={addDependente}/>
          </>
          )}
        </>
      )}
    </Container>
  );
};

export default Associados;
