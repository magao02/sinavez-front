import React, { useEffect, useState } from "react";
import { ContainerButtons, ContainerDialogo, ContainerImage, ContainerPageDependents, Dependent, DependentsTitle } from "../style";
import Button from "../../commom/Button";
import AddIcon from "../../../assets/add_icon.svg";
import Place from "../../../assets/place.svg";
import Image from "next/image";

import EditIcon from "../../../assets/edit.svg";
import TrashIcon from "../../../assets/trash.svg";
import DarkBackground from "../../commom/DarkBackground";
import { Associate, Buttons, Name, Profession, Table, TableBody, TableHead } from "../../commom/DataTable/styles";

const ContainerDependents = ({startToggle, dataDependentes, headers, takeDataRemoveDependents, editting}) => {

    const [currentIndexes, setCurrentIndexes] = useState([0, 20]);
    const [currentDependents, setCurrentDependents] = useState(dataDependentes.slice(currentIndexes[0], currentIndexes[1]));

    useEffect(() => {
        // Atualizar 'currentAssociates' sempre que 'data' ou 'currentIndexes' mudarem
        const updatedDependent = dataDependentes.slice(currentIndexes[0], currentIndexes[1]);
        setCurrentDependents(updatedDependent);
      }, [dataDependentes, currentIndexes]);


    if (dataDependentes.length > 0){

        return (
            <>
                    <Table>
                        <TableHead marginTop={true} padding={true} gap={true} width={true}>
                            {headers.map((h) => <th>{h}</th>)}
                        </TableHead>
                        <TableBody>
                            {currentDependents.map((d, i) => {
                                if (i % 2 == 0) {// ajeite
                                    return (
                                        <Dependent color={"blue"} key={d.cpf}>
                                            <Name>{d.name}</Name>
                                            <Profession>{d.parentesco}</Profession>
                                            <Buttons>
                                                <Image src={EditIcon} onClick={() => editting(d)} />
                                                <Image src={TrashIcon} onClick={() => takeDataRemoveDependents(d.urlDep, d.name)}/>
                                            </Buttons>
                                        </Dependent>
                                    )
                                }
                                else {
                                    return (
                                        <Dependent color={"white"}>
                                            <Name>{d.name}</Name>
                                            <Profession>{d.parentesco}</Profession>
                                            <Buttons>
                                                <Image src={EditIcon} onClick={() => editting(d)} />
                                                <Image src={TrashIcon}  onClick={() => takeDataRemoveDependents(d.urlDep, d.name)}/>
                                            </Buttons>
                                        </Dependent>
                                    )
                                }
                            }
                            )}
                        </TableBody>
                    </Table>

                    <ContainerButtons margin={true}>
                        <Button variant={"default"} width={'300px'} onClick={startToggle}>
                                <Image src={AddIcon} />
                                ADICIONAR DEPENDENTE
                        </Button>
                    </ContainerButtons>
            </>
        )

    } else {

        return (
            <>
                <ContainerPageDependents>
                    <ContainerDialogo>
                        <DependentsTitle>
                            Este associado não possui nenhum dependente cadastrado no SINAVEZ.
                        </DependentsTitle>
                        <Button variant={"default"} width={'300px'} onClick={startToggle}>
                            <Image src={AddIcon} />
                            ADICIONAR DEPENDENTE
                        </Button>
                    </ContainerDialogo>

                    <ContainerImage>
                        <Image src={Place} />
                    </ContainerImage>
                </ContainerPageDependents>
            </>
        )
    }
};


export default ContainerDependents;