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

const ThirdStep = ({ previousData, dataCollector, firstButton, globalMessage, cancelForm, handleAddAssociate }) => {

  const [dataDependent, setDataDependent] = useState([]);

  const [newData, setNewData] = useState({});

  const takeDataDependents = (data) => {
    setDataDependent((prevDataDependent) => prevDataDependent.concat(data));
  };

  const [countDependents, setCountDependents] = useState(0);



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

  const handleAddMoreDependents = () => {
    setCountDependents(countDependents + 1);
    //setDependents([...dependents, dataDependent]);
    //dataDependents(dependents);
    //console.log(dependents);
  };

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
        <Button variant={"default"} onClick={handleAddAssociate}>
          Finalizar cadastro
        </Button>
      </Footer>
      {globalMessage && <span style={{ color: 'red', fontWeight: 'bold' }}>{globalMessage}</span>}
    </Container >
  );
};

export default ThirdStep;