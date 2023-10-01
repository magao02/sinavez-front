import { Container, DeleteBedButton, ErrorMsg, InputBox, Label, Placeholder, QntdInputContainer, Select, } from "./styles"
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
      <InputBox>
        <Container onChange={(e) => handleCama(id, e)}>
            <Select name="tipo" id="selectCama">
                <option value="Tipo de Cama" disabled hidden selected={option == undefined}></option>
                <option value="Solteiro" selected={option == "Solteiro"}>Solteiro</option>
                <option value="Casal" selected={option == "Casal"}>Casal</option>
            </Select>
            {
              !option && 
              <Placeholder>Tipo de Cama<span style={{color: "red"}}>*</span></Placeholder>
            }
            <QntdInputContainer>
              <Label>
                <Input
                    variant="default"
                    name="Quantidade"
                    type="number"
                    id={id}
                    value={value == 0 ? "" : value}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {
                  !inputValue && !value &&
                  <Placeholder>Quantidade<span style={{color: "red"}}>*</span></Placeholder>
              }
              </Label>
            </QntdInputContainer>
            <DeleteBedButton onClick={() => setShowModal(!showModal)}><Image src={trash} alt="trashIcon" width={50} height={50}/></DeleteBedButton>
        </Container>
          {
              option == undefined ? (
                <ErrorMsg>Preencha o tipo de cama</ErrorMsg>
              )
              : value == undefined || value == 0 ?
                <ErrorMsg>Preencha a Quantidade</ErrorMsg>
              : (
                <ErrorMsg></ErrorMsg>
              )
            }
        </InputBox>
      {showModal &&
        <Modal
          title="Excluir Cama"
          asideText="Deseja excluir uma das camas cadastradas?"
          handleCancel={() => setShowModal(!showModal)}
          handleSave={() => {
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