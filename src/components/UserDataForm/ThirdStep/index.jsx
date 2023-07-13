import { useState, useEffect, useRef, useCallback } from 'react';

import * as validation from "../../../utils/validation";
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import { Container, InputsContainer, Head, Body, Description, Main, Footer, SubContainer, SubTitle, Profile, ProfileTitle, ProfileDescription, MainHead, Text } from "../styles.js";

import CancelIcon from "../../../assets/cancel_icon.svg";
import LeftIcon from "../../../assets/blue_left_icon.svg";
import AddIcon from "../../../assets/add_icon.svg";

import Input from "../../commom/Input";
import Button from "../../commom/Button";
import DependentsContainer from "../../DependentsContainer";

import Image from 'next/image.js';

const SecondStep = ({ previousData, dataCollector, firstButton, globalMessage, cancelForm }) => {
  const cidadeRef = useRef();
  const estadoRef = useRef();

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
      <Profile>
        <ProfileTitle>
          {previousData.name}
        </ProfileTitle>
        <ProfileDescription>
          <strong>CPF:</strong> {previousData.cpf}
        </ProfileDescription>
      </Profile>
      <Body>
        <Description>
          Passo 3 de 3
        </Description>
        <Main>
          <MainHead>
            <Text title={true}>
              Adicione Dependentes
            </Text>
            <Text title={false}>
              Para finalizar, você pode adicionar dependentes para esse associado ou concluir o processo e fazer isso em outro momento.
            </Text>
          </MainHead>
          <SubContainer>
            <DependentsContainer variant="default" />
            <Footer>
              <Button variant={"default"}>
                <Image src={AddIcon} />
                Adicionar outro dependente
              </Button>
            </Footer>
          </SubContainer>
        </Main>
      </Body>
      <Footer>
        <Button variant={"text"} onClick={firstButton}>
          <Image src={LeftIcon} />
          VOLTAR
        </Button>
        {globalMessage && <span>{globalMessage}</span>}
        <Button variant={"default"} >
          Finalizar cadastro
        </Button>
      </Footer>
    </Container >
  );
};

export default SecondStep;