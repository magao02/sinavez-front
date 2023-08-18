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
  CardsContainer,
  Card,
  Dados,
  Row,
  Tabs,
  Tab,
  DadosButton,
} from "../../styles/usuarioStyles";
import { Subtitle1, Subtitle2, Title2 } from "../../styles/commonStyles";
import Input from "../../components/commom/Input";
import { formatCPF, formatRG } from "../../utils/format";

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
      throw error;
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
          {/* <SubContainer>
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
          </SubContainer> */}
          <CardsContainer>
            <Card>
              <Title2>Meus Dados</Title2>
              <div className="card">
                <img src="https://source.unsplash.com/random/300x300?abstract" />
                <Subtitle1>{value.name}</Subtitle1>
                <Tabs>
                  <Tab selected>Dados Pessoais</Tab>
                  <Tab>Contato</Tab>
                  <Tab>Endereço</Tab>
                </Tabs>
                <Dados>
                  <Input
                    label="Profissão"
                    variant="default-optional"
                    initialValue={value.profissao}
                    disabled
                  />
                  <Row>
                    <Input
                      label="CPF"
                      variant="default-optional"
                      initialValue={formatCPF(value.cpf)}
                      disabled
                    />
                    <Input
                      label="Data de Nascimento"
                      variant="default-optional"
                      initialValue={value.nascimento}
                      disabled
                    />
                  </Row>
                  <Row>
                    <Input
                      label="Registro Geral (RG)"
                      variant="default-optional"
                      initialValue={formatRG(value.rg)}
                      disabled
                    />
                    <Input
                      label="Data de Emissão"
                      variant="default-optional"
                      initialValue={value.emissao}
                      disabled
                    />
                  </Row>
                </Dados>
                <DadosButton>Ver todos os dados</DadosButton>
              </div>
            </Card>
            <Card blue>
              <Title2>Meus Dependentes</Title2>
              <div className="card">
                Bom dia denovo
              </div>
            </Card>
          </CardsContainer>
        </ContentContainer>
      )}
    </Container>
  );
};

export default UserData;
