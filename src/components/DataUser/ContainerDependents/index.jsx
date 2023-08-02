import React from "react";
import { ContainerDialogo, ContainerImage, ContainerPageDependents, DependentsTitle } from "../style";
import Button from "../../commom/Button";
import AddIcon from "../../../assets/add_icon.svg";
import Place from "../../../assets/place.svg";
import Image from "next/image";

const ContainerDependents = () => {

    return (
        <ContainerPageDependents>
            <ContainerDialogo>
                <DependentsTitle>
                    Este associado não possui nenhum dependente cadastrado no SINAVEZ.
                </DependentsTitle>
                <Button variant={"default"} width={'300px'}>
                    <Image src={AddIcon} />
                    ADICIONAR DEPENDENTE
                </Button>
            </ContainerDialogo>

            <ContainerImage>
                <Image src={Place} />
            </ContainerImage>
        </ContainerPageDependents>
    )
};


export default ContainerDependents;