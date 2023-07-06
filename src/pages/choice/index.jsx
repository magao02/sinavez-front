import { useRouter } from "next/router";

import Image from "next/image.js";

import Pattern from "../../assets/login_pattern.svg";
import SinavezLogo from "../../assets/sinavez_logo_branco.svg";
import SinavezText from "../../assets/text_sinavez_branco.svg";
import ImpostoLogo from "../../assets/multiple_files.svg";

import {
    Container,
    Title,
    Buttons,
    Button,
    TitleOrange,
    ButtonImage,
} from "../../styles/choiceStyles";


const ChoicePage = () => {
    return (
        <Container>
            <Title>Seja Bem Vindo a <TitleOrange>SINAVEZ 2.0</TitleOrange></Title>
            <Buttons>
                <Button>
                    <ButtonImage>
                        <Image src={SinavezLogo} draggable={false} />
                        <Image src={SinavezText} draggable={false} />
                    </ButtonImage>
                    <span>Entrar na plataforma do <b>sindicato!</b></span>
                </Button>
                <Button>
                    <ButtonImage>
                        <Image src={ImpostoLogo} draggable={false} />
                        Imposto de renda
                    </ButtonImage>
                    <span>Entrar na plataforma de Imposto de Renda!</span>
                </Button>
            </Buttons>
        </Container>
    );
};

export default ChoicePage;
