import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import Image from "next/image.js";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import Pattern from "../../assets/login_pattern.svg";
import Ilustration from "../../assets/login_ilustration.svg";
import SinavezLogo from "../../assets/sinavez_logo_blue.svg";
import SinavezText from "../../assets/sinavez_text_blue.svg";

import {
  WhiteContainer,
  Details,
  LoginBox,
  RightContent,
  MenuBox,
  Logo,
  Title,
  PatternBox
} from "../../styles/loginStyles";

import LoginAssociadoForm from "../../components/LoginAssociadoForm";
import { useMemo } from "react";
import { readFromLocalStorage, removeFromLocalStorage } from "../../utils/local";
import BigConfirmPopup from "../../components/BigConfirmPopup";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();

  const authContext = useAuth();

  const [globalMessage, setGlobalMessage] = useState();

  const loginAccount = useCallback(async (accountData) => {
    const responseData = await service.login(accountData);
    authContext.handleLoginToken(responseData.data);
  }, [authContext]);

  const [isMakingRequest, setIsMakingRequest] = useState(false);

  const handleValidFormSubmit = useCallback(async ({ cpf, password }) => {
    try {
      setIsMakingRequest(true);
      await loginAccount({ cpf, password });
      router.push("/home");
    } catch (error) {
      setGlobalMessage(error.response.data.message);
    }
    setIsMakingRequest(false);
  }, [loginAccount, router]);

  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    let x = readFromLocalStorage("unauthorizedMsg");
    if (x)
      setErrorMsg(x);
  }, []);

  const closeErrorMsg = () => {
    setErrorMsg(null);
    removeFromLocalStorage("unauthorizedMsg");
  }

  return <>
    <WhiteContainer>
      <Details>
        <Image src={Ilustration} />
      </Details>
      <PatternBox lighter={true}>
        <Image src={Pattern} />
      </PatternBox>
      <RightContent>
        <MenuBox blue={true}>
          <Logo>
            <Image src={SinavezLogo} />
            <Image src={SinavezText} />
          </Logo>
          Bem vindo de volta!
        </MenuBox>
        <LoginBox>
          <Title>
            Login
          </Title>
          <LoginAssociadoForm onValidSubmit={handleValidFormSubmit}
            globalMessage={globalMessage} makingRequest={isMakingRequest} />
        </LoginBox>
      </RightContent>
    </WhiteContainer>
    { errorMsg && <BigConfirmPopup
      title="Erro"
      body={errorMsg}
      cancelText="OK"
      onCancel={closeErrorMsg}
    /> }
  </>;
};

export default LoginPage;
