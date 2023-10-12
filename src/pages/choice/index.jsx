import { useRouter } from "next/router";

import Image from "next/image.js";

import Pattern from "../../assets/horizontal_pattern.png";
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
    PatternContainer,
} from "../../styles/choiceStyles";


const ChoicePage = () => {
    const router = useRouter();

    const redirectSindicato = () => {
        router.push("/usuario");
    };

    return (
        <Container>
            <Title>Seja Bem Vindo ao <TitleOrange>SINAVEZ 2.0</TitleOrange></Title>
            <Buttons>
                <Button onClick={redirectSindicato}>
                    <ButtonImage>
                        <Image src={SinavezLogo} draggable={false} height="120" />
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
            {/* Couldn't get it to work with next's Image unfortunately */}
            <PatternContainer src={Pattern.src} />
        </Container>
    );
};

export default ChoicePage;
