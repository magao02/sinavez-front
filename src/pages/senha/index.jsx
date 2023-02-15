import { useCallback, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import * as validation from "../../utils/validation";

import Image from "next/image";
import {
  Container,
  ContentSection,
  PasswordSection,
  DecorativeSection,
  Title,
  Subtitle,
  Greetings,
  Span,
} from "../../styles/senhaStyles";

import SinavezLogo from "../../assets/logo_picture.svg";
import Input from "../../components/commom/Input";
import Button from "../../components/commom/Button";
import { useRouter } from "next/router";

import * as service from "../../services/accounts";

const PasswordRecovery = () => {
  const formRef = useRef()
  const emailRef = useRef()
  
  const [globalMessage, setGlobalMessage] = useState();
  const [sended, setSended] = useState(false);
  const [token, setToken] = useState();

  const router = useRouter();

  const handleErrorOnSubmit = useCallback(async (error) => {
    setGlobalMessage(error);
  }, []);

  const handlePushPage = () => {
    router.push("/login");
  }

  const handleSendEmail = useCallback(async (e) => {
    e.preventDefault();

    await setPasswordToken();

    emailjs.sendForm('service_8enbzpk', 'template_n6fenfo', formRef.current, '1sPzNFpvId-LvMnpy')
      .then((result) => {
        setSended(true);
      }, (error) => {
        if (error.status == 412) {
          handleErrorOnSubmit("Email Inválido");
        } else {
          handleErrorOnSubmit("Digite seu email");
        }
      })
  }, []);

  const getToken = useCallback(async () => {
    const email = emailRef.current.value;
    const responseData = await service.passwordToken(email);
    return responseData.data.token;
  }, []);

  const setPasswordToken = async () => {
    setToken(await getToken());
  }

  return (
    <>
      {!sended && (
        <Container>
          <ContentSection>
            <PasswordSection>
              <Image src={SinavezLogo} alt="logo sinavez" />
              <Greetings>
                <Title>Esqueceu sua senha?</Title>
                <Subtitle>
                  Por favor, digite seu endereço de e-mail que você usou durante a
                  criação da sua conta. Nós mandaremos instruções para redefinir sua
                  senha.
                </Subtitle>
              </Greetings>
              <form ref={formRef}>
                <Input
                  ref={emailRef}
                  variant="signup"
                  label="Email"
                  name="email"
                  placeholder="Digite seu Email"
                  validate={validation.testRequiredEmail}
                />
                <input name="token" style={{ "display": "none" }} value={token} />
                <Span>
                  {globalMessage && <span>{globalMessage}</span>}
                </Span>
                <Button variant="password" onClick={handleSendEmail}>Enviar</Button>
              </form>
            </PasswordSection>
            <DecorativeSection></DecorativeSection>
          </ContentSection>
        </Container>
      )}

      {sended && (
        <Container>
          <ContentSection>
            <PasswordSection>
              <Image src={SinavezLogo} alt="logo sinavez" />
              <Greetings>
                <Title>Verifique sua caixa de Email</Title>
                <Subtitle>
                  Um link de recuperação de senha foi enviado
                  para seu email, por favor, verifique a sua caixa de mensagem
                  e de spam.
                </Subtitle>
              </Greetings>
              <Button variant="default" onClick={handlePushPage}>Login</Button>
            </PasswordSection>
            <DecorativeSection></DecorativeSection>
          </ContentSection>
        </Container>
      )}
    </>
  );
}

export default PasswordRecovery;
