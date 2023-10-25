import { Table, TableHead, TableBody, Associate, Name, Profession, Buttons, TableFooter, Text } from "./styles.js";

import EditIcon from "../../../assets/edit.svg";
import TrashIcon from "../../../assets/trash.svg";

import Image from "next/image.js";

import Paginator from "../Paginator";

import { useCallback, useEffect, useState } from "react";

const DataTable = ({ collectedData, filterAdm, searchTerm, headers, data, takeData, takeDataUser}) => {
    const [currentIndexes, setCurrentIndexes] = useState([0, 20]);
    const [currentAssociates, setCurrentAssociates] = useState(data.slice(currentIndexes[0], currentIndexes[1]));
    useEffect(() => {
        // Atualizar 'currentAssociates' sempre que 'data' ou 'currentIndexes' mudarem
        const updatedAssociates = data.slice(currentIndexes[0], currentIndexes[1]);
        setCurrentAssociates(updatedAssociates);
      }, [data, currentIndexes]);

    const paginate = useCallback((page) => {
        setCurrentIndexes((prev) => [prev[0] + page, prev[1] + page]);
        changeCurrentAssociates();
    }, [currentAssociates]);

    const changeCurrentAssociates = useCallback(() => {
        setCurrentAssociates(data.slice(currentIndexes[0], currentIndexes[1]));
    }, [currentAssociates, currentIndexes]);

    

 if (filterAdm !== undefined && filterAdm !== null && filterAdm !== "") {
    if (filterAdm){
        return (
            <Table>
            <TableHead>
                {headers.map((h) => <th>{h}</th>)}
            </TableHead>
            <TableBody>
                {data.filter((associate) => {
                  return associate.admin === true;
                }).map((d, i) => {
                    if (i % 2 == 0) {
                        return (
                            <Associate color={"blue"} key={d.cpf}>
                                <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                <Profession>{d.profissao}</Profession>
                                <Buttons>
                                    <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                    <Image src={TrashIcon} onClick={() => takeData(d)} />
                                </Buttons>
                            </Associate>
                        )
                    }
                    else {
                        return (
                            <Associate color={"white"} key={d.cpf}>
                                <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                <Profession>{d.profissao}</Profession>
                                <Buttons>
                                    <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                    <Image src={TrashIcon} onClick={() => takeData(d)} />
                                </Buttons>
                            </Associate>
                        )
                    }
                }
                )}
            </TableBody>
        </Table>
        )
    } else {
        return (
            <Table>
            <TableHead>
                {headers.map((h) => <th>{h}</th>)}
            </TableHead>
            <TableBody>
                {data.filter((associate) => {
                  return associate.admin === false;
                }).map((d, i) => {
                    if (i % 2 == 0) {
                        return (
                            <Associate color={"blue"} key={d.cpf}>
                                <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                <Profession>{d.profissao}</Profession>
                                <Buttons>
                                    <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                    <Image src={TrashIcon} onClick={() => takeData(d)} />
                                </Buttons>
                            </Associate>
                        )
                    }
                    else {
                        return (
                            <Associate color={"white"} key={d.cpf}>
                                <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                <Profession>{d.profissao}</Profession>
                                <Buttons>
                                    <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                    <Image src={TrashIcon} onClick={() => takeData(d)} />
                                </Buttons>
                            </Associate>
                        )
                    }
                }
                )}
            </TableBody>
        </Table>
        )
    }
    
 } else {
    if (searchTerm == "") {
        return (
            <Table>
                <TableHead>
                    {headers.map((h) => <th>{h}</th>)}
                </TableHead>
                <TableBody>
                    {currentAssociates.map((d, i) => {
                        if (i % 2 == 0) {
                            return (
                                <Associate color={"blue"} key={d.cpf}>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                        <Image src={TrashIcon} onClick={() => takeData(d)} />
                                    </Buttons>
                                </Associate>
                            )
                        }
                        else {
                            return (
                                <Associate color={"white"}>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                        <Image src={TrashIcon} onClick={() => takeData(d)}  />
                                    </Buttons>
                                </Associate>
                            )
                        }
                    }
                    )}
                </TableBody>
                <TableFooter>
                    <Text>
                        Exibindo {currentAssociates.length} resultados de {data.length}
                    </Text>
                    <Paginator previousDisabled={currentIndexes[0] == 0} nextDisabled={currentIndexes[0] + 20 > data.length} previousBlue={currentIndexes[0] !== 0} nextBlue={currentIndexes[1] + 20 <= data.length} totalQuantity={data.length} currentIndex={currentIndexes[0]} paginate={paginate} />
                </TableFooter>
            </Table>
        )
    } 
    else {
        return (
            <Table>
                <TableHead>
                    {headers.map((h) => <th>{h}</th>)}
                </TableHead>
                <TableBody>
                    {data.filter((associate) => {
                        if (
                            associate.name.toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return associate;
                        } else if (associate.cpf.startsWith(searchTerm)) {
                            return associate;
                        }
                    }).map((d, i) => {
                        if (i % 2 == 0) {
                            return (
                                <Associate color={"blue"} key={d.cpf}>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                        <Image src={TrashIcon} onClick={() => takeData(d)} />
                                    </Buttons>
                                </Associate>
                            )
                        }
                        else {
                            return (
                                <Associate color={"white"} key={d.cpf}>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} onClick={() => takeDataUser(d)}/>
                                        <Image src={TrashIcon} onClick={() => takeData(d)} />
                                    </Buttons>
                                </Associate>
                            )
                        }
                    }
                    )}
                </TableBody>
            </Table>
        )
    }
}
}

export default DataTable;