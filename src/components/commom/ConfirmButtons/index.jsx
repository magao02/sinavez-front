import Button from "../Button"
import { Container } from "./styles";

const ConfirmButtons = ({handleCancel, data, save}) => {
    
    const cancel = () => {
        console.log(data)
        handleCancel(data)
    }
    
    return (
        <Container>
            <Button variant={"text"} onClick={() => cancel()}>CANCELAR</Button>
            <Button variant={"save"} onClick={() => save()}>SALVAR ALTERACOES</Button>
        </Container>
    )
}

export default ConfirmButtons;