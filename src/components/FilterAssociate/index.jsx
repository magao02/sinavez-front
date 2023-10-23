import { Container, ContainerSelect, OpenedMenuBox, Select, Option, OptionContainer, ButtonArea, Button } from "../commom/FilterDropdown/styles";
import filter from "../../assets/filter.svg"
import { useState } from "react";

const FilterAssociate = ( {filterUser}) => {

    const [showOptions , setShowOptions] = useState(false)
    const [text, setText] = useState("Filtrar Buscas")


    const handleClick = (text, value) => {
        setText(text)
        filterUser(value)
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
                        <Option onClick={() => handleClick("Associados", "associados" )}> Associados</Option>
                        <Option onClick={() => handleClick("Administradores", "admin")}> Administradores</Option>
                        <Option onClick={() => handleClick("Filtrar Buscas", "")} style={{justifyContent:"end", color: "#2473C3"}}>Limpar Filtro</Option>
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


export default FilterAssociate;