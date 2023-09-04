import React from "react";
import { ButtonCancel, ButtonExcluir, CancelBox, CancelOptions, ContainerCancel, TextCancel, TitleCancel } from "../style";
import Trash from "../../../assets/trashPerson.svg";
import Image from "next/image";
import Button from "../../commom/Button";
import Associados from "../../../pages/associados";


const DeleteDependente = ({cancelForm, associadoName, dependenteNome, userRemove, urlDependente, toggleDataDependente}) => {
    return (
        <ContainerCancel>
            <CancelBox>
                <TitleCancel>
                    Excluir Dependente
                </TitleCancel>

                <CancelOptions>
                    <Image src={Trash} width={'357.377px'} height={'200px'}/>
                    <TextCancel>Tem certeza que deseja excluir o(a) dependente {dependenteNome} do associado {associadoName}?</TextCancel>
                </CancelOptions>

                <ButtonCancel>
                    <Button variant={'cancelRemove'} onClick = {cancelForm}>
                       Cancelar
                    </Button>
                    <Button variant={'remove'} onClick={() => {userRemove(urlDependente); cancelForm()}}>
                        Excluir
                    </Button>
                </ButtonCancel>
            </CancelBox>
        </ContainerCancel>
    );
};


export default DeleteDependente;