import { Table, TableHead, TableBody, Associate, Name, TableFooter, Text, ImagemAssociado } from "./styles.js";

import Paginator from "../Paginator";
import CheckBoxReserv from "../CheckBoxReserv/index.jsx";
import { useCallback, useEffect, useState } from "react";

const AssociateTable = ({ 
    searchTerm,
    headers,
    data,
    takeDataUser,
    handleCheckboxChange,
    selectedItems 
}) => {
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
                                    <CheckBoxReserv
                                        showTrash={false}
                                        selectedItems={selectedItems}
                                        setCheckedItems={handleCheckboxChange}
                                        item={d}
                                    />
                                    <ImagemAssociado onClick={() => takeDataUser(d)}>
                                        <img src={d.profilePic}></img>
                                    </ImagemAssociado>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                </Associate>
                            )
                        }
                        else {
                            return (
                                <Associate color={"white"}>
                                    <CheckBoxReserv
                                        showTrash={false}
                                        selectedItems={selectedItems}
                                        setCheckedItems={handleCheckboxChange}
                                        item={d}
                                    />
                                    <ImagemAssociado onClick={() => takeDataUser(d)}>
                                        <img src={d.profilePic}></img>
                                    </ImagemAssociado>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
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
                                <Associate color={"blue"} key={d.cpf}>
                                     <CheckBoxReserv
                                        showTrash={false}
                                        selectedItems={selectedItems}
                                        setCheckedItems={handleCheckboxChange}
                                        item={d}
                                    />
                                    <ImagemAssociado onClick={() => takeDataUser(d)}>
                                        <img src={d.profilePic}></img>
                                    </ImagemAssociado>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
                                </Associate>
                            )
                        }
                        else {
                            return (
                                <Associate color={"blue"} key={d.cpf}>
                                    <CheckBoxReserv
                                        showTrash={false}
                                        selectedItems={selectedItems}
                                        setCheckedItems={handleCheckboxChange}
                                        item={d}
                                    />
                                    <ImagemAssociado onClick={() => takeDataUser(d)}>
                                        <img src={d.profilePic}></img>
                                    </ImagemAssociado>
                                    <Name onClick={() => takeDataUser(d)}>{d.name}</Name>
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

export default AssociateTable;
