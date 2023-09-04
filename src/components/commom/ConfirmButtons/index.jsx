import { useEffect } from "react";
import Button from "../Button";
import { Container } from "./styles";

const ConfirmButtons = ({ handleCancel, data, save, cancelAll, saveAll}) => {
  const cancel = () => {
    handleCancel(data);
  };


  useEffect(() => {
    if(cancelAll){
      cancel();
    }

    if(saveAll){
      save()
    }
  })

  return (
    <Container>
      <Button variant={"text"} onClick={() => cancel()}>
        CANCELAR
      </Button>
      <Button variant={"save"}  onClick={() => save()}>
        SALVAR ALTERACOES
      </Button>
    </Container>
  );
};

export default ConfirmButtons;
