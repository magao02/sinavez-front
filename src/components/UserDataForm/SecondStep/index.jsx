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

const SecondStep = ({file, takeImage, image, previousData, dataCollector, firstButton, globalMessage, cancelForm }) => {
  const empresaRef = useRef();
  const profissaoRef = useRef();
  const salarioRef = useRef();
  const telefoneRef = useRef();
  const ruaRef = useRef();
  const bairroRef = useRef();
  const numeroRef = useRef();
  const municipioRef = useRef();
  const cepRef = useRef();

  const [localImage1, setLocalImage1] = useState(image);
  const [localImage, setLocalImage] = useState(null);

  /*   const cidadeRef = useRef();
    const estadoRef = useRef(); */

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      empresaRef,
      profissaoRef, salarioRef, telefoneRef, ruaRef, bairroRef,
      numeroRef, municipioRef,
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

    const [empresa, profissao,
      telefone, rua, bairro, numero, municipio, cep] =
      [empresaRef, profissaoRef,
        telefoneRef, ruaRef, bairroRef, numeroRef, municipioRef, cepRef
      ].map(
        (inputRef) => inputRef.current?.value,);

    dataCollector({
      /* regional: { municipio, estado, naturalidade, nacionalidade},*/ 
      empresa,  
      profissao, 
      salario,
      telefone, 
      endereco: { rua, bairro, numero}, 
      regional: { municipio, cep},

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
          Passo 2 de 3
        </Description>
        <Main>
          <SubContainer>
            <SubTitle>
              Contatos
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
              Vínculo com o SINAVEZ
            </SubTitle>
            <Input
              variant="default"
              label={"Telefone"}
              name={"Telefone"}
              placeholder={"(XX) YYYY-ZZZZ"}
              initialValue={previousData.telefone}
              ref={telefoneRef}
              validate={validation.testRequiredPhone}
            />
             <Input
              variant="default-optional"
              label={"CEP"}
              name={"cep"}
              placeholder={"00000-000"}
              initialValue={previousData.cep ? previousData.regional.cep : ""}
              ref={cepRef}
            />
            <Input
              variant="default"
              label={"Nome da rua"}
              name={"Rua"}
              placeholder={"Rua"}
              initialValue={previousData.endereco ? previousData.endereco.rua : ""}
              ref={ruaRef}
              validate={validation.TextField}
            />
            <Input
              variant="default"
              label={"Bairro"}
              name={"Bairro"}
              placeholder={"Bairro"}
              initialValue={previousData.endereco ? previousData.endereco.bairro : ""}
              ref={bairroRef}
              validate={validation.TextField}
            />
            <Input
              variant="default"
              label={"Número de Residência"}
              name={"Número"}
              placeholder={"Número"}
              initialValue={previousData.endereco ? previousData.endereco.numero : ""}
              ref={numeroRef}
              validate={validation.testNumbers}
            />
            <Input
              variant="default"
              label={"Cidade"}
              name={"Município"}
              placeholder={"Cidade"}
              initialValue={previousData.endereco ? previousData.regional.municipio : ""}
              ref={municipioRef}
              validate={validation.TextField}
            />

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

export default SecondStep;