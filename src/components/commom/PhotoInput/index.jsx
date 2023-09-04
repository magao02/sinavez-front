import {
  Container,
  Input,
  Label,
  Img,
  Form,
  EditButton,
  PhotoArea,
  ModalContainer,
} from "./styles";
import add from "../../../assets/add_cruz.svg";
import Image from "next/image";
import edit_pen from "../../../assets/edit_pen.svg";
import { useState } from "react";
import { Modal } from "../Modal";
import modal_img from "../../../assets/delete_cama_modal_img.svg";

const PhotoInput = ({ getPhoto, id, File, deletePhoto }) => {
  const [showModal, setShowModal] = useState();

  const modal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Container>
        {File == "" ? (
          <Form style={{ width: "100%", height: "100%" }}>
            <Label for="file">
              <Image src={add}></Image>
            </Label>
            <Input
              id="file"
              accept="image/*"
              onChange={(e) => getPhoto(e, id)}
            ></Input>
          </Form>
        ) : (
          <PhotoArea>
            <Img src={URL.createObjectURL(File)} alt={File.name} />
            <EditButton onClick={modal}>
              <Image src={edit_pen} alt="EditPen" />
            </EditButton>
          </PhotoArea>
        )}
      </Container>
      {showModal && (
        <Modal
          title={"Excluir Foto"}
          img={modal_img.src}
          asideText={"Deseja excluir a foto?"}
          actionFunction={deletePhoto}
          closeModal={modal}
          id={id}
        ></Modal>
      )}
    </>
  );
};

export default PhotoInput;
