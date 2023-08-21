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
  Dependentes,
  DependenteCell,
} from "../../styles/usuarioStyles";
import { Body2, Subtitle1, Subtitle2, Title1, Title2 } from "../../styles/commonStyles";
import Input from "../../components/commom/Input";
import { formatCPF, formatRG } from "../../utils/format";
import Button from "../../components/commom/Button";
import CancelIcon from "../../assets/cancel_icon.svg";
import EditIcon from "../../assets/edit.svg";
import TrashIcon from "../../assets/trash.svg";
import DependentsForm from "../../components/DependentsContainer";

const UserDataPopup = ({ value, onClose }) => {
  const [editing, setEditing] = useState(false);

  // when not editing hide the required star
  const variantRequired = editing ? "default" : "default-optional";

  return (
    <DadosPopup>
      <div className="background" />
      <div className="modal">
        <header>
          <Title1>{ editing ? "Editar Dados" : "Meus Dados"}</Title1>
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
              { !editing && <Button onClick={() => setEditing(true)}>EDITAR DADOS</Button> }
            </div>
          </header>
          <div className="columns">
            <div className="column">
              <Dados>
                <Subtitle2>Dados Pessoais</Subtitle2>
                <Input
                  label="Nome completo"
                  variant={variantRequired}
                  initialValue={value.name}
                  disabled={!editing}
                />
                <Input
                  label="Profissão"
                  variant={variantRequired}
                  initialValue={value.profissao}
                  disabled={!editing}
                />
                <Row>
                  <Input
                    label="CPF"
                    variant={variantRequired}
                    initialValue={formatCPF(value.cpf)}
                    disabled={!editing}
                  />
                  <Input
                    label="Data de Nascimento"
                    variant={variantRequired}
                    initialValue={value.nascimento}
                    disabled={!editing}
                  />
                </Row>
                <Row>
                  <Input
                    label="Registro Geral (RG)"
                    variant={variantRequired}
                    initialValue={formatRG(value.rg)}
                    disabled={!editing}
                  />
                  <Input
                    label="Data de Emissão"
                    variant={variantRequired}
                    initialValue={value.emissao}
                    disabled={!editing}
                  />
                </Row>
                <Row>
                  <Input
                    label="Naturalidade"
                    variant="default-optional"
                    initialValue={value.regional.naturalidade}
                    disabled={!editing}
                  />
                  <Input
                    label="Nacionalidade"
                    variant="default-optional"
                    initialValue={value.regional.nacionalidade}
                    disabled={!editing}
                  />
                </Row>
              </Dados>
              <Dados>
                <Subtitle2>Endereço</Subtitle2>
                <Row>
                  <Input
                    label="Nome da Rua"
                    variant={variantRequired}
                    initialValue={value.endereco.rua}
                    disabled={!editing}
                  />
                  <Input
                    label="Número"
                    variant={variantRequired}
                    initialValue={value.endereco.numero}
                    disabled={!editing}
                  />
                </Row>
                <Row>
                  <Input
                    label="Bairro"
                    variant={variantRequired}
                    initialValue={value.endereco.bairro}
                    disabled={!editing}
                  />
                  <Input
                    label="Complemento"
                    variant="default-optional"
                    initialValue={value.endereco.complemento}
                    disabled={!editing}
                  />
                </Row>
                <Row>
                  <Input
                    label="Cidade"
                    variant={variantRequired}
                    initialValue={value.regional.municipio}
                    disabled={!editing}
                  />
                  <Input
                    label="Estado"
                    variant={variantRequired}
                    initialValue={value.regional.estado}
                    disabled={!editing}
                  />
                </Row>
              </Dados>
              <Dados>
                <Subtitle2>Dados cadastrais</Subtitle2>
                <Row>
                  <Input
                    label="Celular"
                    variant={variantRequired}
                    initialValue={value.telefone}
                    disabled={!editing}
                  />
                  <Input
                    label="Telefone Fixo"
                    variant="default-optional"
                    disabled={!editing}
                  />
                </Row>
                <Row>
                  <Input
                    label="E-mail"
                    variant={variantRequired}
                    initialValue={value.email}
                    disabled={!editing}
                  />
                  <Input
                    label="Senha"
                    variant={variantRequired}
                    initialValue="oxente"
                    disabled={!editing}
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
                  disabled={!editing}
                />
                <Input
                  label="Data de Formação"
                  variant="default-optional"
                  initialValue={value.dataFormacao}
                  disabled={!editing}
                />
              </Dados>

              <Dados>
                <Subtitle2>Dados Empregatícios</Subtitle2>
                <Input
                  label="Organização ou empresa que trabalha"
                  variant="default-optional"
                  initialValue={value.empresa}
                  disabled={!editing}
                />
                <Input
                  label="Instituição"
                  variant="default-optional"
                  initialValue={value.instituicaoSuperior}
                  disabled={!editing}
                />
                <Input
                  label="Salário"
                  variant="default-optional"
                  initialValue={value.salario}
                  disabled={!editing}
                />
              </Dados>

              <Dados>
                <Subtitle2>Vínculo com a SINAVEZ</Subtitle2>
                <Input
                  label="Número de registro no conselho"
                  variant="default-optional"
                  initialValue={value.numRegistroConselho}
                  disabled={!editing}
                />
                <Input
                  label="Data de registro no conselho"
                  variant="default-optional"
                  initialValue={value.dataRegistroConselho}
                  disabled={!editing}
                />
                <Input
                  label="Data da afiliação"
                  variant="default-optional"
                  initialValue={value.dataAfiliacao}
                  disabled={!editing}
                />
                <Input
                  label="Número de Inscrição"
                  variant="default-optional"
                  initialValue={value.numInscricao}
                  disabled={!editing}
                />
              </Dados>
            </div>
          </div>
          { editing && <div className="confirm-buttons">
            <div className="cancel">CANCELAR</div>
            <Button>SALVAR ALTERAÇÕES</Button>
          </div> }
        </article>
      </div>
    </DadosPopup>
  )
};


const AddDependentPopup = ({ onClose }) => {
  return <>
    <DadosPopup>
      <div className="background" />
      <div className="modal">
        <header>
          <Title1>Adicionar Dependente</Title1>
          <img src={CancelIcon.src} onClick={() => onClose()} />
        </header>
        <article>
          <DependentsForm variant="default" submitForm={() => onClose()} />
        </article>
      </div>
    </DadosPopup>
  </>;
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
  const [viewingAddDependent, setViewingAddDependent] = useState(false);

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
              <div className="card dependentes">
                <Dependentes>
                  {
                    ["Jose da silva alguma coisa", "Bernadete dantas", "Luis figueredo alguma coisa"].map(name => <DependenteCell>
                      <Body2 className="nome">{name}</Body2>
                      <Body2 className="parentesco">Filho</Body2>
                      <div className="icons">
                        <img src={EditIcon.src} />
                        <img src={TrashIcon.src} />
                      </div>
                    </DependenteCell>)
                  }
                </Dependentes>
                <div className="align-right">
                  <Button onClick={() => setViewingAddDependent(true)}>ADICIONAR DEPENDENTE</Button>
                </div>
              </div>
            </Card>
          </CardsContainer>
        </ContentContainer>
      )}
      { viewingAddDependent && <AddDependentPopup onClose={() => setViewingAddDependent(false)} /> }
      { viewingPopup && <UserDataPopup value={value} onClose={() => setViewingPopup(false)} /> }
    </Container>
  );
};

export default UserData;
