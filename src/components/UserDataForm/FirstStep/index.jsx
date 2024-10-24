import { useState, useEffect, useRef, useCallback } from 'react';

import * as validation from "../../../utils/validation";
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import { Container, InputsContainer, Head, Body, Description, Main, Footer, SubContainer, SubTitle, Profile, ProfileTitle, ProfileDescription, ProfileAvatar, ProfileContainerImage, ProfileArguments, ProfileAvatarAdicionar, ProfileAvatarAddPicture } from "../styles.js";

import CancelIcon from "../../../assets/cancel_icon.svg";
import PersonFilled from "../../../assets/person_filled.svg";
import AddIcon from "../../../assets/icon_add_picture.svg";



import Input from "../../commom/Input";
import Button from "../../commom/Button";

import Image from 'next/image.js';


const FirstStepForm = ({takeImage, previousData, dataCollector, globalMessage, cancelForm }) => {
  const nameRef = useRef(null);
  const cpfRef = useRef(null);
  const birthdayRef = useRef(null);
  const rgRef = useRef(null);
  const dataEmissaoRef = useRef(null);
  const fileInput = useRef(null);
  const formacaoSuperiorRef = useRef();
  const dataFormacaoRef = useRef();
  const filiacaoRef = useRef();
  const universidadeRef = useRef();

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      nameRef,
      cpfRef,
      birthdayRef,
      rgRef,
      dataEmissaoRef,
    ];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate())
    );

    return validationResults.every((result) => result === true);
  });

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const isValidSubmit = await allFieldsAreValid();

    if (!isValidSubmit) return;

    const [
      name,
      cpf,
      nascimento,
      rg,
      emissao,
      formacaoSuperior,
      dataFormacao,
      filiacao,
      universidade,
     
    ] = [
      nameRef,
      cpfRef,
      birthdayRef,
      rgRef,
      dataEmissaoRef,
      formacaoSuperiorRef,
      dataFormacaoRef,
      filiacaoRef,
      universidadeRef,
      
    ].map((inputRef) => inputRef.current?.value);

    dataCollector({
      name,
      cpf,
      nascimento,
      rg,
      emissao,
      formacaoSuperior,
      dataFormacao,
      filiacao,
      universidade,
    });
  });


  
  const [localImage, setLocalImage] = useState(null);

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
    if (localImage){
      takeImage(localImage);
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
            {(localImage || previousData.profilePic) ? (
              <img src={localImage ?? previousData.profilePic} style={{ width: '115px', height: '115px', borderRadius: '100%' }} />
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
          Passo 1 de 3
        </Description>
        <Main>
          <SubContainer>
            <SubTitle>
              Dados Pessoais
            </SubTitle>
            <Input
              variant="default"
              label={"Nome Completo"}
              name={"nome"}
              placeholder={"Digite seu nome completo"}
              ref={nameRef}
              initialValue={previousData.name}
              validate={validation.requiredTextField}
            />
            <Input
                variant="default-optional"
                label={"Data de Nascimento"}
                name={"nascimento"}
                initialValue={previousData.nascimento}
                ref={birthdayRef}
                placeholder={"DD/MM/AAAA"}
                validate={validation.testDate}
              />
              <Input
                variant="default"
                label={"CPF"}
                name={"cpf"}
                placeholder={"000.000.000-0"}
                initialValue={previousData.cpf}
                ref={cpfRef}
                validate={validation.testRequiredCpf}
              />
              <Input
                variant="default-optional"
                label={"Registro Geral (RG)"}
                name={"rg"}
                placeholder={"Digite o seu RG"}
                initialValue={previousData.rg}
                ref={rgRef}
                
              />
              <Input
                variant="default-optional"
                label={"Data de Emissão"}
                name={"data_de_emissão"}
                placeholder={"DD/MM/AAAA"}
                initialValue={previousData.emissao}
                ref={dataEmissaoRef}
                validate={validation.testDate}
              />
              <Input
              variant="default-optional"
              label={"Filiação"}
              name={"filiacao"}
              placeholder={"Filiação"}
              initialValue={previousData.filiacao}
              ref={filiacaoRef}
            />
              <Input
              variant="default-optional"
              label={"Curso de Formação"}
              name={"curso_de_formacao"}
              placeholder={"Digite seu curso de formação"}
              initialValue={previousData.formacaoSuperior}
              ref={formacaoSuperiorRef}
            />
            <Input
              variant="default-optional"
              label={"Data de Formação"}
              name={"data_de_formacao"}
              placeholder={"DD/MM/AAAA"}
              initialValue={previousData.dataFormacao}
              ref={dataFormacaoRef}
            />
             <Input
              variant="default-optional"
              label={"Universiade"}
              name={"universidade"}
              placeholder={"Universidade"}
              initialValue={previousData.universidade}
              ref={universidadeRef}
            />
          </SubContainer>
         
        </Main>
      </Body>
      <Footer>
        <Button variant={"text"} onClick={cancelForm}>
          CANCELAR
        </Button>
        <Button variant={"light"} onClick={imageSave}>
          CONTINUAR
        </Button>
      </Footer>
      {globalMessage && <span style={{ color: 'red', fontWeight: 'bold' }}>{globalMessage}</span>}
    </Container>
  );
};



export default FirstStepForm;
