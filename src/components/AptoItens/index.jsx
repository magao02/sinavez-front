import { Container, Header, EditButton, AddItemArea, AddButton, CheckBoxArea } from "./styles";
import edit_pen from "../../assets/edit_pen.svg"
import Image from "next/image";
import Input from "../commom/Input";
import CheckBox from "../CheckBox";
import { useState } from "react";
import ConfirmButtons from "../commom/ConfirmButtons"


const AptoItens = ({title}) => {
    const [edit, setEdit] = useState(false)
    const [newItem, setNewItem] = useState("");

    return (
        <Container>
            <Header>
                <h3>{title}</h3>
                <EditButton onClick={() => setEdit(!edit)}><Image src={edit_pen}/></EditButton>
            </Header>
            <CheckBoxArea>
                <CheckBox showTrash={edit}></CheckBox>
            </CheckBoxArea>
            <AddItemArea>
                <Input
                    type="text"
                    placeholder="Novo Item"
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <AddButton>+ ADICIONAR</AddButton>
            </AddItemArea>
                {edit && 
                    <ConfirmButtons></ConfirmButtons>
                }
        </Container>
    )
}

export default AptoItens;