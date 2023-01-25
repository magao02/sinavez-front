import { useRef, useCallback, useState, useEffect } from 'react';

import * as validation from '../../../utils/validation';
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import {
  Container,
  InputForm,
  InputContainer,
  ButtonContainer,
} from "./styles";

import Input from "../../commom/Input";
import Button from "../../commom/Button";
import MultiInput from "../../commom/MultiInput";

const SecondStepForm = ({ dataCollector, variant, urlAssociado }) => {
  const cidadeRef = useRef();
  const estadoRef = useRef();
  const naturalidadeRef = useRef();
  const nacionalidadeRef = useRef("Brasileiro");
  const brasileiroRef = useRef(true);
  const numeroInscricaoRef = useRef();
  const dataAfiliacaoRef = useRef();
  const formacaoSuperiorRef = useRef();
  const instituicaoSuperiorRef = useRef();
  const dataFormacaoRef = useRef();
  const numRegistroConselhoRef = useRef();
  const dataRegistroConselhoRef = useRef();
  const empresaRef = useRef();
  const salarioRef = useRef();

  const allFieldsAreValid = useCallback(async () => {

    if (brasileiroRef === false) {
      const inputRefs = [cidadeRef, estadoRef, naturalidadeRef,
        nacionalidadeRef, numeroInscricaoRef,
        dataAfiliacaoRef, formacaoSuperiorRef, instituicaoSuperiorRef,
        dataFormacaoRef, numRegistroConselhoRef, dataRegistroConselhoRef,
        empresaRef, salarioRef];

      const validationResults = await Promise.all(
        inputRefs.map((inputRef) => inputRef.current?.validate()),
      )
      return validationResults.every((result) => result === true);
    }

    else {
      const inputRefs = [cidadeRef, estadoRef, naturalidadeRef,
        numeroInscricaoRef, dataAfiliacaoRef, formacaoSuperiorRef,
        instituicaoSuperiorRef,
        dataFormacaoRef, numRegistroConselhoRef, dataRegistroConselhoRef,
        empresaRef, salarioRef];

      const validationResults = await Promise.all(
        inputRefs.map((inputRef) => inputRef.current?.validate()),
      )
      return validationResults.every((result) => result === true);
    }
  });

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const isValidSubmit = await allFieldsAreValid();

    if (!isValidSubmit) return;

    const salario = Number(salarioRef.current?.value.replace(",", "."));

    const [municipio, estado, naturalidade, nacionalidade, numInscricao,
      dataAfiliacao, formacaoSuperior, instituicaoSuperior, dataFormacao,
      numRegistroConselho, dataRegistroConselho, empresa] =
      [cidadeRef, estadoRef, naturalidadeRef,
        nacionalidadeRef, numeroInscricaoRef,
        dataAfiliacaoRef, formacaoSuperiorRef, instituicaoSuperiorRef,
        dataFormacaoRef, numRegistroConselhoRef, dataRegistroConselhoRef,
        empresaRef].map(
          (inputRef) => inputRef.current?.value,);

    dataCollector({
      regional: { municipio, estado, naturalidade, nacionalidade },
      numInscricao, dataAfiliacao, formacaoSuperior, instituicaoSuperior,
      dataFormacao, numRegistroConselho, dataRegistroConselho, empresa, salario
    })
  });

  const authContext = useAuth();
  let [userData, setUserData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserData = useCallback(async () => {
    try {
      const responseData = await service.getUserData(
        urlAssociado,
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
    setUserData(responseData);
    setIsLoaded(true);
  }, [getUserData]);

  useEffect(() => {
    getUserData();
    handleUserData();
  }, []);

  switch (variant) {
    case "signUp": {
      return (
        <Container>
          {isLoaded && (
            <InputForm onSubmit={handleSubmit}>
              <InputContainer>
                <MultiInput
                  label="Regional"
                  names={[
                    "Município",
                    "Estado",
                    "Naturalidade",
                    "Nacionalidade",
                    "Brasileiro",
                  ]}
                  refs={{ cidadeRef, estadoRef, naturalidadeRef, nacionalidadeRef, brasileiroRef }}
                  variant="step2"
                  validation={validation}
                />
                <Input
                  variant="signup"
                  label="Número de Inscrição"
                  name="numInscricao"
                  placeholder="Digite o seu número de inscrição"
                  ref={numeroInscricaoRef}
                  validate={validation.testRequiredNumbers}
                />
                <Input
                  variant="signup"
                  label="Data de Afiliação"
                  name="dataAfiliacao"
                  placeholder="DD/MM/AA"
                  ref={dataAfiliacaoRef}
                  validate={validation.testDate}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  variant="signup"
                  label="Formação Superior"
                  name="formacaoSuperior"
                  placeholder="Digite o nome do seu curso"
                  ref={formacaoSuperiorRef}
                  validate={validation.requiredTextField}
                />
                <Input
                  variant="signup"
                  label="Instituição"
                  name="instituicaoSuperior"
                  placeholder="Digite o nome da sua instituição de formação"
                  ref={instituicaoSuperiorRef}
                  validate={validation.requiredTextField}
                />
                <Input
                  variant="signup"
                  label="Data de Formação"
                  name="dataFormacao"
                  placeholder="DD/MM/AAAA"
                  ref={dataFormacaoRef}
                  validate={validation.testDate}
                />
                <Input
                  variant="signup"
                  label="Nº de Registro no Conselho"
                  name="numRegistroConselho"
                  placeholder="Digite o seu número de registro"
                  ref={numRegistroConselhoRef}
                  validate={validation.testRequiredNumbers}
                />
                <Input
                  variant="signup"
                  label="Data de Registro no Conselho"
                  name="dataRegistroConselho"
                  placeholder="DD/MM/AAAA"
                  ref={dataRegistroConselhoRef}
                  validate={validation.testDate}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  variant="signup"
                  label="Orgão ou Empresa em que trabalha"
                  name="empresa"
                  placeholder="Digite o nome do Orgão ou Empresa"
                  ref={empresaRef}
                  validate={validation.requiredTextField}
                />
                <Input
                  variant="signup"
                  label="Salário"
                  name="salario"
                  placeholder="Digite apenas o valor sem vírgulas ou pontos"
                  ref={salarioRef}
                  validate={validation.testRequiredNumbers}
                />
                <ButtonContainer>
                  <Button variant="password">Finalizar Cadastro</Button>
                </ButtonContainer>
              </InputContainer>
            </InputForm>
          )}
        </Container>
      );
    }
    case "editData": {
      return (
        <Container>
          {isLoaded && (
            <InputForm onSubmit={handleSubmit}>
              <InputContainer>
                <MultiInput
                  label="Regional"
                  names={[
                    "Município",
                    "Estado",
                    "Naturalidade",
                    "Nacionalidade",
                    "Brasileiro",
                  ]}
                  placeholders={userData.regional}
                  refs={{ cidadeRef, estadoRef, naturalidadeRef, nacionalidadeRef, brasileiroRef }}
                  variant="step2"
                  validation={validation}
                />
                <Input
                  variant="signup"
                  label="Número de Inscrição"
                  name="numInscricao"
                  placeholder={userData.numInscricao}
                  ref={numeroInscricaoRef}
                  validate={validation.testNumbers}
                />
                <Input
                  variant="signup"
                  label="Data de Afiliação"
                  name="dataAfiliacao"
                  placeholder={userData.dataAfiliacao}
                  ref={dataAfiliacaoRef}
                  validate={validation.testDate}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  variant="signup"
                  label="Formação Superior"
                  name="formacaoSuperior"
                  placeholder={userData.formacaoSuperior}
                  ref={formacaoSuperiorRef}
                  validate={validation.TextField}
                />
                <Input
                  variant="signup"
                  label="Instituição"
                  name="instituicaoSuperior"
                  placeholder={userData.instituicaoSuperior}
                  ref={instituicaoSuperiorRef}
                  validate={validation.TextField}
                />
                <Input
                  variant="signup"
                  label="Data de Formação"
                  name="dataFormacao"
                  placeholder={userData.dataFormacao}
                  ref={dataFormacaoRef}
                  validate={validation.testDate}
                />
                <Input
                  variant="signup"
                  label="Nº de Registro no Conselho"
                  name="numRegistroConselho"
                  placeholder={userData.numRegistroConselho}
                  ref={numRegistroConselhoRef}
                  validate={validation.testNumbers}
                />
                <Input
                  variant="signup"
                  label="Data de Registro no Conselho"
                  name="dataRegistroConselho"
                  placeholder={userData.dataRegistroConselho}
                  ref={dataRegistroConselhoRef}
                  validate={validation.testDate}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  variant="signup"
                  label="Orgão ou Empresa em que trabalha"
                  name="empresa"
                  placeholder={userData.empresa}
                  ref={empresaRef}
                  validate={validation.TextField}
                />
                <Input
                  variant="signup"
                  label="Salário"
                  name="salario"
                  placeholder={userData.salario}
                  ref={salarioRef}
                  validate={validation.testNumbers}
                />
                <ButtonContainer>
                  <Button variant="password">Finalizar Cadastro</Button>
                </ButtonContainer>
              </InputContainer>
            </InputForm>
          )}
        </Container>
      );
    }
  }
};

export default SecondStepForm;
