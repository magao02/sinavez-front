import { Container, DeleteBedButton, Select, } from "./styles"
import Input from "../commom/Input";
import trash from "../../assets/trash.svg";
import Image from "next/image";
import { useState } from "react";


const CamaInput = ( {id, deleteCama, handleCama, option, value}) => {

    const [inputValue, setInputValue] = useState();

    const handleSelected = () => {
        const options = document.getElementsByTagName("option")
    
        // Percorre todas as opções para definir o atributo "selected" conforme o valor selecionado
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === option) {
            options[i].setAttribute('selected', 'selected');
          } else {
            options[i].removeAttribute('selected');
          }
        }
    }


    return (
        <Container onChange={(e) => handleCama(id, e)}>
            <Select name="tipoDeCama" id="selectCama" onChange={() => handleSelected()}>
                <option value="Tipo de Cama" disabled selected hidden>{option != "" ? option : "Tipo de Cama"}</option>
                <option value="Solteiro">Solteiro</option>
                <option value="Casal">Casal</option>
            </Select>
            <Input
                variant="default"
                name="Quantidade"
                type="number"
                placeholder={"Quantidade"}
                value={value}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <DeleteBedButton onClick={() => deleteCama(id)}><Image src={trash} alt="trashIcon" width={50} height={50}/></DeleteBedButton>
        </Container>

    )
}

export default CamaInput;