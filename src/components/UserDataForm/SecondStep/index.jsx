import { useState, useEffect, useRef, useCallback } from 'react';

import * as validation from "../../../utils/validation";
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import { Container, InputsContainer, Head, Body, Description, Main, Footer, SubContainer, SubTitle, Profile, ProfileTitle, ProfileDescription, ProfileContainerImage, ProfileAvatar, ProfileArguments, ProfileAvatarAddPicture } from "../styles.js";

import CancelIcon from "../../../assets/cancel_icon.svg";
import LeftIcon from "../../../assets/blue_left_icon.svg";
import PersonFilled from "../../../assets/person_filled.svg";
import AddIcon from "../../../assets/icon_add_picture.svg";

import Input from "../../commom/Input";
import Button from "../../commom/Button";

import Image from 'next/image.js';

const SecondStep = ({ previousData, dataCollector, firstButton, globalMessage, cancelForm }) => {
  const formacaoSuperiorRef = useRef();
  const dataFormacaoRef = useRef();
  const empresaRef = useRef();
  const profissaoRef = useRef();
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
      profissaoRef, salarioRef, /* cidadeRef, estadoRef, */
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

    const salario = salarioRef.current?.value != undefined ? Number(salarioRef.current?.value) : 0.0;

    const [formacaoSuperior, dataFormacao, empresa, profissao,
      numRegistroConselho, dataRegistroConselho, numInscricao, dataAfiliacao,
      /* municipio, estado */] =
      [formacaoSuperiorRef, dataFormacaoRef, empresaRef, profissaoRef,
        numRegistroConselhoRef, dataRegistroConselhoRef, numeroInscricaoRef, dataAfiliacaoRef,
        /* cidadeRef, estadoRef */
      ].map(
        (inputRef) => inputRef.current?.value,);

    dataCollector({
      /* regional: { municipio, estado, naturalidade, nacionalidade},*/ 
      formacaoSuperior, dataFormacao, empresa, profissao, salario,
      numRegistroConselho, dataRegistroConselho, numInscricao, dataAfiliacao
    })
  });

  // imagem do perfil
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);

  };

  // upload da imagem
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // referencia do input
  const fileInputRef = useRef(null);
  

  return (
    <Container onSubmit={handleSubmit}>
      <Head>
        Adicionar Associado
        <Image src={CancelIcon} onClick={cancelForm} />
      </Head>
      <Profile>

        <ProfileContainerImage>
              <ProfileAvatar style={{backgroundImage: `url(${selectedFile && URL.createObjectURL(selectedFile)})`}}>
                <Image src={PersonFilled} />
                <ProfileAvatarAddPicture onClick={handleUploadClick}>
                  <Image src={AddIcon} />
                  <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                  />
                </ProfileAvatarAddPicture>
              </ProfileAvatar>
          </ProfileContainerImage>

        <ProfileArguments>
          <ProfileTitle>
            Adicionar foto
          </ProfileTitle>
          <ProfileDescription>
            *Adicione uma foto do associado nos tamanhos x y z até ab kbts.
          </ProfileDescription>
        </ProfileArguments>

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
              initialValue={previousData.formacaoSuperior}
              ref={formacaoSuperiorRef}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Data de Formação"}
              name={"data_de_formacao"}
              placeholder={"DD/MM/AAAA"}
              initialValue={previousData.dataFormacao}
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
              label={"Profissão"}
              name={"profissao"}
              placeholder={"Digite sua profissão"}
              initialValue={previousData.profissao}
              ref={profissaoRef}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Organização ou empresa que trabalha"}
              name={"trabalho"}
              placeholder={"Digite onde você trabalha"}
              initialValue={previousData.empresa}
              ref={empresaRef}
              validate={validation.TextField}
            />
            <Input
              variant="default-optional"
              label={"Salário"}
              name={"salario"}
              placeholder={"R$ 00,00"}
              initialValue={previousData.salario}
              ref={salarioRef}
              validate={validation.testNumbers}
            />
          </SubContainer>
          <SubContainer>
            <SubTitle>
              Vínculo com a SINAVEZ
            </SubTitle>
            <Input
              variant="default-optional"
              label={"Número de registro no conselho"}
              name={"numero_de_registro"}
              placeholder={"Digite o seu número de registro no conselho"}
              initialValue={previousData.numRegistroConselho}
              ref={numRegistroConselhoRef}
              validate={validation.testNumbers}
            />
            <Input
              variant="default-optional"
              label={"Data de registro no conselho"}
              name={"data_de_registro"}
              placeholder={"DD/MM/AAAA"}
              initialValue={previousData.dataRegistroConselho}
              ref={dataRegistroConselhoRef}
              validate={validation.testDate}
            />
            <InputsContainer>
              <Input
                variant="default-optional"
                label={"Número de Inscrição"}
                name={"numero_de_inscricao"}
                placeholder={"Número de inscrição"}
                initialValue={previousData.numInscricao}
                ref={numeroInscricaoRef}
                validate={validation.testNumbers}
              />
              <Input
                variant="default-optional"
                label={"Data de Afiliação"}
                name={"data_de_afiliacao"}
                placeholder={"DD/MM/AAAA"}
                initialValue={previousData.dataAfiliacao}
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
        <Button variant={"light"} >
          CONTINUAR
        </Button>
      </Footer>
      {globalMessage && <span style={{color: 'red', fontWeight: 'bold'}}>{globalMessage}</span>}
    </Container>
  );
};

export default SecondStep;