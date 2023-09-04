import Button from "../Button";
import { Container } from "./styles";

const ModalButtons = ({ handleCancel , handleSave , ConfirmColor, ConfirmText, CancelText, closeModal}) => {



  return (
    <Container>
      <Button variant={"text"} onClick={handleCancel}>
        {CancelText ? CancelText : "CANCELAR"}
      </Button>
      <Button variant={"save"} onClick={handleSave} style={{backgroundColor: ConfirmColor}}>
        {ConfirmText ? ConfirmText : "SALVAR ALTERACOES"}
      </Button>
    </Container>
  );
};

export default ModalButtons;
