import Image from "next/image";
import {
  Container,
  ContentSection,
  PasswordSection,
  DecorativeSection,
  Title,
  Greetings,
  Span,
  Subtitle,
} from "../../styles/senhaStyles";

import * as validation from "../../utils/validation";

import SinavezLogo from "../../assets/logo_picture.svg";
import Input from "../../components/commom/Input";
import Button from "../../components/commom/Button";
import { useCallback, useEffect, useRef, useState } from "react";

const RedefinirSenha = () => {
  const passwordRef = useRef();
  const passwordRefAgain = useRef();
  const [globalMessage, setGlobalMessage] = useState();
  const [token, setToken] = useState();

  const changePassword = useCallback(() => {
    const password = passwordRef.current.value
    const passwordAgain = passwordRefAgain.current.value

    if (password == passwordAgain) {
      //Aqui vem a função q chama o backend (rota para mudar de senha)
    } else {
      handleErrorOnSubmit("Senhas Diferentes");
    }
  }, [passwordRef, passwordRefAgain]);

  const handleErrorOnSubmit = useCallback(async (error) => {
    setGlobalMessage(error);
  }, []);

  useEffect(() => {
    handleGetUrlProps();
  }, [])

  const handleGetUrlProps = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setToken(urlParams.get("token"));
  };

  return (
    <Container>
      {token == "abcd" && (
        <ContentSection>
          <PasswordSection>
            <Image src={SinavezLogo} alt="logo sinavez" />
            <Greetings>
              <Title>Recuperar Senha</Title>
            </Greetings>
            <Input
              variant="signup"
              label="Nova Senha"
              name="new-password"
              placeholder="Digite sua nova senha (8 dígitos)"
              type="password"
              ref={passwordRef}
              validate={validation.testRequiredPassword}
            />
            <Input
              variant="signup"
              label="Senha Novamente"
              name="new-password-again"
              placeholder="Digite sua nova senha novamente"
              type="password"
              ref={passwordRefAgain}
              validate={validation.testRequiredPassword}
            />
            <Span>
              {globalMessage && <span>{globalMessage}</span>}
            </Span>
            <Button variant="default" onClick={() => changePassword(passwordRef, passwordRefAgain)}>Mudar Senha</Button>
          </PasswordSection>
          <DecorativeSection></DecorativeSection>
        </ContentSection>
      )}
      {token !== "abcd" && (
        <ContentSection>
          <PasswordSection>
            <Image src={SinavezLogo} alt="logo sinavez" />
            <Greetings>
              <Title>Sem Acesso Para Alterar Senha</Title>
              <Subtitle>Por favor, acesse essa página através do link enviado ao seu email</Subtitle>
            </Greetings>
          </PasswordSection>
          <DecorativeSection></DecorativeSection>
        </ContentSection>
      )}
    </Container>
  )
}

export default RedefinirSenha;