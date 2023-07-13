import { useState, useEffect, useRef, useCallback } from 'react';

import * as validation from "../../../utils/validation";
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import { Container, InputsContainer, Head, Body, Description, Main, Footer, SubContainer, SubTitle, Profile, ProfileTitle, ProfileDescription } from "../styles.js";

import CancelIcon from "../../../assets/cancel_icon.svg";
import LeftIcon from "../../../assets/blue_left_icon.svg";

import Input from "../../commom/Input";
import Button from "../../commom/Button";

import Image from 'next/image.js';

const SecondStep = ({ previousData, dataCollector, firstButton, globalMessage, cancelForm }) => {
  const formacaoSuperiorRef = useRef();
  const dataFormacaoRef = useRef();
  const empresaRef = useRef();
  const instituicaoSuperiorRef = useRef();
  const salarioRef = useRef();

  const numRegistroConselhoRef = useRef();
  const dataRegistroConselhoRef = useRef();
  const numeroInscricaoRef = useRef();
  const dataAfiliacaoRef = useRef();

  /*   const cidadeRef = useRef();
    const estadoRef = useRef(); */

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      formacaoSuperiorRef, dataFormacaoRef, empresaRef,
      instituicaoSuperiorRef, salarioRef, /* cidadeRef, estadoRef, */
      numRegistroConselhoRef, dataRegistroConselhoRef, numeroInscricaoRef,
      dataAfiliacaoRef
    ];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate()),
    )
    return validationResults.every((result) => result === true);
  });

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const isValidSubmit = await allFieldsAreValid();

    if (!isValidSubmit) return;

    const salario = salarioRef.current?.value != undefined ? Number(salarioRef.current?.value.replace(",", ".")) : 0.0;

    const [formacaoSuperior, dataFormacao, empresa, instituicaoSuperior,
      numRegistroConselho, dataRegistroConselho, numInscricao, dataAfiliacao,
      /* municipio, estado */] =
      [formacaoSuperiorRef, dataFormacaoRef, empresaRef, instituicaoSuperiorRef,
        numRegistroConselhoRef, dataRegistroConselhoRef, numeroInscricaoRef, dataAfiliacaoRef,
        /* cidadeRef, estadoRef */
      ].map(
        (inputRef) => inputRef.current?.value,);

    dataCollector({
      /* regional: { municipio, estado, naturalidade, nacionalidade }, */
      formacaoSuperior, dataFormacao, empresa, instituicaoSuperior, salario,
      numRegistroConselho, dataRegistroConselho, numInscricao, dataAfiliacao
    })
  });

  return (
    <Container onSubmit={handleSubmit}>
      <Head>
        Adicionar Associado
        <Image src={CancelIcon} onClick={cancelForm} />
      </Head>
      <Profile>
        <ProfileTitle>
          Adicionar foto
        </ProfileTitle>
        <ProfileDescription>
          *Adicione uma foto do associado nos tamanhos x y z até ab kbts.
        </ProfileDescription>
      </Profile>
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
              previousValue={previousData.formacaoSuperior}
              ref={formacaoSuperiorRef}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Data de Formação"}
              name={"data_de_formacao"}
              placeholder={"DD/MM/AAAA"}
              previousValue={previousData.dataFormacao}
              ref={dataFormacaoRef}
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
              placeholder={"Digite onde você trabalha"}
              previousValue={previousData.empresa}
              ref={empresaRef}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Instituição"}
              name={"instituição"}
              placeholder={"Digite a instituição"}
              previousValue={previousData.instituicaoSuperior}
              ref={instituicaoSuperiorRef}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Salário"}
              name={"salario"}
              placeholder={"R$ 00,00"}
              previousValue={previousData.salario}
              ref={salarioRef}
              validate={validation.testNumbers}
            />
          </SubContainer>
          <SubContainer>
            <SubTitle>
              Vínculo com a SINAVEZ
            </SubTitle>
            {/*             <Input
              variant="default-optional"
              label={"Regional"}
              name={"regional"}
              placeholder={"Digite a sua regional"}
              validate={validation.TextField}
            /> */}
            <Input
              variant="default-optional"
              label={"Número de registro no conselho"}
              name={"numero_de_registro"}
              placeholder={"Digite o seu número de registro no conselho"}
              previousValue={previousData.numRegistroConselho}
              ref={numRegistroConselhoRef}
              validate={validation.testNumbers}
            />
            <Input
              variant="default-optional"
              label={"Data de registro no conselho"}
              name={"data_de_registro"}
              placeholder={"DD/MM/AAAA"}
              previousValue={previousData.dataRegistroConselho}
              ref={dataRegistroConselhoRef}
              validate={validation.testDate}
            />
            <InputsContainer>
              <Input
                variant="default-optional"
                label={"Número de Inscrição"}
                name={"numero_de_inscricao"}
                placeholder={"Número de inscrição"}
                previousValue={previousData.numInscricao}
                ref={numeroInscricaoRef}
                validate={validation.testNumbers}
              />
              <Input
                variant="default-optional"
                label={"Data de Afiliação"}
                name={"data_de_afiliacao"}
                placeholder={"DD/MM/AAAA"}
                previousValue={previousData.dataAfiliacao}
                ref={dataAfiliacaoRef}
                validate={validation.testDate}
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