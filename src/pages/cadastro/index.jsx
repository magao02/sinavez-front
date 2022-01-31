import { useRouter } from "next/router";

import { useState, useEffect, useCallback } from "react";

import { Container, MainContent } from "../../styles/cadastroStyles";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import SignUpFormFirst from "../../components/SignUpForm/FirstStep";
import SignUpFormSecond from "../../components/SignUpForm/SecondStep";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState({});
  const [globalMessage, setGlobalMessage] = useState();

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
  }

  const handleErrorOnSubmit = useCallback(async (error) => {
    setGlobalMessage(error.response.data.message);
    stepBack();
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      console.log(data);
      try {
        const signUp = await service.signUp(data);
        alert(signUp.data.message);
        router.push("/login");
      } catch (error) {
        await handleErrorOnSubmit(error);
      }
    },
    [router, handleErrorOnSubmit]
  );

  return (
    <Container>
      <Navigation variant="signup" />
      <MainContent>
        {step === 1 && (
          <SignUpFormFirst
            dataCollector={dataCollector}
            globalMessage={globalMessage}
          />
        )}
        {step === 2 && <SignUpFormSecond dataCollector={dataCollector} />}
      </MainContent>
    </Container>
  );
};

export default SignUpPage;
