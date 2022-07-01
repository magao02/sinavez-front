import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import {
  Container,
  LoginSection,
  GreetingsContainer,
  Title,
  SubTitle,
  Link,
  Center,
  DecorativeSection,
} from "../../styles/loginStyles";

import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  const router = useRouter();

  const authContext = useAuth();

  const [globalMessage, setGlobalMessage] = useState();

  const loginAccount = useCallback(async (accountData) => {
    const responseData = await service.login(accountData);
    authContext.handleLoginToken(responseData.data);
  }, [authContext]);

  const handleValidFormSubmit = useCallback(async ({ cpf, password }) => {
    try {
      await loginAccount({ cpf, password });
      router.push("/usuario");
    } catch (error) {
      setGlobalMessage(error.response.data.message);
    }
  }, [loginAccount, router]);

  return (
    <Container>
      <LoginSection>
        <GreetingsContainer>
          <Title>Login</Title>
          <SubTitle>Seja bem-vindo de volta!</SubTitle>
        </GreetingsContainer>
        <LoginForm
          onValidSubmit={handleValidFormSubmit}
          globalMessage={globalMessage}
        />
        <Center>
          <span>Não possui uma conta?</span>
          <Link href="/cadastro">Criar Conta</Link>
        </Center>
      </LoginSection>

      <DecorativeSection />
    </Container>
  );
};

export default LoginPage;
