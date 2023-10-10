import { Border, CloseButtonContainer, Container, MainContent, TextArea, TitleArea, MainContentContainer, ImageArea, ButtonArea, ButtonTransparent, ButtonRegistration } from "./styles";
import DarkBackground from "../commom/DarkBackground";
import close_modal_icon from "../../assets/close_modal_icon.svg"
import registration_img from "../../assets/registration.svg"
import right_arrow from "../../assets/right_arrow.svg"
import Image from "next/image";

const RegistrationModal = ( { handleModal } ) => {

    return (
        <Container>
            <DarkBackground></DarkBackground>
            <MainContentContainer>
                <CloseButtonContainer>
                    <img src={close_modal_icon.src} onClick={handleModal}></img>
                </CloseButtonContainer>
                <MainContent>
                    <TitleArea>
                        <h1>Complete seu cadastro</h1>
                        <Border />
                    </TitleArea>
                    <TextArea>
                        Seu cadastro no novo site é fundamental para que possamos manter nossas informações atualizadas. É simples, rápido e levará apenas alguns minutos!
                    </TextArea> 
                    <ImageArea>
                        <img src={registration_img.src}></img>
                    </ImageArea>
                    <ButtonArea>
                        <ButtonTransparent onClick={handleModal}>
                            agora não
                        </ButtonTransparent>
                        <ButtonRegistration onClick={handleModal}>
                            COMPLETAR MEU CADASTRO <Image src={right_arrow}></Image>
                        </ButtonRegistration>
                    </ButtonArea>
                </MainContent>
            </MainContentContainer>
        </Container>
    )
}

export default RegistrationModal;