import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import RoundImage from "../../components/commom/RoundImage";
import Table from "../../components/commom/Table";

import {
  Container,
  ContentContainer,
  UserTitle,
  SubContainer,
  Separator,
} from "../../styles/usuarioStyles";

const UserData = () => {
  const router = useRouter();

  const authContext = useAuth();

  const [value, setValue] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserData = useCallback(async () => {
    try {
      const responseData = await service.getUserData(
        authContext.urlUser,
        authContext.token
      );
      return responseData.data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  }, [authContext.token, authContext.urlUser]);

  const handleUserData = useCallback(async () => {
    const responseData = await getUserData();
    setValue(responseData);
    setIsLoaded(true);
  }, [getUserData]);

  const checkNav = () => {
    if (authContext.admin == 'true' || authContext.admin == true) {
      return "admin"
    }
    else {
      return "logged";
    }
  }

  useEffect(() => {
    if (!authContext.auth) {
      router.push("/login");
      return;
    }
    handleUserData();
  }, [authContext.auth, handleUserData, router]);

  return (
    <Container>
      <Navigation variant={checkNav()} />
      {isLoaded && (
        <ContentContainer>
          <SubContainer>
            <UserTitle>
              <RoundImage />
              <h1>{value.name}</h1>
              <Separator />
            </UserTitle>
            <Table
              variant="pessoal"
              title="Informações Pessoais"
              headers={[
                "Nome",
                "Data de Nascimento",
                "Data de Afiliação",
                "RG",
                "CPF",
                "Profissão",
              ]}
              data={[
                value.name,
                value.nascimento,
                value.dataAfiliacao,
                value.rg,
                value.cpf,
                value.profissao,
              ]}
            ></Table>
          </SubContainer>
          <SubContainer>
            <Table
              variant="contato"
              title="Informações de Contato"
              headers={["Email", "Telefone", "Endereço"]}
              data={[
                value.email,
                value.telefone,
                value.endereco.rua,
                value.endereco.numero,
                value.endereco.bairro,
                value.endereco.complemento,
              ]}
            ></Table>

            <Table
              variant="trabalho"
              title="Informações de Trabalho"
              headers={["Salário", "Organização Ou Empresa", "Nº de Inscrição"]}
              data={[value.salario, value.empresa, value.numInscricao]}
            ></Table>
          </SubContainer>
        </ContentContainer>
      )}
    </Container>
  );
};

export default UserData;
