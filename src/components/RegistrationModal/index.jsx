import { CloseButtonContainer, Container, MainContent, TitleArea } from "./styles";
import DarkBackground from "../commom/DarkBackground";
import close_modal_icon from "../../assets/close_modal_icon.svg"

const RegistrationModal = () => {
    return (
        <Container>
            <DarkBackground></DarkBackground>
            <MainContent>
                <CloseButtonContainer>
                    <img src={close_modal_icon.src}></img>
                </CloseButtonContainer>
                <TitleArea>
                    <h1>Complete seu cadastro</h1>
                </TitleArea>
            </MainContent>
        </Container>
    )
}

export default RegistrationModal;