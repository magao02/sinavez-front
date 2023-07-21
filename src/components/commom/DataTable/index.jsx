import { Table, TableHead, TableBody, Associate, Name, Profession, Buttons, TableFooter, Text } from "./styles.js";

import EditIcon from "../../../assets/edit.svg";
import TrashIcon from "../../../assets/trash.svg";

import Image from "next/image.js";

import Paginator from "../Paginator";

import { useCallback, useEffect, useState } from "react";

const DataTable = ({ searchTerm, headers, data, userRemove}) => {
    /*     <DataTable nextAssociates={() => currentIndexes[0] + 20 <= associados.length ? changeAssociates(true) : undefined} previousAssociates={() => currentIndexes[0] > 0 ? changeAssociates(false) : undefined} currentIndex={currentIndexes[0]} totalQuantity={associados.length} searchTerm={searchTerm} headers={["Associado", "Profissão"]} data={currentAssociados.map((associado) => [associado[1].name, associado[1].profissao, associado[1].cpf])} totalData={associados.map((associado) => [associado.name, associado.profissao, associado.cpf])} paginate={paginate} />
    

        const paginate = useCallback((page) => {
            setCurrentIndexes(prev => [prev[0] + page * 20, prev[0] + page * 20]);
            sliceData();
        }, [])
    
        const sliceData = () => {
            setCurrentAssociados(Object.entries(associados).slice(currentIndexes[0], currentIndexes[1]));
        };
    
        const changeAssociates = (next) => {
            if (next) {
                setCurrentIndexes(prev => [prev[0] + 20, prev[1] + 20]);
            } else {
                setCurrentIndexes(prev => [prev[0] - 20, prev[1] - 20]);
            }
            sliceData();
        };
    
        const [currentIndexes, setCurrentIndexes] = useState([0, 20]);
        */
    const [currentIndexes, setCurrentIndexes] = useState([0, 20]);
    const [currentAssociates, setCurrentAssociates] = useState(data.slice(currentIndexes[0], currentIndexes[1]));

    const paginate = useCallback((page) => {
        setCurrentIndexes((prev) => [prev[0] + page, prev[1] + page]);
        changeCurrentAssociates();
    }, [currentAssociates]);

    const changeCurrentAssociates = useCallback(() => {
        setCurrentAssociates(data.slice(currentIndexes[0], currentIndexes[1]));
    }, [currentAssociates, currentIndexes]);

    useEffect(() => {
        changeCurrentAssociates();
    }, [currentIndexes]);

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
                                <Associate color={"blue"}>
                                    <Name>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} />
                                        <Image src={TrashIcon} onClick={() => userRemove(d.cpf)} />
                                    </Buttons>
                                </Associate>
                            )
                        }
                        else {
                            return (
                                <Associate color={"white"}>
                                    <Name>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} />
                                        <Image src={TrashIcon} onClick={() => userRemove(d.cpf)}  />
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
    } else {
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
                                <Associate color={"blue"}>
                                    <Name>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} />
                                        <Image src={TrashIcon} onClick={() => userRemove(d.cpf)} />
                                    </Buttons>
                                </Associate>
                            )
                        }
                        else {
                            return (
                                <Associate color={"white"}>
                                    <Name>{d.name}</Name>
                                    <Profession>{d.profissao}</Profession>
                                    <Buttons>
                                        <Image src={EditIcon} />
                                        <Image src={TrashIcon} onClick={() => userRemove(d.cpf)} />
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

export default DataTable;