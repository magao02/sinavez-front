import { Container, MainContentContainer, CloseButtonContainer, MainContent, ImageArea, InfoContent, Border, TextArea, TitleArea, ButtonArea, ButtonTransparent, ButtonRegistration } from "./styles"
import restriction_img from "../../assets/restriction_popup.svg"
import close_modal_icon from "../../assets/close_modal_icon.svg"
import right_arrow from "../../assets/right_arrow.svg"
import Image from "next/image";

export const RestrictionPopUp = ( {handlePopUp}) => {

    return (
        <Container>
            <MainContentContainer>
                <CloseButtonContainer>
                    <img onClick={handlePopUp} src={close_modal_icon.src}></img>
                </CloseButtonContainer>
                <MainContent>
                    <ImageArea>
                        <img src={restriction_img.src}></img>
                    </ImageArea>
                    <InfoContent>
                        <TitleArea>
                            <h4>Ops! Você ainda não completou seu cadastro</h4>
                            <Border></Border>
                        </TitleArea>
                        <TextArea>
                            Complete o cadastro dos seus dados no nosso novo site para realizar essa ação.
                        </TextArea>
                        <ButtonArea>
                            <ButtonTransparent onClick={handlePopUp}> 
                                agora não
                            </ButtonTransparent>
                            <ButtonRegistration onClick={() => handlePopUp("complete") }>
                                COMPLETAR MEU CADASTRO <Image src={right_arrow}></Image>
                            </ButtonRegistration>
                        </ButtonArea>
                    </InfoContent>
                </MainContent>
            </MainContentContainer>
        </Container>
    )
}