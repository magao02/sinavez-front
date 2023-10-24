import { useRouter } from "next/router";

import { useState, useCallback, useEffect, useRef } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { useAdmin } from "../../contexts/AdminContext";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import DataTable from "../../components/commom/DataTable";
import Button from "../../components/commom/Button";
import SearchBar from "../../components/commom/SearchBar";
import DarkBackground from "../../components/commom/DarkBackground"
import FirstStepForm from "../../components/UserDataForm/FirstStep";
import SecondStepForm from "../../components/UserDataForm/SecondStep";
import ThirdStepForm from "../../components/UserDataForm/ThirdStep";
import DependentsContainer from "../../components/DependentsContainer";

import X from "../../assets/x.svg";
import Sucess from "../../assets/sucess.svg";

import Pattern from "../../assets/pattern.svg"
import AddIcon from "../../assets/add_icon.svg";

import Image from "next/image";

import {
  Container,
  Main,
  Title,
  MainContainer,
  MainHead,
  AddAssociateBox
} from "../../styles/associadosStyles";
import CancelForm from "../../components/CancelForm";
import DataUser from "../../components/DataUser";
import MiddleStep from "../../components/UserDataForm/MiddleStep";
import { Card, ToggleCard } from "../../styles/homeStyles";
import { ButtonCancel, CancelBox, CancelOptions, TextCancel, TitleCancel } from "../../components/CancelForm/style";

const Associados = () => {
  const [associados, setAssociados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [admToggle, setAdmToggle] = useState(false);
  const [addAssociateToggle, setAddAssociateToggle] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [userDependents, setUserDependents] = useState([]);

  const [associadoData, setAssociadoData] = useState([]);
  const [removeAssociateToggle, setRemoveAssociateToggle] = useState();
  const [dataUserToggle, setDataUserToggle] = useState();

  const [dataUser, setDataUser] = useState();
  const [newDataUser, setNewDataUser] = useState();

  const [associadoName, setAssociadoName] = useState();
  const [urlUser, setUrlUser] = useState();

  const [globalMessage, setGlobalMessage] = useState();
  const [collectedData, setCollectedData] = useState({});

  const [image, setImage] = useState(null);
  const file = useRef(null);

  const [perfilImage, setPerfilImage] = useState(null);
  const [toggleAdd, setToggleAdd] = useState(false);
  const router = useRouter();

  const authContext = useAuth();
  const adminContext = useAdmin();

  // Toggle para abrir e fechar o modal de adicionar associado
  const toggleAddAssociate = useCallback(() => {
    setAddAssociateToggle((p) => !p);
  }, []);

  // Toggle para abrir e fechar o modal de remover associado
  const toggleRemoveAssociate = useCallback(() => {
    setRemoveAssociateToggle((p) => !p);
  }, []);

  // Toggle para abrir e fechar o modal da tela de dados do usuário
  const toggleDataUser = useCallback(() => {
    setDataUserToggle((p) => !p);

  }, []);

  const showFinishCad = useCallback(() => {
    setToggleAdd((p) => !p);
  });

  const yearsController = (data, yearVariant) => {
    setYears({ toggle: true });
    setYearVariant(yearVariant);
    setDataToSubmit(data);
  }


  //  coletando dados do usuário
  const dataCollector = (data) => {
    setCollectedData({ ...collectedData, ...data });
    nextStepAddAssociate();
  };

  const saveImage = useCallback(async (fileInput, urlUser) => {
    try {
      const temporaryFile = dataURLtoFile(fileInput, "temp_image.png");
    
    // Chama a função de serviço com o arquivo temporário
      await service.setPhoto(temporaryFile, urlUser, authContext.token);
    } catch (error) {
      console.log(error)
      console.log("Erro ao salvar imagem");
    }

  });

  function dataURLtoFile(dataURL, filename) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }
  

  const takeImage = (localImage) => {
    setImage(localImage);
  };

  // adicionando usuário
  const handleAddAssociate = useCallback(async (image) => {
    try {
      const addAssociateResponse = await service.signUp(collectedData);
      setAssociados((p) => [...p, addAssociateResponse.data.user]);
      const url = addAssociateResponse.data.user.urlUser;
      console.log(collectedData);
      
      if (collectedData.dependentes != undefined && collectedData.dependentes.length !== 0) {
        console.log(collectedData.dependentes)
        collectedData.dependentes.map((data) => {
          addDependente(data, addAssociateResponse.data.user.urlUser);
        });
      }

      if (image) {
        saveImage(image, url);
        console.log("enviou")
      };

      toggleAddAssociate();
      setCollectedData({});
      setCurrentStep(1);
      setToggleAdd((p) => !p);

    } catch (error) {
      setCurrentStep(1);
      console.log(error)
      
      //setGlobalMessage(error.response.data.message);
      
      console.log("deu erro")
    }
  }, [associados, collectedData]);
  

  // pega dos dados do usuário
  const takeData = useCallback((data) => {
    setRemoveAssociateToggle((p) => !p);
    setAssociadoName(data.name);
    setUrlUser(data.urlUser);
  }, []);

  const dataDependents = (data) => {
    setUserDependents(data);
  };

  // pega dos dados do usuário
  const takeDataUser = useCallback(async (data) => {
    try {
      const dataUserResponse = await service.getUserData(data.urlUser, authContext.token);
      setDataUser(dataUserResponse.data);
      setUrlUser(data.urlUser);
      setAssociadoName(data.name);
      setPerfilImage(dataUserResponse.data.profilePic)
      setDataUserToggle((p) => !p);
      console.log(dataUserResponse.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  });


  // editando dados do usuário
  const handleEditUser = useCallback(async (dataNova, urlUser) => {
    try {
      const editResponse = await service.setUserData(urlUser, dataNova, authContext.token);

      if (dataNova.name !== undefined) {
        associados.map((associado) => {
          if (associado.urlUser == urlUser) {
            associado.name = dataNova.name;
          }
        });
      }

      if (dataNova.profissao !== undefined) {
        associados.map((associado) => {
          if (associado.urlUser == urlUser) {
            associado.profissao = dataNova.profissao;
          }
        });
      }
      setDataUser(prevDataUser => ({
        ...prevDataUser,
        ...dataNova
      }));
    } catch (error) {
      console.log("Deu erro");
    }
  }, [associados, dataUser]);


  const handleErrorAssociados = useCallback(
    async (error) => {
      if (
        error.response.data.message ==
        "Usuário sem permissão de visualizar os assessores."
      ) {
        router.push("/usuario");
      }
    },
    [router]
  );

  // fechando modal de dados do usuário
  const closer = useCallback(() => {
    setDataUserToggle(false);
  });

  // pegando dados dos associados
  const getAssociados = useCallback(async () => {
    try {
      const associadosResponse = await service.getAssociados(authContext.token);
      setAssociados(associadosResponse.data);
    } catch (error) {
      await handleErrorAssociados(error);
    }
  }, [authContext.token, handleErrorAssociados]);


  // removendo usuário
  const userRemove = useCallback(async (userUrl) => {
    try {
      const removeUserResponse = await service.removeUser(userUrl, authContext.token);
      setAssociados((p) => p.filter((associado) => associado.urlUser !== userUrl));
      toggleRemoveAssociate();

      { dataUserToggle ? toggleDataUser() : null };

    } catch (error) {
      console.log("Erro ao remover usuario:", error.response.data.message);
      setAssociados((p) => [...p]);
    }
  }, [associados]);

  // adionar dependente
  const addDependente = useCallback(async (data, urlAssociado) => {
    try {
      const addDependentResponse = await service.addDependent(data, urlAssociado, authContext.token);
      console.log(addDependentResponse.data);

    } catch (error) {
      console.log(error.response.data.message);
    }

    console.log(data);
  });

  // remover dependente
  const removeDependente = useCallback(async (urlDependente) => {
    try {
      const removeDependentResponse = await service.removeDependent(authContext.token, urlDependente);
      console.log(removeDependentResponse.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  });


  const editUserData = useCallback(async (data) => {
    setUrlUserEdit(data.urlUser);
    localStorage.setItem('urlAssociado', data.urlUser)
    router.push("/redefinir", data.userUrl);
  });

  const viewProfile = useCallback(async (data) => {
    console.log(data.urlUser);
  });

  const checkNav = () => {
    if (authContext.admin == "true" || authContext.admin == true) {
      return "admin";
    } else {
      return "logged";
    }
  };



  const nextStepAddAssociate = useCallback(() => {
    setCurrentStep((p) => ++p);
  }, []);

  const previousStepAddAssociate = useCallback(() => {
    setCurrentStep((p) => --p);
  }, []);


  useEffect(() => {
    getAssociados();
    if (!authContext.auth) {
      router.push("/login");
      return;
    } else if (!authContext.admin) {
      router.push("/login");
      return;
    } else if (associados !== undefined) {
      return;
    }
  }, []);


  return (
    <Container>
      <Navigation selectedPage={"associados"} variant={checkNav()} />
      {addAssociateToggle && (
        <>
          <DarkBackground pageHeight={"200vh"} />
          <AddAssociateBox>
            {currentStep == 1 && (
              <FirstStepForm previousData={collectedData} takeImage={takeImage} globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} />
            )}
            {currentStep == 2 && (
              <SecondStepForm previousData={collectedData} file={file} takeImage={takeImage} image={image}globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} firstButton={previousStepAddAssociate} />
            )}
            {currentStep == 3 && (
             <MiddleStep previousData={collectedData} file={file} takeImage={takeImage} image={image}globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} firstButton={previousStepAddAssociate}/>
            )}
            {currentStep >= 4 && (
               <ThirdStepForm  saveImage={saveImage}previousData={collectedData} file={file} image={image} globalMessage={globalMessage} title={"Adicionar Associado"} dataCollector={dataCollector} cancelForm={toggleAddAssociate} firstButton={previousStepAddAssociate} handleAddAssociate={handleAddAssociate} dataDependents={dataDependents} />
            )}
          </AddAssociateBox>
        </>
      )}
      {associados && (
        <>

          <MainContainer>
            <Title>
              Gerenciar associados
            </Title>
            <MainHead>
              <SearchBar setSearch={setSearchTerm} placeHolder={"Procurar pelo nome"}></SearchBar>
              <Button variant={"default"} onClick={toggleAddAssociate}>
                <Image src={AddIcon} />
                Adicionar Associado
              </Button>
            </MainHead>
            <Main>
              <DataTable searchTerm={searchTerm} headers={["Associado", "Profissão"]} data={associados} takeData={takeData} takeDataUser={takeDataUser} />
            </Main>

          </MainContainer>
          {removeAssociateToggle && (
            <>
              <DarkBackground pageHeight={"170vh"} zIndex={true} />
              <CancelForm cancelForm={toggleRemoveAssociate} associadoName={associadoName} userRemove={userRemove} urlAssociado={urlUser} toggleDataUser={closer} />
            </>
          )}

          {dataUserToggle && (
            <>
              <DataUser
                back={toggleDataUser}
                data={dataUser}
                cancelForm={toggleRemoveAssociate}
                urlUser={urlUser}
                authContext={authContext}
                handleEditUser={handleEditUser}
                dataCollector={dataCollector}
                addDependente={addDependente}
                removeDependente={removeDependente}
                perfilImage={perfilImage}
              />
            </>
          )}
        </>
      )}

    {toggleAdd && (
      <>
      <ToggleCard/>
        <Card alt={true}>
          <CancelBox>
            <TitleCancel>Sucesso</TitleCancel>

              <CancelOptions>
                    <Image src={Sucess} width={'357.377px'} height={'200px'}/>
                    <TextCancel>
                      Pré-cadastro realizado com sucesso! <br/>
                      {collectedData.name} agora está na lista de associados.
                    </TextCancel>
                    
                  </CancelOptions>

                  <ButtonCancel>
                    <Button variant={'cancelRemove'} onClick={showFinishCad}>
                       <Image src={X}/>
                       SAIR
                    </Button>
                  </ButtonCancel>
                </CancelBox>
            </Card>
      </>
    )}
    </Container>
  );
};

export default Associados;
