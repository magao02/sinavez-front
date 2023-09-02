import { Container, ContainerSelect, OpenedMenuBox, Select, Option, OptionContainer, ButtonArea, Button } from "./styles";
import filter from "../../../assets/filter.svg"
import { useState } from "react";

const SelectDropdown = ( ) => {

    const [showOptions , setShowOptions] = useState(false)
    const [text, setText] = useState("Filtrar Buscas")


    const handleClick = (text) => {
        setText(text)
        setShowOptions(!showOptions)
    }
    
    if(showOptions){
        return (
            <Select>
                <ContainerSelect onClick={() => setShowOptions(!showOptions)}>
                    <img src={filter.src}></img>
                    <span>{text}</span>
                </ContainerSelect>
                <OpenedMenuBox>
                    <OptionContainer>
                        <Option onClick={() => handleClick("Ocupados (neste mês)")}> Ocupados (neste mês)</Option>
                        <Option onClick={() => handleClick("Disponíveis (neste mês)")}> Disponíveis (neste mês)</Option>
                        <Option onClick={() => handleClick("Filtrar Buscas")} style={{justifyContent:"end", color: "#2473C3"}}>Limpar Filtro</Option>
                    </OptionContainer>
                </OpenedMenuBox>
            </Select>
        )
    }else{
        return (
            <Container onClick={() => setShowOptions(!showOptions)}>
                <img src={filter.src}></img>
                <span>{text}</span>
            </Container>
        )
    }

}


export default SelectDropdown;