import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

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

  useEffect(() => {
    if (step === 3) {
      handleSubmit(collectedData);
    }
  });

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

  const handleSubmit = useCallback(
    async (data) => {
      console.log(data);
      try {
        const setData = await service.setData(
          authContext.urlUser,
          data,
          authContext.token
        );
        alert(setData.data.message);
        router.push("/usuario");
      } catch (error) {
        await handleErrorOnSubmit(error);
      }
    },
    [handleErrorOnSubmit]
  );

  return (
    <Container>
      <Navigation variant="logged" />
      <MainContent>
        {step === 1 && (
          <SignUpFormFirst
            dataCollector={dataCollector}
            globalMessage={globalMessage}
            variant="editData"
          />
        )}
        {step === 2 && (
          <SignUpFormSecond dataCollector={dataCollector} variant="editData" />
        )}
      </MainContent>
    </Container>
  );
};

export default Redefinir;
