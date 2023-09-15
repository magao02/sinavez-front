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

const ThirdStep = ({file, saveImage, image, previousData, dataCollector, firstButton, globalMessage, cancelForm, handleAddAssociate }) => {

  const [dataDependent, setDataDependent] = useState([]);

  const [newData, setNewData] = useState({});

  const takeDataDependents = (data) => {
    setDataDependent((prevDataDependent) => prevDataDependent.concat(data));
  };

  const [countDependents, setCountDependents] = useState(0);

  const [localImage1, setLocalImage1] = useState(image);
  const [localImage, setLocalImage] = useState(null);


const takeNewData = (data) => {
  setNewData(data);
}; 


  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    dataCollector({
      dependentes: dataDependent,
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

  const handleAddMoreDependents = () => {
    setCountDependents(countDependents + 1);
    //setDependents([...dependents, dataDependent]);
    //dataDependents(dependents);
    //console.log(dependents);
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

            <DependentsForm 
              takeNewData={takeNewData} 
              variant="default" 
              submitForm={dataCollector} 
              previousData={previousData} 
              takeDataDependents={takeDataDependents}
              number={countDependents}
              />
              {[...Array(countDependents)].map((_, index) => (
              <DependentsForm
                key={index} 
                takeNewData={takeNewData} 
                variant="default" 
                number={index + 2} 
                marginTop={true} 
                previousData={previousData} 
                takeDataDependents={takeDataDependents}/>
            ))}

            <Footer>
              <Button variant={"default"} width={'280px'} height={'45px'} marginTop={"15px"} onClick={handleAddMoreDependents}>
                <Image src={AddIcon} /> 
                Adicionar Dependente
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
        <Button variant={"default"} onClick={() => {handleAddAssociate(verificaFile())}}>
          Finalizar cadastro
        </Button>
      </Footer>
      {globalMessage && <span style={{ color: 'red', fontWeight: 'bold' }}>{globalMessage}</span>}
    </Container >
  );
};

export default ThirdStep;