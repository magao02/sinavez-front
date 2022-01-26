import { useRef, useCallback } from 'react';

import * as validation from '../../../utils/validation';

import {
  Container,
  InputForm,
  InputContainer,
  ButtonContainer,
} from "./styles";

import Input from "../../commom/Input";
import Button from "../../commom/Button";
import MultiInput from "../../commom/MultiInput";

const SecondStepForm = ({ dataCollector }) => {
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

    if(!isValidSubmit) return;

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
        
        dataCollector({regional: {municipio, estado, naturalidade, nacionalidade}, 
        numInscricao, dataAfiliacao, formacaoSuperior, instituicaoSuperior, 
        dataFormacao, numRegistroConselho, dataRegistroConselho, empresa, salario})
  });

  return (
    <Container>
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
            refs={{cidadeRef, estadoRef, naturalidadeRef, nacionalidadeRef, brasileiroRef}}
            variant="step2"
            validation={validation}
          />
          <Input
            variant="signup"
            label="Número de Inscrição"
            name="numInscricao"
            placeholder="Digite o seu número de inscrição"
            ref={numeroInscricaoRef}
            validate={validation.testNumbers}
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
            validate={validation.testNumbers}
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
            validate={validation.testNumbers}
          />
          <ButtonContainer>
            <Button variant="password">Finalizar Cadastro</Button>
          </ButtonContainer>
        </InputContainer>
      </InputForm>
    </Container>
  );
};

export default SecondStepForm;
