import { useRouter } from "next/router";

import { useAuth } from "../../contexts/AuthContext";

import { useAdmin } from "../../contexts/AdminContext";

import { useState, useEffect, useCallback } from "react";

import Button from "../commom/Button/index";

import * as service from "../../services/accounts";

import {
  Container,
  MainContent,
  Title,
  SubTitle,
  GreetingsContainer,
} from "./styles";

import PdfForm from "../PdfForm";

const PdfPage = ({ setForm, outsideForm, ano }) => {
  const { associado } = useAdmin();

  const authContext = useAuth();

  const [queue, setQueue] = useState();
  const [currentPerson, setCurrentPerson] = useState(0);
  const [associadoUrl, setAssociadoUrl] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const incrementCurrentPerson = () => {
    setCurrentPerson(currentPerson + 1);
  };

  const handleErrorOnDependent = useCallback(async (error) => {
    console.log(error);
  });

  const getDependents = useCallback(async () => {
    try {
      const dependentsReponse = await service.getDependents(
        associado.urlUser,
        authContext.token
      );
      if (dependentsReponse.data !== []) {
        createQueue(dependentsReponse.data);
      } else {
        setQueue([associado]);
      }
    } catch (error) {
      await handleErrorOnDependent(error);
    }
  });

  const [pdfData, setPdfData] = useState({});

  const getImposto = useCallback(async () => {
    try {
      const responseImposto = await service.getImpostos(
        localStorage.getItem("urlAssociado"),
        authContext.token,
        ano
      );
      return responseImposto.data;
    } catch (error) {
      console.log(error);
    }
  });

  const handleImposto = useCallback(async () => {
    const responseData = await getImposto();
    setPdfData(responseData);
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    handleImposto();
    getDependents();
  }, []);

  const createQueue = (dependents) => {
    const localQueue = [];
    localQueue.push(associado);

    dependents.map((dependent) => localQueue.push(dependent));
    setQueue(localQueue);
  };

  const handleProcess = (data) => {
    if (currentPerson == 0) {
      associadoSubmit(data);
    } else {
      dependenteSubmit(data);
    }
    if (currentPerson < queue.length - 1) {
      incrementCurrentPerson();
    } else {
      outsideForm();
    }
  };

  const handleStopPdf = () => {
    setForm("initialForm");
  };

  const associadoSubmit = useCallback(async (data) => {
    setAssociadoUrl(queue[currentPerson].urlUser);
    try {
      const associadoResponse = await service.setImpostoAssociado(
        queue[currentPerson].urlUser,
        data.impostoDeRenda,
        ano,
        authContext.token
      );
    } catch (error) {
      console.log(error);
    }
  });

  const dependenteSubmit = useCallback(async (data) => {
    try {
      const dependenteResponse = await service.setImpostoDependente(
        associadoUrl,
        queue[currentPerson].urlDep,
        data,
        ano,
        authContext.token
      );
      return dependenteResponse.data;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container>
      {queue && isLoaded && (
        <MainContent>
          <Button variant={"close"} onClick={handleStopPdf}>
            &#10005;
          </Button>
          <GreetingsContainer>
            <Title>Imposto de Renda</Title>
            <SubTitle>{queue[currentPerson].name}</SubTitle>
          </GreetingsContainer>
          <PdfForm ano={ano} actualPerson={queue[currentPerson].name} data={pdfData} handleSubmitForm={handleProcess} />
        </MainContent>
      )}
    </Container>
  );
};

export default PdfPage;
