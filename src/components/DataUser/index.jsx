import React, { useState } from "react";
import { BoxData, ContainerButtons, ContainerData, ContainerDataUser, ContainerTable, ContainerWhite, LinkAtual, LinkPage, ProfileTitleUser, ProfileUser, TableAssociate, TextTable } from "./style";
import Pattern from "../../assets/pattern.svg";
import Arrow from "../../assets/arrow.svg";
import Image from "next/image";
import Button from "../commom/Button";
import { InputsContainer, Main, ProfileArguments, ProfileAvatar, ProfileAvatarAddPicture, ProfileContainerImage, ProfileDescription, ProfileTitle, SubContainer, SubTitle } from "../UserDataForm/styles";
import PersonFilled from "../../assets/person_filled.svg";
import AddPhotoIcon from "../../assets/icon_add_picture.svg";
import Trash from "../../assets/trash.svg";
import { TableHead } from "../commom/DataTable/styles";
import Input from "../commom/Input";
import ContainerDataUserPage from "../ContainerDataUserPage";




const DataUser = ({back, data}) => {

    const [selectedUser, setSelectedUser] = useState(true);
    const [selectedDependents, setSelectedDependents] = useState(false);
    const [containerToggle, setContainerToggle] = useState(true);
    const [edit, setEdit] = useState(false);

    const handleSelectUser = () => {
        setSelectedUser(true);
        setSelectedDependents(false);
    };

    const handleSelectDependents = () => {
        setSelectedUser(false);
        setSelectedDependents(true);
    };

    const handleContainerToggle = () => {
        setContainerToggle(!containerToggle);
    };

    const handleEdit = () => {
        setEdit(!edit);
    };

    const formatCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    return (
        <ContainerWhite>
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
                        <ContainerTable selected = {selectedUser}>
                             DADOS DO ASSOCIADO
                        </ContainerTable>
                    </TextTable>

                    <TextTable selected = {selectedDependents} onClick={handleSelectDependents}>
                        <ContainerTable selected = {selectedDependents}>
                            DEPENDENTES
                        </ContainerTable>
                    </TextTable>
                </TableAssociate>

                {containerToggle && (
                    <ContainerDataUserPage data={data} edit={edit}/>
                )}

                <ContainerButtons>
                    <Button variant='removeBut'>
                        <Image src={Trash} />
                        Excluir Associado
                    </Button>
                    <Button variant='editButton' onClick={handleEdit}>
                        EDITAR DADOS
                    </Button>
                </ContainerButtons>
                
            </BoxData>
        </ContainerWhite>
    );
};


export default DataUser;