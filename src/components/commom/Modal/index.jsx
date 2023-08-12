import ModalButtons from "../ModalButtons";
import { Container, ModalContent, Main, TextAside } from "./styles";

export const Modal = ({ title, asideText, actionFunction , closeModal, id, img}) => {



  return (
    <Container>
      <ModalContent id={id}>
        <h2>{title}</h2>
        <Main>
          <img src={img}></img>
          <TextAside>
            <h2>{asideText}</h2>
          </TextAside>
        </Main>
        <ModalButtons
          ConfirmColor={"orange"}
          ConfirmText={"CANCELAR"}
          CancelText={"EXCLUIR"}
          handleCancel={actionFunction}
          handleSave={closeModal}
          closeModal={closeModal}
        />
      </ModalContent>
    </Container>
  );
};
