import { useRouter } from "next/router";

import { useAuth } from "../../contexts/AuthContext";

import { useState, useEffect, useCallback } from "react";

import { Container, MainContent } from "../../styles/cadastroStyles";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import SignUpFormFirst from "../../components/UserDataForm/FirstStep";
import SignUpFormSecond from "../../components/UserDataForm/SecondStep";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState({});
  const [globalMessage, setGlobalMessage] = useState();

  const authContext = useAuth();
  const router = useRouter();

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

  const checkNav = () => {
    if (authContext.admin == 'true' || authContext.admin == true) {
      return "admin"
    }
    else {
      return "signup";
    }
  }

  const handleErrorOnSubmit = useCallback(async (error) => {
    setGlobalMessage(error.response.data.message);
    stepBack();
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        const signUp = await service.signUp(data);
        alert(signUp.data.message);
        if (authContext.admin == "true" || authContext.admin == true) {
          router.push("/associados");
        } else {
          router.push("/login");
        }
      } catch (error) {
        await handleErrorOnSubmit(error);
      }
    },
    [router, handleErrorOnSubmit]
  );

  return (
    <Container>
      <Navigation variant={checkNav()} />
      <MainContent>
        {step === 1 && (
          <SignUpFormFirst
            dataCollector={dataCollector}
            globalMessage={globalMessage}
            variant="signUp"
          />
        )}
        {step === 2 && (
          <SignUpFormSecond dataCollector={dataCollector} variant="signUp" />
        )}
      </MainContent>
    </Container>
  );
};

export default SignUpPage;
