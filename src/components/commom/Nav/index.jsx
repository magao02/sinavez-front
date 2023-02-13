import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import { useAuth } from "../../../contexts/AuthContext";

import { useCallback, useEffect, useState } from "react";

import * as services from "../../../services/accounts";

import Button from "../Button";

import SinavezLogo from "../../../assets/logo_picture.svg";

import { NavBar, UserFeaturesLeft, UserFeaturesRight } from "./styles";

const Navigation = (props) => NavVariant(props);

function NavVariant({ variant }) {
  const [pdfData, setPdfData] = useState({});
  const [admin, setAdmin] = useState();

  const authContext = useAuth();

  const router = useRouter();

  const logout = () => {
    services.logout(authContext.token);
    authContext.cleanInfos();
    router.push("/login");
  };

  const getImposto = useCallback(async () => {
    try {
      const responseImposto = await services.getImpostos(
        authContext.urlUser,
        authContext.token,
        (new Date()).getFullYear()
      );
      return responseImposto.data;
    } catch (error) {
      console.log(error);
    }
  });

  const handleImposto = useCallback(async () => {
    const responseData = await getImposto();
    setPdfData(responseData);
  });

  useEffect(() => {
    handleImposto();
    setAdmin(authContext.admin)
  }, []);

  switch (variant) {
    case "admin": {
      return (
        <NavBar>
          <UserFeaturesLeft>
            <Image src={SinavezLogo} />
            <Link href="/usuario">Meus Dados</Link>
            <Link href="/dependentes">Meus Dependentes</Link>
            <Link href="/impostos">Baixar Imposto de Renda</Link>
            <Link legacyBehavior={false} onClick={() => localStorage.setItem("urlAssociado", authContext.urlUser)} href="/redefinir">Redefinir Dados</Link>
            <Link href="associados">Listar Associados</Link>
            <Link href="/cadastro">Cadastrar Novo Membro</Link>
          </UserFeaturesLeft>
          <UserFeaturesRight>
            <Button variant="nav" onClick={logout}>
              Sair
            </Button>
          </UserFeaturesRight>
        </NavBar>
      );
    }
    case "logged": {
      return (
        <NavBar>
          <UserFeaturesLeft>
            <Image src={SinavezLogo} />
            <Link href="/usuario">Meus Dados</Link>
            <Link href="/dependentes">Meus Dependentes</Link>
            <Link href="/impostos">Baixar Imposto de Renda</Link>
            <Link legacyBehavior={false} onClick={() => localStorage.setItem("urlAssociado", authContext.urlUser)} href="/redefinir">Redefinir Dados</Link>
          </UserFeaturesLeft>
          <UserFeaturesRight>
            <Button variant="nav" onClick={logout}>
              Sair
            </Button>
          </UserFeaturesRight>
        </NavBar>
      );
    }

    case "signup": {
      return (
        <NavBar>
          <Image src={SinavezLogo} />
        </NavBar>
      );
    }
  }
}

export default Navigation;
