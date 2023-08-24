import { Container, DeleteBedButton, Select, } from "./styles"
import Input from "../commom/Input";
import trash from "../../assets/trash.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "../commom/Modal";
import modal_img from "../../assets/delete_cama_modal_img.svg"


const CamaInput = ( {id, deleteCama, handleCama, option, value, disableButton}) => {

    const [inputValue, setInputValue] = useState();

    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Container onChange={(e) => handleCama(id, e)}>
            <Select name="tipo" id="selectCama">
                <option value="Tipo de Cama" disabled hidden>{"Tipo de Cama"}</option>
                <option value="Solteiro" selected={option == "Solteiro"}>Solteiro</option>
                <option value="Casal" selected={option == "Casal"}>Casal</option>
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
          handleSave={() => setShowModal(!showModal)}
          handleCancel={() => {
            deleteCama(id)
            setShowModal(!showModal)
          }}
          img={modal_img.src}
        />
      }
      </>
    )
}

export default CamaInput;