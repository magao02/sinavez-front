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

import Image from 'next/image.js';
import DependentsForm from '../../DependentsContainer';
import { ContainerInputLabel, ContainerLabel, Label, SpanLabel } from '../../../styles/homeStyles';

const AdmStepForm = ({file, saveImage, image, previousData, dataCollector, firstButton, globalMessage, cancelForm, handleAddAssociate }) => {

const [localImage1, setLocalImage1] = useState(image);
const [localImage, setLocalImage] = useState(null);
const [on, setOn] = useState(false);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    dataCollector({
      admin: on
    });

  });

  // imagem do perfil
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

  const verificaFile = () => {
    if (localImage) {
      return localImage;
    } else if (localImage1) {
      return localImage1;
    } else {
      return previousData.profilePic;
    }
  }    

  const oneChangeRadio = (value) => {
    if (value) {
      return () => {
       setOn(true);
      }
    } else {
      return () => {
        setOn(false);
      }
    }
  }

  useEffect(() => {

  }, [on]);

  return (

    <Container onSubmit={handleSubmit}>
      <Head>
        Adicionar Associado
        <Image src={CancelIcon} onClick={cancelForm} />
      </Head>
      <Profile>

      <ProfileContainerImage>
          <ProfileAvatar>
            {(localImage1 || previousData.profilePic || localImage) ? (
              <img src={localImage?? localImage1 ?? previousData.profilePic} style={{ width: '115px', height: '115px', borderRadius: '100%' }} />
            ) : (
              <img src={PersonFilled.src} />
            )}
          
              <ProfileAvatarAddPicture>
                <Image src={AddPhotoIcon} onClick={triggerImagePopup} />
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
            {previousData.name}
          </ProfileTitle>
          <ProfileDescription>
            <strong>CPF:</strong> {previousData.cpf}
          </ProfileDescription>
        </ProfileArguments>

      </Profile>

      <Body>
        <Description>
          Passo 5 de 5
        </Description>
        <Main h={true}>
            <MainHead>
                <Text>
                    Para finalizar, defina se esse cadastro é de um associado comum ou de um administrador.
                </Text>
            </MainHead>

            <ContainerLabel>
                <Label>Esse usuário é um Administrador?<SpanLabel color={true}>*</SpanLabel></Label>
                          
                    <ContainerInputLabel>
                        <label for="sim"> 
                        <input type="radio" id="sim" name="admin" value={previousData.admin}  onChange={oneChangeRadio(true)} />
                        <SpanLabel margin={true}>Sim</SpanLabel>
                        </label>

                        <label for="nao"> 
                            <input type="radio" id="nao" name="admin" value={previousData.admin}  onChange={oneChangeRadio(false)}/>
                              <SpanLabel margin={true}>Não</SpanLabel>
                            </label>
                    </ContainerInputLabel>
            </ContainerLabel>
            
        </Main>
      </Body>
      <Footer>
        <Button variant={"text"} onClick={firstButton}>
          <Image src={LeftIcon} />
          VOLTAR
        </Button>
        <Button variant={"finalizCad"} onClick={() => {handleAddAssociate(verificaFile())}}>
          Finalizar cadastro
        </Button>
      </Footer>
      {globalMessage && <span style={{ color: 'red', fontWeight: 'bold' }}>{globalMessage}</span>}
    </Container >
  );
};

export default AdmStepForm;