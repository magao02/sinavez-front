import { useRouter } from "next/router";

import Image from "next/image.js";

import Pattern from "../../assets/horizontal_pattern.png";
import SinavezLogo from "../../assets/sinavez_logo_white.svg";
import SinavezText from "../../assets/sinavez_text_white.svg";
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

    const redirectImposto = () => {
        if (typeof window !== 'undefined') {
            window.location.href = "https://sinavez-front-producao.herokuapp.com/login";
        }
    }

    return (
        <Container>
            <Title>Seja Bem Vindo ao <TitleOrange>SINAVEZ 2.0</TitleOrange></Title>
            <Buttons>
                <Button onClick={redirectSindicato}>
                    <ButtonImage>
                        <Image src={SinavezLogo} draggable={false} height="120" />
                        <div style={{scale: "1.3"}}>
                            <Image src={SinavezText} draggable={false} />
                        </div>
                    </ButtonImage>
                    <span>Entrar na plataforma do <b>sindicato!</b></span>
                </Button>
                <Button onClick={redirectImposto}>
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
