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

const PhotoInput = ({ getPhoto, id, url, deletePhoto }) => {
  const [showModal, setShowModal] = useState();

  const modal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Container>
        {!url ? (
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
            <Img src={url} />
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
          id={id}
          handleCancel={modal}
          handleSave={() => {modal(); deletePhoto(id);}}
        ></Modal>
      )}
    </>
  );
};

export default PhotoInput;
