import React, { useCallback, useEffect, useRef, useState } from "react";
import { AddDependent, AddDependentBox, BoxData, ContainerButtons, ContainerButtonsDependent, ContainerData, ContainerDataDependent, ContainerDataUser, ContainerImg, ContainerTable, ContainerWhite, Dependentes, DivAdm, LinkAtual, LinkPage, ProfileTitleUser, ProfileUser, SpanPedding, TableAssociate, TextTable } from "./style";
import Pattern from "../../assets/pattern.svg";
import Arrow from "../../assets/arrow.svg";
import Image from "next/image";
import Button from "../commom/Button";
import { Head, InputsContainer, Main, MainHead, ProfileArguments, ProfileAvatar, ProfileAvatarAddPicture, ProfileContainerImage, ProfileDescription, ProfileTitle, SubContainer, SubTitle } from "../UserDataForm/styles";
import PersonFilled from "../../assets/person_filled.svg";
import AddPhotoIcon from "../../assets/icon_add_picture.svg";
import CancelIcon from "../../assets/cancel_icon.svg";
import { TableHead, Text } from "../commom/DataTable/styles";
import Input from "../commom/Input";
import ContainerDataUserPage from "./ContainerDataUserPage";
import ContainerDependents from "./ContainerDependents";
import DarkBackground from "../commom/DarkBackground";
import DependentsForm from "../DependentsContainer";
import * as service from "../../services/accounts";
import DeleteDependente from "../CancelForm/DeleteDependente";
import { useAuth } from "../../contexts/AuthContext";






const DataUser = ({perfilImage, back, data, cancelForm, urlUser, authContext, handleEditUser, dataCollector, addDependente, removeDependente}) => {

    const [selectedUser, setSelectedUser] = useState(true);
    const [selectedDependents, setSelectedDependents] = useState(false);
    const [containerToggle, setContainerToggle] = useState(true);
    const [containerToggleDependents, setContainerToggleDependents] = useState(false);
    const [edit, setEdit] = useState(false);
    const [listDependents, setListDependents] = useState(false);

    const [editDependents, setEditDependents] = useState(false);
    const [removeDependents, setRemoveDependents] = useState(false);
    const [newData, setNewData] = useState([]);

    const [nomeDependente, setNomeDependente] = useState();
    const [urlDependente, setUrlDependente] = useState();
    const [dadosOnlyDependent, setDadosOnlyDependent] = useState();

    const [dark, setDark] = useState(false);
    const [dataDependentes, setDataDependentes] = useState([]);
    const [dataD, setDataD] = useState();

    const fileInput = useRef(null);
    const [localImage, setLocalImage] = useState(null); 

    const authContex = useAuth();


    const saveImage = useCallback(async(fileInput)  => {
        if (fileInput && fileInput.current && fileInput.current.files.length > 0) {
            try{
                await service.setPhoto(fileInput.current.files[0], urlUser, authContext.token);
            } catch (error) {
                console.log("Erro ao salvar imagem");
            }
    }
    },[urlUser, authContext.token]);

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

    const toggleDark = () => {
        setDark(!dark);
    };

    const handleSelectUser = () => {
        setSelectedUser(true);
        setSelectedDependents(false);
    };

    const handleSelectDependents = () => {
        if (edit){
            setSelectedUser(true);
            setSelectedDependents(false);
        } else {
            setSelectedUser(false);
            setSelectedDependents(true);
        }  
    };

    const handleContainerToggle = (user) => {
        if (user == 'associado'){
            setContainerToggle(true);
            setContainerToggleDependents(false);
        } else {
            if (edit){
                setContainerToggle(true);
                setContainerToggleDependents(false);
            } else {
                setContainerToggle(false);
                setContainerToggleDependents(true);
            }  
        }
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleCancelEdit = () => {
        setEdit(false);
    };

    const formatCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    const takeDataDependents = (data) => {
        setDataD(data);
    };

    const cancelToggle = () => {
        setRemoveDependents(false);
    };

    const toggleDeleteDependents = () => {
        setRemoveDependents(true);
    };

    const handleFinish = () => {
        addDependente(dataD, urlUser);  
        toggleDark();
    };

    const editting = (data) => {
        setEditDependents(!editDependents);
        setDadosOnlyDependent(data);
    };

    const closeEditDependents = () => {
        setEditDependents(false);
    };

    const getDependents = useCallback(async() => {
        try {
            const responseDependentes = await service.getDependents(urlUser, authContext.token);
            setDataDependentes(responseDependentes.data);
        } catch (error) {
            console.log(error);
        }

    }, [dataDependentes]);

    const editDependente = useCallback((urlDependent, data) => {
        try {
           const editDependentResponse = service.updateDependent(data, urlDependent, authContext.token);
           console.log(editDependentResponse.data);
         } catch (error) {
           console.log(error.response.data.message);
         }
       }, [])

    const editouDependente = useCallback(() => {
        const updatedData = {
            ...dadosOnlyDependent, // Mantém os valores não alterados
            ...newData // Aplica as alterações
          };
        editDependente(dadosOnlyDependent.urlDep, updatedData);
        closeEditDependents();
    }, [newData]);
 // akeitar pois não está editando nada
    useEffect(() => {
        getDependents();
      }, [getDependents]);

    const takeDataRemoveDependents = (urlDependent, nome) => {
        setNomeDependente(nome);
        setUrlDependente(urlDependent);
        toggleDeleteDependents();
    };
    const takeNewData = (data) => {
        setNewData(data);
    }; 

    return (
        <>  

            {dark && (
                <>
                    <DarkBackground pageHeight={"180vh"} zIndex={true}/>
                    <AddDependentBox>
                        <AddDependent>
                            <Head grid={true} width={true} marginLeft={true} margin={true}>
                                Adicionar Dependente
                                <Image src={CancelIcon} onClick={toggleDark}/>
                            </Head> 

                            <ContainerDataDependent>
                                <Dependentes>
                                     <DependentsForm variant='default' marginTop={true} pad={true} takeNewData={takeNewData} takeDataDependents={takeDataDependents}/>
                                </Dependentes>     
                            </ContainerDataDependent>

                            <ContainerButtonsDependent>
                                <Button variant='dependente' onClick={toggleDark}>
                                   CANCELAR
                                </Button>
                                <Button variant='dependenteConcluir' onClick={handleFinish}>
                                    CONCLUIR
                                </Button>
                            </ContainerButtonsDependent>
                        </AddDependent>
                    </AddDependentBox>
                </>
            )}

            <ContainerWhite>
                <ContainerImg>
                    <img src={Pattern.src} />
                </ContainerImg>
            
                <BoxData>

                    <LinkPage>
                        <Button variant='buttonBasic' onClick={back}>
                            <Image src={Arrow}></Image>
                        </Button>
                        <Button variant='buttonBasic' onClick={back}>
                            Voltar para a página anterior
                        </Button>
                        <p> / </p>
                        <LinkAtual>Dados do associado</LinkAtual>
                    </LinkPage>

                    <ProfileUser>
                        <ProfileContainerImage>
                            <ProfileAvatar>
                                {(localImage || perfilImage) ? (
                                    <img src={localImage ?? perfilImage}style={{ width: '115px', height: '115px', borderRadius: '100%' }}/>
                                    ) : (
                                    <img src={PersonFilled.src}/>
                                    )}
                                {edit && (
                                    <ProfileAvatarAddPicture>
                                        <Image src={AddPhotoIcon} onClick={triggerImagePopup}/>
                                        <input
                                            type="file" 
                                            accept="image/*" 
                                            ref={fileInput} 
                                            onChange={onImageInputChange}
                                            style={{ display: 'none' }}
                                        />
                                    </ProfileAvatarAddPicture>
                                )}         
                            </ProfileAvatar>
                        </ProfileContainerImage>

                        <ProfileArguments padding={true}>
                            <ProfileTitleUser>
                                {data.name}
                            </ProfileTitleUser>
                            <ProfileDescription size={true}>
                                <strong>CPF:</strong> {formatCPF(data.cpf)}
                            </ProfileDescription>
                            {data.admin && (
                                <>
                                    <DivAdm>Administrador</DivAdm>
                                </>
                            )}
                            {authContex.isPendingSignUp && (
                            <SpanPedding>Esse usuário ainda não completou o cadastro de seus dados</SpanPedding>
                            )}
                        </ProfileArguments>
                    </ProfileUser>

                    <TableAssociate>
                        <TextTable selected = {selectedUser} onClick={handleSelectUser}>
                            <ContainerTable selected = {selectedUser} onClick={() => handleContainerToggle('associado')}>
                                DADOS DO ASSOCIADO
                            </ContainerTable>
                        </TextTable>

                        <TextTable selected = {selectedDependents} onClick={handleSelectDependents}>
                            <ContainerTable selected = {selectedDependents} onClick={() => handleContainerToggle('dependente')}>
                                DEPENDENTES
                            </ContainerTable>
                        </TextTable>
                    </TableAssociate>

                    {containerToggle && (
                        <ContainerDataUserPage file={fileInput} saveImage={saveImage} data={data} edit={edit} urlUser={urlUser} authContext={authContext} handleEdit={handleEdit} cancel={handleCancelEdit} cancelForm={cancelForm} back={back} handleEditUser={handleEditUser} dataCollector={dataCollector}/>
                        
                    )}

                    
                    {containerToggleDependents && (
                        <>
                            <ContainerDependents editting={editting} startToggle={toggleDark} dataDependentes={dataDependentes}  headers={["Dependente", "Parentesco"]} takeDataRemoveDependents={takeDataRemoveDependents} cancelForm={cancelForm}/>
                        </>
                        )}

                    
                </BoxData>
            </ContainerWhite>

            {removeDependents && (
                <>
                    <DarkBackground pageHeight={"180vh"} zIndex={true}/>
                    <DeleteDependente cancelForm={cancelToggle} associadoName={data.name} dependenteNome={nomeDependente} urlDependente={urlDependente} userRemove={removeDependente}/>
                </>
            )}

            {editDependents && (
                <>
                    <DarkBackground pageHeight={"180vh"} zIndex={true}/>
                    <AddDependentBox>
                        <AddDependent>
                            <Head grid={true} width={true} marginLeft={true} margin={true}>
                                Editar Dados
                                <Image src={CancelIcon} onClick={closeEditDependents}/>
                            </Head> 

                            <ContainerDataDependent>
                                <Dependentes>
                                     <DependentsForm variant='default' takeNewData={takeNewData} marginTop={true} pad={true} takeDataDependents={takeDataDependents} editDependents={editDependents} dadosDep={dadosOnlyDependent}/>
                                </Dependentes>     
                            </ContainerDataDependent>

                            <ContainerButtonsDependent>
                                <Button variant='dependente' onClick={closeEditDependents}>
                                   CANCELAR
                                </Button>
                                <Button variant='dependenteConcluir' onClick={editouDependente}>
                                    CONCLUIR
                                </Button>
                            </ContainerButtonsDependent>
                        </AddDependent>
                    </AddDependentBox>
                </>
            )}
        </>
    );
};


export default DataUser;