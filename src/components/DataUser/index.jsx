import React, { useState } from "react";
import { AddDependent, AddDependentBox, BoxData, ContainerButtons, ContainerButtonsDependent, ContainerData, ContainerDataDependent, ContainerDataUser, ContainerImg, ContainerTable, ContainerWhite, Dependentes, LinkAtual, LinkPage, ProfileTitleUser, ProfileUser, TableAssociate, TextTable } from "./style";
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






const DataUser = ({back, data, cancelForm, urlUser, authContext, handleEditUser, dataCollector, addDependente}) => {

    const [selectedUser, setSelectedUser] = useState(true);
    const [selectedDependents, setSelectedDependents] = useState(false);
    const [containerToggle, setContainerToggle] = useState(true);
    const [containerToggleDependents, setContainerToggleDependents] = useState(false);
    const [edit, setEdit] = useState(false);

    const [dark, setDark] = useState(false);
    const [dataDependent, setDataDependent] = useState({});

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
        setDataDependent(data);
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
                                     <DependentsForm variant='default' marginTop={true} pad={true} takeDataDependents={takeDataDependents}/>
                                </Dependentes>     
                            </ContainerDataDependent>

                            <ContainerButtonsDependent>
                                <Button variant='dependente' onClick={toggleDark}>
                                   CANCELAR
                                </Button>
                                <Button variant='dependenteConcluir' onClick={() => addDependente(dataDependent, urlUser)}>
                                    CONCLUIR
                                </Button>
                            </ContainerButtonsDependent>
                        </AddDependent>
                    </AddDependentBox>
                </>
            )}

            <ContainerWhite>
                <ContainerImg>
                    <Image src={Pattern} />
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
                                <Image src={PersonFilled} />
                                <ProfileAvatarAddPicture>
                                <Image src={AddPhotoIcon} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                </ProfileAvatarAddPicture>
                            </ProfileAvatar>
                        </ProfileContainerImage>

                        <ProfileArguments padding={true}>
                            <ProfileTitleUser>
                                {data.name}
                            </ProfileTitleUser>
                            <ProfileDescription size={true}>
                                <strong>CPF:</strong> {formatCPF(data.cpf)}
                            </ProfileDescription>
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
                        <ContainerDataUserPage data={data} edit={edit} urlUser={urlUser} authContext={authContext} handleEdit={handleEdit} cancel={handleCancelEdit} cancelForm={cancelForm} back={back} handleEditUser={handleEditUser} dataCollector={dataCollector}/>
                        
                    )}

                    {containerToggleDependents && (
                        <>
                            <ContainerDependents startToggle={toggleDark} />
                        </>
                    )}

                
                    
                </BoxData>
            </ContainerWhite>
        </>
    );
};


export default DataUser;