import { useState, useEffect, useRef, useCallback } from 'react';

import * as validation from "../../../utils/validation";
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import { Container, InputsContainer, Head, Body, Description, Main, Footer, SubContainer, SubTitle, Profile, ProfileTitle, ProfileDescription, MainHead, Text, ProfileContainerImage, ProfileAvatar, ProfileArguments, ProfileAvatarAddPicture, SubContainerDependents } from "../styles.js";

import CancelIcon from "../../../assets/cancel_icon.svg";
import LeftIcon from "../../../assets/blue_left_icon.svg";
import AddIcon from "../../../assets/add_icon.svg";
import PersonFilled from "../../../assets/person_filled.svg";

import AddPhotoIcon from "../../../assets/icon_add_picture.svg";

import Input from "../../commom/Input";
import Button from "../../commom/Button";
import DependentsContainer from "../../DependentsContainer";

import Image from 'next/image.js';

const ThirdStep = ({ previousData, dataCollector, firstButton, globalMessage, cancelForm, handleAddAssociate }) => {
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
  const naturalidadeRef = useRef();
  const nacionalidadeRef = useRef("Brasileiro");

  const [dataDependent, setDataDependent] = useState({});

  const takeDataDependents = (data) => {
    setDataDependent(data);
};

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
      dataFormacao, numRegistroConselho, dataRegistroConselho, empresa, salario, 
      dependentes: dataDependent
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

  const [countDependents, setCountDependents] = useState(0);
  const [initialNumber, setInitialNumber] = useState(1);


  const handleAddMoreDependents = () => {
    setCountDependents(countDependents + 1);
  };

console.log(dataDependentes);
  return (

    <Container onSubmit={handleSubmit}>
      <Head>
        Adicionar Associado
        <Image src={CancelIcon} onClick={cancelForm} />
      </Head>
      <Profile>

        <ProfileContainerImage>
          <ProfileAvatar style={{ backgroundImage: `url(${selectedFile && URL.createObjectURL(selectedFile)})` }}>
            <Image src={PersonFilled} />
            <ProfileAvatarAddPicture onClick={handleUploadClick}>
              <Image src={AddPhotoIcon} />
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
            {previousData.name}
          </ProfileTitle>
          <ProfileDescription>
            <strong>CPF:</strong> {previousData.cpf}
          </ProfileDescription>
        </ProfileArguments>

      </Profile>

      <Body>
        <Description>
          Passo 3 de 3
        </Description>
        <Main height={true}>
          <MainHead>
            <Text title={true}>
              Adicione Dependentes
            </Text>
            <Text title={false}>
              Para finalizar, você pode adicionar dependentes para esse associado ou concluir o processo e fazer isso em outro momento.
            </Text>
          </MainHead>
          <SubContainerDependents>

            <DependentsContainer variant="default" handleDataDependentes={handleDataDependentes} number={countDependents > 0 ? initialNumber : 0} submitForm={dataCollector} previousData={previousData}/>
            {[...Array(countDependents)].map((_, index) => (
              <DependentsContainer key={index} variant="default" number={index + 2} marginTop={true} handleDataDependentes={handleDataDependentes} previousData={previousData} takeDataDependents={takeDataDependents}/>
            ))}

            <Footer>
              <Button variant={"default"} onClick={handleAddMoreDependents}>
                <Image src={AddIcon} />
                Adicionar outro dependente
              </Button>
            </Footer>
          </SubContainerDependents>
        </Main>
      </Body>
      <Footer>
        <Button variant={"text"} onClick={firstButton}>
          <Image src={LeftIcon} />
          VOLTAR
        </Button>
        <Button variant={"default"} onClick={handleAddAssociate}>
          Finalizar cadastro
        </Button>
      </Footer>
      {globalMessage && <span style={{ color: 'red', fontWeight: 'bold' }}>{globalMessage}</span>}
    </Container >
  );
};

export default ThirdStep;