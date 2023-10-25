import React from "react";

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

const MiddleStep = ({file, takeImage, image, previousData, dataCollector, firstButton, globalMessage, cancelForm }) => {

    const numRegistroConselhoRef = useRef();
    const dataRegistroConselhoRef = useRef();
    const numeroInscricaoRef = useRef();
    const dataAfiliacaoRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

  const [localImage1, setLocalImage1] = useState(image);
  const [localImage, setLocalImage] = useState(null);

  /*   const cidadeRef = useRef();
    const estadoRef = useRef(); */

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
        numRegistroConselhoRef, dataRegistroConselhoRef, numeroInscricaoRef, dataAfiliacaoRef, emailRef, passwordRef
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

    const [numRegistroConselho, dataRegistroConselho, numInscricao, dataAfiliacao, email, password] =
      [ numRegistroConselhoRef, dataRegistroConselhoRef, numeroInscricaoRef, dataAfiliacaoRef, emailRef, passwordRef
      ].map(
        (inputRef) => inputRef.current?.value,);

    dataCollector({
        numRegistroConselho, 
        dataRegistroConselho, 
        numInscricao, 
        dataAfiliacao, 
        email, 
        password
    })
  });

  // imagem do perfil
  // referencia do input
  const fileInput = useRef(null);

  const triggerImagePopup = () => {
    if (fileInput?.current) {
      fileInput.current.click();
    }
  };

  const onImageInputChange = () => {
    if (fileInput?.current) {
      if (fileInput.current.files[0]) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setLocalImage(reader.result);
        });
        reader.readAsDataURL(fileInput.current.files[0]);
      } else {
        setLocalImage(null);
      }
    }
  };

  const imageSave = () => {
    if (localImage1){
      takeImage(localImage1);
    } else if (localImage){
      takeImage(localImage);
      console.log("enviou")
    }
  };
  

  return (
    <Container onSubmit={handleSubmit}>
      <Head>
        Adicionar Associado
        <Image src={CancelIcon} onClick={cancelForm} />
      </Head>
      <Profile>

      <ProfileContainerImage>
          <ProfileAvatar>
            {(localImage1 || previousData.profilePic) ? (
              <img src={localImage1 ?? previousData.profilePic} style={{ width: '115px', height: '115px', borderRadius: '100%' }} />
            ) : (
              <img src={PersonFilled.src} />
            )}
          
              <ProfileAvatarAddPicture>
                <Image src={AddIcon} onClick={triggerImagePopup} />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={onImageInputChange}
                  style={{ display: 'none' }}
                  validate={validation.requiredTextField}
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
          Passo 3 de 4
        </Description>
        <Main>
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


            <SubContainer>
                <SubTitle>
                E-mail e Senha
                </SubTitle>
                <Input
                variant="default"
                label={"E-mail"}
                name={"E-mail"}
                placeholder={"email@domínio.com"}
                initialValue={previousData.email}
                ref={emailRef}
                validate={validation.testRequiredEmail}
                />
                <Input
                variant="default"
                label={"Senha"}
                name={"senha"}
                placeholder={"********"}
                initialValue={previousData.password}
                ref={passwordRef}
                type="password"
                validate={validation.testRequiredPassword}
                />
                <Input
                variant="default"
                label={"Confirme senha"}
                name={"senha"}
                placeholder={"********"}
                initialValue={previousData.password}
                ref={passwordRef}
                validate={validation.testRequiredPassword}
                />
          </SubContainer>

          </SubContainer>
        </Main>
      </Body>
      <Footer>
        <Button variant={"text"} onClick={firstButton}>
          <Image src={LeftIcon} />
          VOLTAR
        </Button>
        <Button variant={"light"} onClick={imageSave}>
          CONTINUAR
        </Button>
      </Footer>
      {globalMessage && <span style={{color: 'red', fontWeight: 'bold'}}>{globalMessage}</span>}
    </Container>
  );
};


export default MiddleStep;