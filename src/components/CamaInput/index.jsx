import { Container, DeleteBedButton, Select, } from "./styles"
import Input from "../commom/Input";
import trash from "../../assets/trash.svg";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "../commom/Modal";
import modal_img from "../../assets/delete_cama_modal_img.svg"


const CamaInput = ( {id, deleteCama, handleCama, option, value, disableButton}) => {

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

    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Container onChange={(e) => handleCama(id, e)}>
            <Select name="tipo" id="selectCama" onChange={() => handleSelected()}>
                <option value="Tipo de Cama" disabled selected hidden>{"Tipo de Cama"}</option>
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
            <DeleteBedButton onClick={() => setShowModal(!showModal)}><Image src={trash} alt="trashIcon" width={50} height={50}/></DeleteBedButton>
        </Container>
      {showModal &&
        <Modal
          title="Excluir Cama"
          asideText="Deseja excluir uma das camas cadastradas?"
          closeModal={() => setShowModal(!showModal)}
          actionFunction={() => deleteCama(id)}
          img={modal_img.src}
        />
      }
      </>
    )
}

export default CamaInput;