import { Container, Title, Text, TextBox, Character, Pattern } from "./styles";

import Image from "next/image";

import Button from "../commom/Button";

import character from "../../assets/onboarding_character.svg";
import pattern from "../../assets/login_pattern.svg";

const OnBoardingScreen = ({ name, onClicked }) => {
    return (
        <Container>
            <TextBox>
                <Title>
                    Olá {name}! Bem vindo a nova plataforma
                    <br />
                    da SINAVEZ
                </Title>
                <Text>
                    A SINAVEZ agora está de cara nova,
                </Text>
                <Button variant={"default-adjustable-15%"} onClick={onClicked}>
                    ENTENDER A PLATAFORMA
                </Button>
            </TextBox>
            <Character>
                <Image src={character} />
            </Character>
            <Pattern>
                <Image src={pattern} />
                <Image src={pattern} />
            </Pattern>
        </Container>
    );
}

export default OnBoardingScreen;