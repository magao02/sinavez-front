import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";

import {
  Container,
  ContentContainer,
  CardsContainer,
  Card,
  Dados,
  Row,
  Tabs,
  Tab,
  DadosButton,
  DadosPopup,
} from "../../styles/usuarioStyles";
import { Subtitle1, Subtitle2, Title1, Title2 } from "../../styles/commonStyles";
import Input from "../../components/commom/Input";
import { formatCPF, formatRG } from "../../utils/format";
import Button from "../../components/commom/Button";
import CancelIcon from "../../assets/cancel_icon.svg";

const UserDataPopup = ({ value, onClose }) => {
  return (
    <DadosPopup>
      <div className="background" />
      <div className="modal">
        <header>
          <Title1>Meus Dados</Title1>
          <img src={CancelIcon.src} onClick={() => onClose()} />
        </header>
        <article>
          <header>
            <div className="perfil">
              <img src="https://source.unsplash.com/random/300x300?abstract" />
              <div>
                <Title2>{value.name}</Title2>
                <Subtitle2>{value.profissao}</Subtitle2>
              </div>
            </div>
            <div>
              <Button>EDITAR DADOS</Button>
            </div>
          </header>
          <div className="columns">
            <div className="column">
              <Dados>
                <Subtitle2>Dados Pessoais</Subtitle2>
                <Input
                  label="Nome completo"
                  variant="default-optional"
                  initialValue={value.name}
                  disabled
                />
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
                <Row>
                  <Input
                    label="Naturalidade"
                    variant="default-optional"
                    initialValue={value.regional.naturalidade}
                    disabled
                  />
                  <Input
                    label="Nacionalidade"
                    variant="default-optional"
                    initialValue={value.regional.nacionalidade}
                    disabled
                  />
                </Row>
              </Dados>
              <Dados>
                <Subtitle2>Endereço</Subtitle2>
                <Row>
                  <Input
                    label="Nome da Rua"
                    variant="default-optional"
                    initialValue={value.endereco.rua}
                    disabled
                  />
                  <Input
                    label="Número"
                    variant="default-optional"
                    initialValue={value.endereco.numero}
                    disabled
                  />
                </Row>
                <Row>
                  <Input
                    label="Bairro"
                    variant="default-optional"
                    initialValue={value.endereco.bairro}
                    disabled
                  />
                  <Input
                    label="Complemento"
                    variant="default-optional"
                    initialValue={value.endereco.complemento}
                    disabled
                  />
                </Row>
                <Row>
                  <Input
                    label="Cidade"
                    variant="default-optional"
                    initialValue={value.regional.municipio}
                    disabled
                  />
                  <Input
                    label="Estado"
                    variant="default-optional"
                    initialValue={value.regional.estado}
                    disabled
                  />
                </Row>
              </Dados>
              <Dados>
                <Subtitle2>Dados cadastrais</Subtitle2>
                <Row>
                  <Input
                    label="Celular"
                    variant="default-optional"
                    initialValue={value.telefone}
                    disabled
                  />
                  <Input
                    label="Telefone Fixo"
                    variant="default-optional"
                    disabled
                  />
                </Row>
                <Row>
                  <Input
                    label="E-mail"
                    variant="default-optional"
                    initialValue={value.email}
                    disabled
                  />
                  <Input
                    label="Senha"
                    variant="default-optional"
                    initialValue="oxente"
                    disabled
                  />
                </Row>
              </Dados>
            </div>

            <div className="column">
              <Dados>
                <Subtitle2>Dados Acadêmicos</Subtitle2>
                <Input
                  label="Curso de Formação"
                  variant="default-optional"
                  initialValue={value.formacaoSuperior}
                  disabled
                />
                <Input
                  label="Data de Formação"
                  variant="default-optional"
                  initialValue={value.dataFormacao}
                  disabled
                />
              </Dados>

              <Dados>
                <Subtitle2>Dados Empregatícios</Subtitle2>
                <Input
                  label="Organização ou empresa que trabalha"
                  variant="default-optional"
                  initialValue={value.empresa}
                  disabled
                />
                <Input
                  label="Instituição"
                  variant="default-optional"
                  initialValue={value.instituicaoSuperior}
                  disabled
                />
                <Input
                  label="Salário"
                  variant="default-optional"
                  initialValue={value.salario}
                  disabled
                />
              </Dados>

              <Dados>
                <Subtitle2>Vínculo com a SINAVEZ</Subtitle2>
                <Input
                  label="Número de registro no conselho"
                  variant="default-optional"
                  initialValue={value.numRegistroConselho}
                  disabled
                />
                <Input
                  label="Data de registro no conselho"
                  variant="default-optional"
                  initialValue={value.dataRegistroConselho}
                  disabled
                />
                <Input
                  label="Data da afiliação"
                  variant="default-optional"
                  initialValue={value.dataAfiliacao}
                  disabled
                />
                <Input
                  label="Número de Inscrição"
                  variant="default-optional"
                  initialValue={value.numInscricao}
                  disabled
                />
              </Dados>
            </div>
          </div>
        </article>
      </div>
    </DadosPopup>
  )
};

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

  const [tabIndex, setTabIndex] = useState(0);
  const [viewingPopup, setViewingPopup] = useState(false);

  return (
    <Container>
      <Navigation variant={checkNav()} />
      {isLoaded && (
        <ContentContainer>
          <CardsContainer>
            <Card>
              <Title2>Meus Dados</Title2>
              <div className="card">
                <img src="https://source.unsplash.com/random/300x300?abstract" />
                <Subtitle1>{value.name}</Subtitle1>
                <Tabs>
                  {
                    ["Dados Pessoais", "Contato", "Endereço"].map((name, i) => 
                      <Tab key={name} selected={tabIndex === i} onClick={_ => setTabIndex(i)}>{name}</Tab>
                    )
                  }
                </Tabs>
                { tabIndex === 0 && <Dados fill>
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
                </Dados> }

                { tabIndex === 1 && <Dados fill>
                  <Input
                    label="Celular"
                    variant="default-optional"
                    initialValue={value.telefone}
                    disabled
                  />
                  {/* TODO: telefone fixo */}
                  <Input
                    label="Telefone Fixo"
                    variant="default-optional"
                    initialValue=""
                    disabled
                  />
                  <Row>
                    <Input
                      label="E-mail"
                      variant="default-optional"
                      initialValue={value.email}
                      disabled
                    />
                    <Input
                      label="Senha"
                      variant="default-optional"
                      initialValue="????? oxe"
                      disabled
                    />
                  </Row>
                </Dados> }

                { tabIndex === 2 && <Dados fill>
                  <Input
                    label="Nome da Rua"
                    variant="default-optional"
                    initialValue={value.endereco.rua}
                    disabled
                  />
                  <Row>
                    <Input
                      label="Bairro"
                      variant="default-optional"
                      initialValue={value.endereco.bairro}
                      disabled
                    />
                    <Input
                      label="Número"
                      variant="default-optional"
                      initialValue={value.endereco.numero}
                      disabled
                    />
                  </Row>
                  <Row>
                    <Input
                      label="Cidade"
                      variant="default-optional"
                      initialValue={value.regional.municipio}
                      disabled
                    />
                    <Input
                      label="Estado"
                      variant="default-optional"
                      initialValue={value.regional.estado}
                      disabled
                    />
                  </Row>
                </Dados> }
                <DadosButton onClick={() => setViewingPopup(true)}>Ver todos os dados</DadosButton>
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
      { viewingPopup && <UserDataPopup value={value} onClose={() => setViewingPopup(false)} /> }
    </Container>
  );
};

export default UserData;
