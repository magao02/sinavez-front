import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import { useAuth } from "../../../contexts/AuthContext";

import { useCallback, useEffect, useState } from "react";

import * as services from "../../../services/accounts";

import impostoPdf from "../../../pdf/imposto";

import Button from "../Button";

import SinavezLogo from "../../../assets/logo_picture.svg";

import { NavBar, UserFeaturesLeft, UserFeaturesRight } from "./styles";

const Navigation = (props) => NavVariant(props);

function NavVariant({ variant }) {
  switch (variant) {
    case "logged": {
      const [pdfData, setPdfData] = useState({});

      const router = useRouter();

      const authContext = useAuth();

      const logout = () => {
        services.logout(authContext.token);
        authContext.cleanInfos();
        router.push("/login");
      };

      const IsAdmin = () => {
        if (!!authContext.admin) {
          return(<Link href="associados">Listar Associados</Link>)
        }
        else {
          return(<></>)
        }
      };

      const getImposto = useCallback(async () => {
        try {
          const responseImposto = await services.getImpostos(
            authContext.urlUser,
            authContext.token
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

      const startPdf = useCallback(async () => {
        impostoPdf(pdfData);
      });

      useEffect(() => {
        handleImposto();
      }, []);

      return (
        <NavBar>
          <UserFeaturesLeft>
            <Image src={SinavezLogo} />
            <Link href="/usuario">Meus Dados</Link>
            <Link href="/dependentes">Meus Dependentes</Link>
            <Button variant="image" onClick={startPdf}>
              <a>Baixar Imposto de Renda</a>
            </Button>
            <IsAdmin />
          </UserFeaturesLeft>
          <UserFeaturesRight>
            <Button variant="nav" onClick={logout}>
              Sair
            </Button>
          </UserFeaturesRight>
        </NavBar>
      );
    }

    case "singup": {
      return (
        <NavBar>
          <Image src={SinavezLogo} />
        </NavBar>
      );
    }
  }
}

export default Navigation;
