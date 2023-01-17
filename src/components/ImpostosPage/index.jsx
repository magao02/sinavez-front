import { useState, useEffect, useCallback } from "react";

import {
    Title,
    SubTitle,
    GreetingsContainer,
  } from "./styles";
import { Container, MainContent } from "../../styles/redefinirStyles";


import ListWrapper from "../commom/ListWrapper";
import Button from "../commom/Button";

import { useAuth } from "../../contexts/AuthContext";
import { useAdmin } from "../../contexts/AdminContext";
import * as service from "../../services/accounts";

const ImpostosPage = ({ variant, setYears, setForm, data, dataToSubmit }) => {
    const authContext = useAuth();
    const adminContext = useAdmin();

    const [urlAssociado, setUrlAssociado] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [yearsData, setYearsData] = useState();

    useEffect(() => {
        handleImposto();
        setUrlAssociado(localStorage.getItem('urlAssociado'));
        setIsLoaded(true);
    }, []);

    const handleStopYears = () => {
        setYears("initialYears");
    };

    const getYears = useCallback(async () => {
        try {
            const responseYear = await service.getYears(
                localStorage.getItem("urlAssociado"),
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
    });

    switch (variant) {
        case "edit": {
            return (
                <Container>
                    {isLoaded && (
                        <>
                            <Button variant={"close"} onClick={handleStopYears}>
                                &#10005;
                            </Button>
                            <GreetingsContainer>
                                <Title>Editar Imposto de Renda</Title>
                                <SubTitle>selecione o ano</SubTitle>
                            </GreetingsContainer>
                            <MainContent>
                                <ListWrapper dataToSubmit={dataToSubmit} data={yearsData} variant="years" yearVariant={variant} setForm={setForm} />
                            </MainContent>
                        </>
                    )}
                </Container>
            );
        }
        case "download": {
            return (
                <Container>
                    {isLoaded && (
                        <>
                            <Button variant={"close"} onClick={handleStopYears}>
                                &#10005;
                            </Button>
                            <GreetingsContainer>
                                <Title>Baixar Imposto de Renda</Title>
                                <SubTitle>selecione o ano</SubTitle>
                            </GreetingsContainer>
                            <MainContent>
                                <ListWrapper dataToSubmit={dataToSubmit} data={yearsData} variant="years" yearVariant={variant} setForm={setForm} />
                            </MainContent>
                        </>
                    )}
                </Container>
            );
        }
    }

}

export default ImpostosPage;