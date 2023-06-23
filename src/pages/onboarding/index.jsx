import * as services from "../../services/accounts";

import { useRouter } from "next/router";

import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";

import OnBoardingScreen from "../../components/OnBoardingScreen";
import Navigation from "../../components/commom/Nav";
import Step from "../../components/commom/Step";

import { Container, TextBox, Text, Title, StepsBox, LinkBox } from "../../styles/onboardingStyles";
import Button from "../../components/commom/Button";
import Image from "next/image";

import NextIcon from "../../assets/next_blue.svg";
import StepDivider from "../../assets/step_divider.svg";

const OnBoardingPage = () => {
    const authContext = useAuth();

    const [started, setStarted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState();
    let [currentStep, setCurrentStep] = useState(1);

    const router = useRouter();

    const nextStep = useCallback(async () => {
        setCurrentStep(++currentStep);
    }, []);

    const checkNav = () => {
        if (authContext.admin == 'true' || authContext.admin == true) {
            return "admin"
        }
        else {
            return "logged";
        }
    }

    const getUserData = useCallback(async () => {
        try {
            const responseData = await services.getUserData(
                authContext.urlUser,
                authContext.token
            );
            return responseData.data;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    }, [authContext.token, authContext.urlUser]);

    const handleUserData = useCallback(async () => {
        const responseData = await getUserData();
        setName(responseData.name);
        setIsLoaded(true);
    }, [getUserData]);

    useEffect(() => {
        if (!authContext.auth) {
            router.push("/login");
            return;
        }
        handleUserData();
    }, [])

    const startOnBoarding = useCallback(async () => {
        setStarted(true);
    });

    return (
        <>
            {isLoaded && !started && (
                <OnBoardingScreen name={name} onClicked={startOnBoarding} />
            )}
            {isLoaded && started && (
                <>
                    <Navigation selectedPage={"home"} variant={checkNav()} />
                    {currentStep <= 3 && (
                        <Container>
                            <TextBox>
                                <Title>
                                    1. Agora ficou mais simples consultar reservas!
                                </Title>
                                <Text>
                                    Basta seguir o seguinte passo a passo:
                                </Text>
                                <StepsBox>
                                    <Step done={currentStep >= 1} step={1}>Busque pelo local desejado</Step>
                                    <Image src={StepDivider} />
                                    <Step done={currentStep >= 2} step={2}>Veja o resumo do local</Step>
                                    <Image src={StepDivider} />
                                    <Step done={currentStep >= 3} step={3}>Veja as reservas feitas para aquele ambiente</Step>
                                </StepsBox>
                                <Button onClick={nextStep} variant={"default-adjustable-30%"}>
                                    CONTINUAR
                                </Button>
                                <LinkBox onClick={() => router.push("/home")}>
                                    PULAR TUTORIAL
                                    <Image src={NextIcon} />
                                </LinkBox>
                            </TextBox>
                        </Container>
                    )}
                    {4 <= currentStep && currentStep <= 7 && (
                        <Container>
                            <TextBox>
                                <Title>
                                    2. Edite os dados de cada ambiente disponível para reserva
                                </Title>
                                <Text>
                                    Basta seguir o seguinte passo a passo:
                                </Text>
                                <StepsBox>
                                    <Step done={currentStep >= 4} step={1}>Clique em editar dados</Step>
                                    <Image src={StepDivider} />
                                    <Step done={currentStep >= 5} step={2}>Adicione ou altere as fotos do ambiente</Step>
                                    <Image src={StepDivider} />
                                    <Step done={currentStep >= 6} step={3}>Edite todas as demais informações desejadas</Step>
                                    <Image src={StepDivider} />
                                    <Step done={currentStep >= 7} step={4}>Salve todas as alterações realizadas</Step>
                                </StepsBox>
                                <Button onClick={nextStep} variant={"default-adjustable-30%"}>
                                    CONTINUAR
                                </Button>
                                <LinkBox onClick={() => router.push("/home")}>
                                    PULAR TUTORIAL
                                    <Image src={NextIcon} />
                                </LinkBox>
                            </TextBox>
                        </Container>
                    )}
                    {8 == currentStep && (
                        <Container>
                            <TextBox>
                                <Title>
                                    3. Por fim, gerencie também seus associados
                                </Title>
                                <Text>
                                    Na sessão de associados você pode adicionar um novo, editar associados e excluí-los. Para ver mais informações sobre um associado basta clicar na linha da tabela em que ele se encontra.
                                </Text>
                                <Button variant={"default-adjustable-30%"} onClick={() => router.push("/home")}>
                                    FINALIZAR TUTORIAL
                                </Button>
                            </TextBox>
                        </Container>
                    )}
                </>
            )}
        </>
    );
}

export default OnBoardingPage;