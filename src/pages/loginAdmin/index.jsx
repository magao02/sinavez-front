import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import Image from "next/image.js";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import Pattern from "../../assets/login_pattern.svg";
import Ilustration from "../../assets/login_ilustration.svg";
import SinavezLogo from "../../assets/sinavez_logo_white.svg";
import SinavezText from "../../assets/sinavez_text_white.svg";

import {
  Container,
  Details,
  LoginBox,
  RightContent,
  MenuBox,
  Logo,
  Title,
  PatternBox
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
      router.push("/home");
    } catch (error) {
      setGlobalMessage(error.response.data.message);
    }
  }, [loginAccount, router]);

  return (
    <Container>
      <Details>
        <Image src={Ilustration} />
      </Details>
      <PatternBox>
        <Image src={Pattern} />
      </PatternBox>
      <RightContent>
        <MenuBox>
          <Logo>
            <Image src={SinavezLogo} />
            <Image src={SinavezText} />
          </Logo>
          Bem vindo de volta!
        </MenuBox>
        <LoginBox>
          <Title>
            Login Administrador
          </Title>
          <LoginForm onValidSubmit={handleValidFormSubmit}
            globalMessage={globalMessage} />
        </LoginBox>
      </RightContent>
    </Container >
  );
};

export default LoginPage;
