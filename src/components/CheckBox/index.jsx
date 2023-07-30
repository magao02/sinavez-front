import { Container, CheckArea } from "./styles";
import CheckBoxInput from "../commom/CheckBoxInput";
import { useState } from "react";

const CheckBox = (showTrash) => {
    const [itens, setItens] =  useState([
        "Frigobar",
        "Armario",
        "Smart TV",
        "Travesseiro",
        "Lencol de Elastico",
        "Ferro de Passar",
        "Armador de rede",
        "Pratos, talheres e copos",
        "Ar condicionado"
    ])

    return (
        <Container>
            <CheckArea>
                <CheckBoxInput showTrash={showTrash} label={"Frigobar"} />
                <CheckBoxInput showTrash={showTrash} label={"Armario"} />
                <CheckBoxInput showTrash={showTrash} label={"Smart TV"} />
            </CheckArea>
            <CheckArea>
                <CheckBoxInput showTrash={showTrash} label={"Travesseiro"} />
                <CheckBoxInput showTrash={showTrash} label={"Lencol de Elastico"} />
                <CheckBoxInput showTrash={showTrash} label={"Ferro de passar"} />
            </CheckArea>
            <CheckArea border={"none"}>
                <CheckBoxInput showTrash={showTrash} label={"Armador de rede"} />
                <CheckBoxInput showTrash={showTrash} label={"Pratos, talheres e copos"} />
                <CheckBoxInput showTrash={showTrash} label={"Ar condicionado"} />
            </CheckArea>
        </Container>
    )
}

export default CheckBox;