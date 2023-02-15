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

import * as service from "../../services/accounts";
import { useRouter } from "next/router";

import SinavezLogo from "../../assets/logo_picture.svg";
import Input from "../../components/commom/Input";
import Button from "../../components/commom/Button";
import { useCallback, useRef, useState } from "react";

const RedefinirSenha = () => {
  const passwordRef = useRef();
  const passwordRefAgain = useRef();
  const [globalMessage, setGlobalMessage] = useState();
  const [invalidToken, setInvalidToken] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const router = useRouter();

  const changePassword = useCallback(async () => {
    const password = passwordRef.current.value
    const passwordAgain = passwordRefAgain.current.value

    if (password == passwordAgain) {
      setNewPassword(password);
    } else {
      handleErrorOnSubmit("Senhas Diferentes");
    }
  }, [passwordRef, passwordRefAgain]);

  const handleErrorOnSubmit = useCallback(async (error) => {
    setGlobalMessage(error);
  }, []);

  const setNewPassword = useCallback(async (password) => {
    const [token, email] = handleGetUrlProps();

    try {
      const responseData = await service.setNewPassword(email, token, password);
      setPasswordChanged(true);
      return responseData.data;
    } catch {
      setInvalidToken(true);
    }
  }, [])

  const handleGetUrlProps = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const token = urlParams.get("token")
    const email = urlParams.get("email")

    return [token, email];
  };

  const handlePushPage = () => {
    router.push("/login");
  }

  return (
    <Container>
      {!invalidToken && !passwordChanged && (
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
      {!invalidToken && passwordChanged && (
        <ContentSection>
          <PasswordSection>
            <Image src={SinavezLogo} alt="logo sinavez" />
            <Greetings>
              <Title>Senha Alterada Com Sucesso</Title>
              <Subtitle>
                Sua senha foi alterada, pode entrar em sua conta clicando no botão abaixo.
              </Subtitle>
            </Greetings>
            <Button variant="default" onClick={handlePushPage}>Login</Button>
          </PasswordSection>
          <DecorativeSection></DecorativeSection>
        </ContentSection>
      )}
      {invalidToken && !passwordChanged && (
        <ContentSection>
          <PasswordSection>
            <Image src={SinavezLogo} alt="logo sinavez" />
            <Greetings>
              <Title>Sem Acesso Para Alterar Senha</Title>
              <Subtitle>
                O link que você acessou está com token inválido.
                Por favor, acesse essa página através do link enviado ao seu email.
                Se o email não costar, clique em esqueci a senha e continue o processo.
              </Subtitle>
            </Greetings>
            <Button variant="default" onClick={handlePushPage}>Página Inicial</Button>
          </PasswordSection>
          <DecorativeSection></DecorativeSection>
        </ContentSection>
      )}
    </Container>
  )
}

export default RedefinirSenha;