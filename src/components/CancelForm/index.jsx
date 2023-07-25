import React from "react";
import { ButtonCancel, ButtonExcluir, CancelBox, CancelOptions, ContainerCancel, TextCancel, TitleCancel } from "./style";
import Trash from "../../assets/trashPerson.svg";
import Image from "next/image";
import Button from "../commom/Button";
import Associados from "../../pages/associados";


const CancelForm = ({cancelForm, associadoName, userRemove, urlAssociado}) => {
    return (
        <ContainerCancel>
            <CancelBox>
                <TitleCancel>
                    Excluir Associado
                </TitleCancel>

                <CancelOptions>
                    <Image src={Trash} width={'357.377px'} height={'200px'}/>
                    <TextCancel>Tem certeza que deseja excluir o associado {associadoName}?</TextCancel>
                </CancelOptions>

                <ButtonCancel>
                    <Button variant={'cancelRemove'} onClick = {cancelForm}>
                       Cancelar
                    </Button>
                    <Button variant={'remove'} onClick={() => userRemove(urlAssociado)}>
                        Excluir
                    </Button>
                </ButtonCancel>
            </CancelBox>
        </ContainerCancel>
    );
};


export default CancelForm;