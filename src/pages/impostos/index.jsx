import { useState, useEffect, useCallback } from "react";

import {
    Title,
    SubTitle,
    GreetingsContainer,
    MainContent,
    Container,
    LoadingMessage,
} from "../../styles/impostosStyles";

import Navigation from "../../components/commom/Nav";
import ListWrapper from "../../components/commom/ListWrapper";

import { useAuth } from "../../contexts/AuthContext";
import * as service from "../../services/accounts";

const Impostos = () => {
    const authContext = useAuth();

    const [isLoaded, setIsLoaded] = useState(false);
    const [yearsData, setYearsData] = useState();

    useEffect(() => {
        handleImposto();
        console.log(authContext)
    }, []);

    const checkNav = () => {
        if (authContext.admin == "true" || authContext.admin == true) {
            return "admin";
        } else {
            return "logged";
        }
    };

    const getYears = useCallback(async () => {
        try {
            const responseYear = await service.getYears(
                authContext.urlUser,
                authContext.token
            );
            return responseYear.data;
        } catch (error) {
            console.log(error);
        }
    });

    const handleImposto = useCallback(async () => {
        const responseData = await getYears();
        setYearsData(responseData);
        setIsLoaded(true);
    });

    return (
        <>
            <Navigation variant={checkNav()} />
            {!isLoaded && (
                <LoadingMessage>Carregando...</LoadingMessage>
            )}
            {isLoaded && (
                <>
                    <GreetingsContainer>
                        <Title>Baixar Imposto de Renda</Title>
                        <SubTitle>selecione o ano</SubTitle>
                    </GreetingsContainer>
                    <Container>
                        <MainContent>
                            <ListWrapper data={yearsData} variant="years" yearVariant="download" />
                        </MainContent>
                    </Container>
                </>
            )}
        </>
    );
}

export default Impostos;