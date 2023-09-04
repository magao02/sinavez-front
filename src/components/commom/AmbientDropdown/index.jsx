import { Container, ContainerSelect, OpenedMenuBox, Select, Option, OptionContainer } from "./styles";
import  arrow_down from "../../../assets/arrow_down.svg"
import  arrow_up from "../../../assets/arrow_up.svg"
import  plus_icon from "../../../assets/plus_icon.svg"
import { useState } from "react";
import { useRouter } from "next/router";

export const AmbientDropdown = () => {
    const [showOptions , setShowOptions] = useState(false)
    const [text, setText] = useState("ADICIONAR AMBIENTE")

    const router = useRouter();


    const handleClick = (page) => {
        setShowOptions(!showOptions)
        if(page == "apartment"){
            router.push("/createApartment")
        }else{
            router.push("/createRecreationArea")
        }
    }
    
    if(showOptions){
        return (
            <Select>
                <ContainerSelect onClick={() => setShowOptions(!showOptions)}>
                    <img src={arrow_up.src}></img>
                    <span>{text}</span>
                </ContainerSelect>
                <OpenedMenuBox>
                    <OptionContainer>
                        <Option onClick={() => handleClick("apartment")}>
                            <img src={plus_icon.src}></img>
                             Apartamento
                        </Option>
                        <Option onClick={() => handleClick("recreationArea")}>
                            <img src={plus_icon.src}></img>
                            Área de Lazer 
                        </Option>
                    </OptionContainer>
                </OpenedMenuBox>
            </Select>
        )
    }else{
        return (
            <Container onClick={() => setShowOptions(!showOptions)}>
                <img src={arrow_down.src}></img>
                <span>{text}</span>
            </Container>
        )
    }
}

export default AmbientDropdown;