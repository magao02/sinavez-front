import { useState, useEffect, useRef, useCallback } from 'react';

import * as validation from "../../../utils/validation";
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import { Container, InputsContainer, Head, Body, Description, Main, Footer, SubContainer, SubTitle } from "./styles.js";

import CancelIcon from "../../../assets/cancel_icon.svg";
import LeftIcon from "../../../assets/blue_left_icon.svg";

import Input from "../../commom/Input";
import Button from "../../commom/Button";

import Image from 'next/image.js';

const SecondStep = ({ dataCollector, firstButton, globalMessage, cancelForm }) => {
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

  return (
    <Container onSubmit={handleSubmit}>
      <Head>
        Adicionar Associado
        <Image src={CancelIcon} onClick={cancelForm} />
      </Head>
      <Body>
        <Description>
          Passo 2 de 3
        </Description>
        <Main>
          <SubContainer>
            <SubTitle>
              Dados Acadêmicos
            </SubTitle>
            <Input
              variant="default-optional"
              label={"Curso de Formação"}
              name={"curso_de_formacao"}
              placeholder={"Digite seu curso de formação"}
              ref={formacaoSuperiorRef}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Data de Formação"}
              name={"data_de_formacao"}
              ref={dataFormacaoRef}
              placeholder={"DD/MM/AAAA"}
              validate={validation.testDate}
            />
          </SubContainer>
          <SubContainer>
            <SubTitle>
              Dados Empregatícios
            </SubTitle>
            <Input
              variant="default-optional"
              label={"Organização ou empresa que trabalha"}
              name={"trabalho"}
              ref={empresaRef}
              placeholder={"Digite onde você trabalha"}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Instituição"}
              name={"instituição"}
              ref={instituicaoSuperiorRef}
              placeholder={"Digite a instituição"}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Salário"}
              name={"salario"}
              ref={salarioRef}
              placeholder={"R$ 00,00"}
              validate={validation.testNumbers}
            />
          </SubContainer>
          <SubContainer>
            <SubTitle>
              Vínculo com a SINAVEZ
            </SubTitle>
            <Input
              variant="default-optional"
              label={"Regional"}
              name={"regional"}
              placeholder={"Digite a sua regional"}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Número de registro no conselho"}
              name={"numero_de_registro"}
              ref={numRegistroConselhoRef}
              placeholder={"Digite o seu número de registro no conselho"}
              validate={validation.testDate}
            />
            <InputsContainer>
              <Input
                variant="default-optional"
                label={"Número de Inscrição"}
                name={"numero_de_inscricao"}
                ref={numeroInscricaoRef}
                placeholder={"Digite seu número de inscrição"}
                validate={validation.testNumbers}
              />
              <Input
                variant="default-optional"
                label={"Data de Afiliação"}
                name={"data_de_afiliacao"}
                ref={dataAfiliacaoRef}
                placeholder={"DD/MM/AAAA"}
                validate={validation.testPhone}
              />
            </InputsContainer>
          </SubContainer>
        </Main>
      </Body>
      <Footer>
        <Button variant={"text"} onClick={firstButton}>
          <Image src={LeftIcon} />
          VOLTAR
        </Button>
        {globalMessage && <span>{globalMessage}</span>}
        <Button variant={"light"} >
          CONTINUAR
        </Button>
      </Footer>
    </Container>
  );
};

export default SecondStep;