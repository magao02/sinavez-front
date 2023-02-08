import { useState, useEffect, useCallback, useRef } from "react";

import {
    Title,
    SubTitle,
    GreetingsContainer,
} from "./styles";
import { Container } from "../../styles/redefinirStyles";
import { MainContent, NewYearContainer } from "./styles";

import * as validation from "../../utils/validation";

import ListWrapper from "../commom/ListWrapper";
import Button from "../commom/Button";
import Input from "../commom/Input";

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

    const yearRef = useRef()
    const createNewYearAssociado = useCallback(async () => {
        try {
            const responseImposto = await service.createNewImpostoByYearAssociado(
                localStorage.getItem("urlAssociado"),
                yearRef.current.value,
                authContext.token
            );
            return responseImposto.data;
        } catch (error) {
            console.log(error);
        }
    });

    const getDependents = useCallback(async () => {
        try {
          const dependentsReponse = await service.getDependents(
            localStorage.getItem("urlAssociado"),
            authContext.token
          );
          return dependentsReponse;
        } catch (error) {
          await handleErrorOnDependent(error);
        }
      });

    const createNewYearDep = useCallback(async (dep) => {
        dep.forEach(async dep => {
            try {
                const responseImposto = await service.createNewImpostoByYearDep(
                    localStorage.getItem("urlAssociado"),
                    yearRef.current.value,
                    dep.urlDep,
                    authContext.token
                );
                return responseImposto.data;
            } catch (error) {
                console.log(error);
            }
        });
    });

    const handleCreateNewYear = useCallback(async () => {
        createNewYearAssociado();
        const dep = await getDependents();
        createNewYearDep(dep.data);
        alert(`Imposto de ${yearRef.current.value} criado, reinicie a página.`)
    });

    switch (variant) {
        case "edit": {
            return (
                <>
                    <GreetingsContainer>
                        <Title>Editar Imposto de Renda</Title>
                        <SubTitle>selecione o ano</SubTitle>
                    </GreetingsContainer>
                    <Container>
                        {isLoaded && (
                            <>
                                <Button variant={"close"} onClick={handleStopYears}>
                                    &#10005;
                                </Button>
                                <MainContent>
                                    <ListWrapper dataToSubmit={dataToSubmit} data={yearsData} variant="years" yearVariant={variant} setForm={setForm} />
                                    <NewYearContainer>
                                        <Input variant="default"
                                            name="ano"
                                            placeholder="digite um novo ano"
                                            validate={validation.testNumberImposto}
                                            ref={yearRef}
                                        />
                                        <Button variant="create-year" onClick={handleCreateNewYear}>Criar Novo Ano</Button>
                                    </NewYearContainer>
                                </MainContent>
                            </>
                        )}
                    </Container>
                </>
            );
        }
        case "download": {
            return (
                <>
                    <GreetingsContainer>
                        <Title>Baixar Imposto de Renda</Title>
                        <SubTitle>selecione o ano</SubTitle>
                    </GreetingsContainer>
                    <Container>
                        {isLoaded && (
                            <>
                                <Button variant={"close"} onClick={handleStopYears}>
                                    &#10005;
                                </Button>
                                <MainContent>
                                    <ListWrapper dataToSubmit={dataToSubmit} data={yearsData} variant="years" yearVariant={variant} setForm={setForm} />
                                </MainContent>
                            </>
                        )}
                    </Container>
                </>
            );
        }
    }

}

export default ImpostosPage;