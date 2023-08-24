import DarkBackground from "../DarkBackground";
import { Container, ModalContent } from "./styles";

const AlertModal = ({title}) => {
    return (
        <Container>
            <DarkBackground></DarkBackground>
            <ModalContent>
                <h3>{title}</h3>
            </ModalContent>
        </Container>
    )
}

export default AlertModal;