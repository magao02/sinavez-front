import DarkBackground from "../DarkBackground";
import ModalButtons from "../ModalButtons";
import { Container, ModalContent, Main, TextAside } from "./styles";

export const Modal = ({ title, asideText, handleSave , handleCancel, id, img, ConfirmColor, ConfirmText, CancelText}) => {


  return (
    <Container>
      <DarkBackground></DarkBackground>
      <ModalContent id={id}>
        <h2>{title}</h2>
        <Main>
          <img src={img}></img>
          <TextAside>
            <h2>{asideText}</h2>
          </TextAside>
        </Main>
        <ModalButtons
          ConfirmColor={ConfirmColor ? ConfirmColor : "orange"}
          ConfirmText={ConfirmText ? ConfirmText : "CANCELAR"}
          CancelText={CancelText ? CancelText : "EXCLUIR"}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      </ModalContent>
    </Container>
  );
};
