import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { useAdmin } from "../../contexts/AdminContext";

import { SearchInput } from "../../components/SearchInputs";

import { useMemo } from 'react';

import styled from "styled-components";

const ContainerModal = styled.div`
    height:100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
`

const ModalContent = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap:2vh;
    background-color: white;
    padding: 20px;
    position: fixed;
    z-index: 101;
`

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import AssociateTable from "../../components/commom/AssociatesTable";
import Button from "../../components/commom/Button";
import SearchBar from "../../components/commom/SearchBar";
import DarkBackground from "../../components/commom/DarkBackground";
import FirstStepForm from "../../components/UserDataForm/FirstStep";
import SecondStepForm from "../../components/UserDataForm/SecondStep";
import ThirdStepForm from "../../components/UserDataForm/ThirdStep";

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
import { dateToYMD } from "../../utils/date";

import {
    Card,
    ColumnContent,
    Row,
} from "../../styles/apartamentosStyles";

const associadosservar = () => {
  const [associados, setAssociados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addAssociateToggle, setAddAssociateToggle] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [removeAssociateToggle, setRemoveAssociateToggle] = useState();
  const [dataUserToggle, setDataUserToggle] = useState();
  const [dataUser, setDataUser] = useState();
  const [associadoName, setAssociadoName] = useState();
  const [urlUser, setUrlUser] = useState();
  const [globalMessage, setGlobalMessage] = useState();
  const [collectedData, setCollectedData] = useState({});
  const [a, setA] = useState(false);
  const router = useRouter();
  const authContext = useAuth();
  const [associadoSelecionado, setAssociadoSelecionado] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [chegadaDate, setChegadaDate] = useState(new Date());
  const [chegadaTime, setChegadaTime] = useState('11:00');
  const [saidaDate, setSaidaDate] = useState((() => {
    let now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  })());
  const [saidaTime, setSaidaTime] = useState('18:00');

  const handleCheckboxChange = (item) => {
    setAssociadoSelecionado(item);
  };

  const queryData = useMemo(() => {
    return {
      chegadaDate: dateToYMD(chegadaDate ?? (new Date())),
      saidaDate: dateToYMD(saidaDate ?? (new Date())),
      chegadaTime,
      saidaTime,
    }
  }, [chegadaDate, saidaDate, chegadaTime, saidaTime]);

  const onSearch = useCallback(async () => {
    const data = {
      dataChegada: queryData.chegadaDate,
      dataSaida: queryData.saidaDate,
      horarioChegada: queryData.chegadaTime,
      horarioSaida: queryData.saidaTime
    };
    if (tabIndex === 0) {
      const req = await getAllApartments(authContext.token, data);
      setApartamentos(req.data);
    } else {
      const req = await getAllRecreationAreas(authContext.token, data);
      setAreas(req.data);
    }
  }, [queryData]);

  const Search = ({ chegadaDate, setChegadaDate, saidaDate, setSaidaDate,chegadaTime, setChegadaTime, saidaTime, setSaidaTime }) => {
    return (
      <ColumnContent>
        <Card>
          <Row>
            <div className="column">
              <SearchInput innerLabel="Data" label="Chegada" type="date" initialValue={chegadaDate} onChange={ev => setChegadaDate(ev.target.valueAsDate)} />
              <SearchInput innerLabel="Horário" type="time" initialValue={chegadaTime} onChange={ev => setChegadaTime(ev.target.value)} />
            </div>
            <div className="column">
              <SearchInput innerLabel="Data" label="Saída" type="date" initialValue={saidaDate} onChange={ev => setSaidaDate(ev.target.valueAsDate)} />
              <SearchInput innerLabel="Horário" type="time" initialValue={saidaTime} onChange={ev => setSaidaTime(ev.target.value)} />
            </div>
          </Row>
        </Card>
      </ColumnContent>
    );
  };

  const handleReserveClick = () => {
    if (associadoSelecionado) {
      setA(true);
      } else {
      alert("Selecione um associado antes de reservar.");
    }
  };

  const handleReserve = () => {
    var k = {
      chegadaDate: dateToYMD(chegadaDate),
      saidaDate: dateToYMD(saidaDate),
      chegadaTime,
      saidaTime,
      adultos: 1,
      criancas: 0,
      bebes: 0,
      animais: 0,
      urlUser: associadoSelecionado.urlUser,
      area: router.query.ambientType === "recreationArea"
    }
    router.push(`/reservar/${router.query.urlAmbient}?${new URLSearchParams(k)}`)
  }

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
      console.log(addAssociateResponse.data);

      if (collectedData.dependentes.length !== 0) {
        console.log(collectedData.dependentes)
        collectedData.dependentes.map( (data) => {
          addDependente(data, addAssociateResponse.data.user.urlUser);
        });   
      }

      setCurrentStep(1);
      toggleAddAssociate();
     
    } catch (error) { 
      setGlobalMessage(error.response.data.message);
    } 
  }, [associados, collectedData]);

console.log(collectedData)
  // pega dos dados do usuário
  const takeData = useCallback((data) => {
    setRemoveAssociateToggle((p) => !p);
    setAssociadoName(data.name);
    setUrlUser(data.urlUser);
  }, []);

  const dataDependents = (data) => {
    setUserDependents(data);
  };

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
 
  return <>
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
            {currentStep >= 3 && (
              <ThirdStepForm previousData={collectedData} globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} firstButton={previousStepAddAssociate} handleAddAssociate={handleAddAssociate} dataDependents={dataDependents}/>
            )}
          </AddAssociateBox>
        </>
      )}
      {associados && (
        <> 
          <MainContainer>
            <Title>
              Selecionar associados
            </Title>
            <MainHead>
              <SearchBar setSearch={setSearchTerm} placeHolder={"Procurar pelo nome"}></SearchBar>
              <Button variant={"default"} onClick={handleReserveClick}>
                RESERVAR AGORA
              </Button>
            </MainHead>
            <Main>
                <AssociateTable
                  searchTerm={searchTerm}
                  headers={["Associado"]}
                  data={associados}
                  takeData={takeData}
                  takeDataUser={takeDataUser}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={associadoSelecionado}
                  setCheckedItems={setAssociadoSelecionado}
                />
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
            <DataUser  
              back={toggleDataUser} 
              data={dataUser} 
              cancelForm={toggleRemoveAssociate} 
              urlUser={urlUser} 
              authContext={authContext}
              dataCollector={dataCollector}
              />
          </>
          )}
        </>
      )}
    </Container>
            
    {a &&
        <ContainerModal>
          <DarkBackground></DarkBackground>
          <ModalContent>
            <Search tabIndex={tabIndex} setTabIndex={setTabIndex}
            chegadaDate={chegadaDate} setChegadaDate={setChegadaDate}
            saidaDate={saidaDate} setSaidaDate={setSaidaDate}
            chegadaTime={chegadaTime} setChegadaTime={setChegadaTime}
            saidaTime={saidaTime} setSaidaTime={setSaidaTime}
            onSearch={onSearch}
            />
            <Button onClick={handleReserve}>Reservar</Button>
          </ModalContent>
      </ContainerModal>
    }
  </>
};

export default associadosservar;
