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


const FirstStepForm = ({ previousData, cpf, dataCollector, globalMessage, cancelForm }) => {
  const nameRef = useRef(null);
  const cpfRef = useRef(null);
  const birthdayRef = useRef(null);
  const rgRef = useRef(null);
  const dataEmissaoRef = useRef(null);
  const streetRef = useRef(null);
  const neighborhoodRef = useRef(null);
  const numberRef = useRef(null);
  const cityRef = useRef(null);
  const complementRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const naturalidadeRef = useRef(null);
  const nacionalidadeRef = useRef("Brasileiro");

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      nameRef,
      cpfRef,
      birthdayRef,
      rgRef,
      dataEmissaoRef,
      emailRef,
      passwordRef,
      phoneRef,
      naturalidadeRef,
      nacionalidadeRef 
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
      street,
      neighborhood,
      number,
      city,
      complement,
      email,
      password,
      phone,
    ] = [
      nameRef,
      cpfRef,
      birthdayRef,
      rgRef,
      dataEmissaoRef,
      streetRef,
      neighborhoodRef,
      numberRef,
      cityRef,
      complementRef,
      emailRef,
      passwordRef,
      phoneRef,
    ].map((inputRef) => inputRef.current?.value);

    dataCollector({
      name,
      cpf,
      nascimento,
      rg,
      emissao,
      endereco: { street, neighborhood, number, city, complement },
      email,
      password,
      phone,
    });
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
              previousValue={previousData.name}
              validate={validation.requiredTextField}
            />
            <InputsContainer>
              <Input
                variant="default"
                label={"CPF"}
                name={"cpf"}
                placeholder={"000.000.000-0"}
                previousValue={previousData.cpf}
                ref={cpfRef}
                validate={validation.testRequiredCpf}
              />
              <Input
                variant="default"
                label={"Data de Nascimento"}
                name={"nascimento"}
                previousValue={previousData.nascimento}
                ref={birthdayRef}
                placeholder={"DD/MM/AAAA"}
                validate={validation.requiredTextField}
              />
              <Input
                variant="default"
                label={"Registro Geral (RG)"}
                name={"rg"}
                placeholder={"Digite o seu RG"}
                previousValue={previousData.rg}
                ref={rgRef}
                validate={validation.requiredTextField}
              />
              <Input
                variant="default"
                label={"Data de Emissão"}
                name={"data_de_emissão"}
                placeholder={"DD/MM/AAAA"}
                previousValue={previousData.emissao}
                ref={dataEmissaoRef}
                validate={validation.testDate}
              />
                <Input
                variant="default-optional"
                label={"Naturalidade"}
                name={"naturalidade"}
                placeholder={"Digite sua naturalidade"}
                previousValue={previousData.naturalidade}
                ref={naturalidadeRef}
                validate={validation.TextField}
              />
              <Input
                variant="default-optional"
                label={"Nacionalidade"}
                name={"nacionalidade"}
                placeholder={"Digite sua nacionalidade"}
                ref={nacionalidadeRef}
                validate={validation.TextField}
              />
            </InputsContainer>
          </SubContainer>

          <SubContainer marginTop = {true}>
            <SubTitle>
              Endereço
            </SubTitle>
            <Input
              variant="default"
              label={"Nome da rua"}
              name={"Rua"}
              placeholder={"Rua"}
              previousValue={previousData.endereco ? previousData.endereco.street : ""}
              ref={streetRef}
              validate={validation.TextField}
            />
            <InputsContainer>
              <Input
                variant="default"
                label={"Bairro"}
                name={"Bairro"}
                placeholder={"Bairro"}
                previousValue={previousData.endereco ? previousData.endereco.neighborhood : ""}
                ref={neighborhoodRef}
                validate={validation.TextField}
              />
              <Input
                variant="default"
                label={"Número"}
                name={"Número"}
                placeholder={"Número"}
                previousValue={previousData.endereco ? previousData.endereco.number : ""}
                ref={numberRef}
                validate={validation.testNumbers}
              />
              <Input
                variant="default"
                label={"Cidade"}
                name={"Cidade"}
                placeholder={"Cidade"}
                previousValue={previousData.endereco ? previousData.endereco.city : ""}
                ref={cityRef}
                validate={validation.TextField}
              />
              <Input
                variant="default-optional"
                label={"Complemento"}
                name={"Complemento"}
                placeholder={"Complemento"}
                previousValue={previousData.endereco ? previousData.endereco.complement : ""}
                ref={complementRef}
                validate={validation.TextField}
              />
            </InputsContainer>
          </SubContainer>
          <SubContainer>
            <SubTitle>
              Dados cadastrais
            </SubTitle>
            <Input
              variant="default"
              label={"E-mail"}
              name={"E-mail"}
              placeholder={"email@domínio.com"}
              previousValue={previousData.email}
              ref={emailRef}
              validate={validation.testEmail}
            />
            <Input
              variant="default"
              label={"Senha"}
              name={"senha"}
              placeholder={"********"}
              previousValue={previousData.password}
              ref={passwordRef}
              type="password"
              validate={validation.testPassword}
            />
            <Input
              variant="default"
              label={"Telefone"}
              name={"Telefone"}
              placeholder={"(XX) YYYY-ZZZZ"}
              previousValue={previousData.phone}
              ref={phoneRef}
              validate={validation.testPhone}
            />
          </SubContainer>
        </Main>
      </Body>
      <Footer>
        <Button variant={"text"} onClick={cancelForm}>
          CANCELAR
        </Button>
        {globalMessage && <span>{globalMessage}</span>}
        <Button variant={"light"} >
          CONTINUAR
        </Button>
      </Footer>
    </Container>
  );
};

export default FirstStepForm;
