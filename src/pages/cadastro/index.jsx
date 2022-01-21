import { useRouter } from 'next/router';

import { useState, useEffect, useCallback } from "react";

import { Container, MainContent } from "./styles";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import SignUpFormFirst from "../../components/SignUpForm/FirstStep";
import SignUpFormSecond from "../../components/SignUpForm/SecondStep";

const SignUpPage = () => {
  const [step, setStep] = useState(2);
  const [collectedData, setCollectedData] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (step === 3) {
      handleSubmit(collectedData);
    }
  })

  const dataCollector = (data) => {
    setCollectedData({...collectedData, ...data});
    stepper();
  }

  const stepper = () => {
      setStep(step + 1);
  }

  const handleErrorOnSubmit = useCallback(async (error) => {
    console.log(error.response.data.message)
  })
  
  const handleSubmit = useCallback(async (data) => {
    console.log(data);
    try {
      const signUp = await service.signUp(data);
      console.log(signUp.data.message);
      router.push("/login");
    } catch (error) {
      await handleErrorOnSubmit(error)
    };
  });

  return (
    <Container>
      <Navigation variant="singup" />
      <MainContent>
        {step === 1 && <SignUpFormFirst dataCollector={dataCollector}/>}
        {step === 2 && <SignUpFormSecond dataCollector={dataCollector}/>}
      </MainContent>
    </Container>
  );
};

export default SignUpPage;
