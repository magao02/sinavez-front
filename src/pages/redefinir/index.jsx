import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { useAdmin } from "../../contexts/AdminContext";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import SignUpFormFirst from "../../components/UserDataForm/FirstStep";
import SignUpFormSecond from "../../components/UserDataForm/SecondStep";

import { Container, MainContent } from "../../styles/redefinirStyles";

const Redefinir = () => {
  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState({});
  const [globalMessage, setGlobalMessage] = useState();

  const router = useRouter();

  const authContext = useAuth();
  const adminContext = useAdmin();

  useEffect(() => {
    if (step === 3) {
      handleSubmit(collectedData, urlAssociado);
    }
    handleGetData();
  });

  const handleGetData = useCallback(
    async () => {
      const url = await localStorage.getItem('urlAssociado');
      setUrlAssociado(url);
      setIsLoaded(true);
    }
  )

  const dataCollector = (data) => {
    setCollectedData({ ...collectedData, ...data });
    stepper();
  };

  const stepper = () => {
    setStep(step + 1);
  };

  const stepBack = () => {
    setStep(1);
  };

  const handleErrorOnSubmit = useCallback(async (error) => {
    setGlobalMessage(error.response.data.message);
    stepBack();
  }, []);

  const [urlAssociado, setUrlAssociado] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = useCallback(
    async (data, url) => {
      try {
        if (adminContext.urlUserEdit !== undefined) {
          const setData = await service.setUserData(
            url,
            data,
            authContext.token
          );
          alert(setData.data.message);
        } else {
          const setData = await service.setData(
            url,
            data,
            authContext.token
          );
          alert(setData.data.message);
        }
        router.push("/usuario");
      } catch (error) {
        await handleErrorOnSubmit(error);
      }
    },
    [handleErrorOnSubmit]
  );

  const checkNav = () => {
    if (authContext.admin == 'true' || authContext.admin == true) {
      return "admin"
    }
    else {
      return "logged";
    }
  }

  return (
    <Container>
      {isLoaded && (
        <>
          <Navigation variant={checkNav()} />
          <MainContent>
            {step === 1 && (
              <SignUpFormFirst
                dataCollector={dataCollector}
                globalMessage={globalMessage}
                variant="editData"
                urlAssociado={urlAssociado}
              />
            )}
            {step === 2 && (
              <SignUpFormSecond dataCollector={dataCollector} variant="editData" urlAssociado={urlAssociado} />
            )}
          </MainContent>
        </>
      )}
    </Container>

  );
};

export default Redefinir;
