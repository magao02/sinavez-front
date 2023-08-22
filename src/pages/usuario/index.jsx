import { useRouter } from "next/router";

import { useState, useCallback, useEffect, forwardRef, useRef } from "react";

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
  BigCenteredPopup,
  ColorButton,
} from "../../styles/usuarioStyles";
import { Body2, Subtitle1, Subtitle2, Title1, Title2 } from "../../styles/commonStyles";
import Input from "../../components/commom/Input";
import { formatCPF, formatRG } from "../../utils/format";
import Button from "../../components/commom/Button";
import CancelIcon from "../../assets/cancel_icon.svg";
import EditIcon from "../../assets/edit.svg";
import TrashIcon from "../../assets/trash.svg";
import DependentsForm from "../../components/DependentsContainer";
import WomanExclamation from "../../assets/woman_exclamation.svg";


const BigConfirmPopup = ({ title, image, body, confirmText, cancelText, onConfirm, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });
    // ran when the component is destroyed
    return () => {
      document.body.style.overflow = "";
    };
  });

  return <>
    <BigCenteredPopup>
      <div className="background" />
      <div className="container">
        <article>
          <header>
            <Title1>{title}</Title1>
          </header>
          <section>
            { image && <img src={image} /> }
            <Subtitle1>{body}</Subtitle1>
          </section>
          <footer>
            { cancelText && <ColorButton transparent onClick={() => onCancel()}>{cancelText}</ColorButton> }
            { confirmText && <ColorButton onClick={() => onConfirm()}>{confirmText}</ColorButton> }
          </footer>
        </article>
      </div>
    </BigCenteredPopup>
  </>;
};

import * as validation from "../../utils/validation";

export const InputValue = forwardRef(({ ...rest }, ref) => {
  const valueRef = useRef(null);

  useEffect(() => {
    if (ref) {
      if (!ref.current) {
        ref.current = {};
      }
      ref.current.validate = () => valueRef.current?.validate();
      ref.current.hasChanged = false;
      ref.current.resetChanged = () => {
        ref.current.hasChanged = false;
      };
    }
  }, [valueRef]);

  const onChange = event => {
    if (ref) {
      ref.current.value = event.target.value;
      ref.current.hasChanged = true;
    }
  };

  return (
    <Input
      ref={valueRef}
      onChange={onChange}
      {...rest}
    />
  );
});


const UserDataPopup = ({ value, onClose }) => {
  const [editing, setEditing] = useState(false);
  const [triedCancel, setTriedCancel] = useState(false);
  const [triedClose, setTriedClose] = useState(false);
  const [showError, setShowError] = useState(false);

  // when not editing hide the required star
  const variantRequired = editing ? "default" : "default-optional";

  const handleClose = () => {
    if (editing) {
      setTriedClose(true);
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const refs = {
    name: useRef(null),
    profissao: useRef(null),
    cpf: useRef(null),
    rg: useRef(null),
    nascimento: useRef(null),
    emissao: useRef(null),
    regional: {
      naturalidade: useRef(null),
      nacionalidade: useRef(null),
      municipio: useRef(null),
      estado: useRef(null),
    },
    endereco: {
      rua: useRef(null),
      numero: useRef(null),
      bairro: useRef(null),
      complemento: useRef(null),
    },
    telefone: useRef(null),
    email: useRef(null),
    formacaoSuperior: useRef(null),
    dataFormacao: useRef(null),
    empresa: useRef(null),
    instituicaoSuperior: useRef(null),
    salario: useRef(null),
    numRegistroConselho: useRef(null),
    dataRegistroConselho: useRef(null),
    dataAfiliacao: useRef(null),
    numInscricao: useRef(null),
  };

  const authContext = useAuth();
  const router = useRouter();

  const handleSave = useCallback(async () => {
    setTriedCancel(false);
    setTriedClose(false);

    const valid = (await Promise.all(Object.keys(refs).map(async key => {
      if (key === 'regional' || key == 'endereco') {
        return (await Promise.all(Object.values(refs[key]).map(ref => ref.current.validate()))).every(x => !!x);
      } else {
        return await refs[key].current.validate();
      }
    }))).every(x => !!x);

    if (valid) {
      // save, then close and reload page
      const data = Object.fromEntries(Object.entries(refs).map(([key, value]) => {
        if (key === 'regional' || key == 'endereco') {
          return [key, Object.fromEntries(Object.entries(value).map(([k, ref]) => [k, ref.current.value]))];
        } else {
          return [key, value.current.value];
        }
      }));
      try {
        await service.setData(authContext.urlUser, data, authContext.token);
        setEditing(false);
        router.reload();
        onClose();
      } catch (err) {
        setShowError(true);
      }
    } else {
      // something was invalid
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [authContext, router]);

  return <>
    <DadosPopup>
      <div className="background" />
      <div className="modal">
        <header>
          <Title1>{ editing ? "Editar Dados" : "Meus Dados"}</Title1>
          <img src={CancelIcon.src} onClick={handleClose} />
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
                <InputValue
                  label="Nome completo"
                  variant={variantRequired}
                  initialValue={value.name}
                  disabled={!editing}
                  validate={validation.requiredTextField}
                  ref={refs.name}
                />
                <InputValue
                  label="Profissão"
                  variant={variantRequired}
                  initialValue={value.profissao}
                  disabled={!editing}
                  ref={refs.profissao}
                />
                <Row>
                  <InputValue
                    label="CPF"
                    variant={variantRequired}
                    initialValue={value.cpf}
                    disabled={!editing}
                    ref={refs.cpf}
                    validate={validation.testRequiredCpf}
                  />
                  <InputValue
                    label="Data de Nascimento"
                    variant={variantRequired}
                    initialValue={value.nascimento}
                    disabled={!editing}
                    ref={refs.nascimento}
                    validate={validation.testRequiredData}
                  />
                </Row>
                <Row>
                  <InputValue
                    label="Registro Geral (RG)"
                    variant={variantRequired}
                    initialValue={value.rg}
                    disabled={!editing}
                    ref={refs.rg}
                    validate={validation.testRequiredNumbers}
                  />
                  <Input
                    label="Data de Emissão"
                    variant={variantRequired}
                    initialValue={value.emissao}
                    disabled={!editing}
                    ref={refs.emissao}
                    validate={validation.testRequiredData}
                  />
                </Row>
                <Row>
                  <Input
                    label="Naturalidade"
                    variant="default-optional"
                    initialValue={value.regional.naturalidade}
                    disabled={!editing}
                    ref={refs.regional.naturalidade}
                  />
                  <Input
                    label="Nacionalidade"
                    variant="default-optional"
                    initialValue={value.regional.nacionalidade}
                    disabled={!editing}
                    ref={refs.regional.nacionalidade}
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
                    validate={validation.requiredTextField}
                    ref={refs.endereco.rua}
                  />
                  <Input
                    label="Número"
                    variant={variantRequired}
                    initialValue={value.endereco.numero}
                    disabled={!editing}
                    validate={validation.requiredTextField}
                    ref={refs.endereco.numero}
                  />
                </Row>
                <Row>
                  <Input
                    label="Bairro"
                    variant={variantRequired}
                    initialValue={value.endereco.bairro}
                    disabled={!editing}
                    validate={validation.requiredTextField}
                    ref={refs.endereco.bairro}
                  />
                  <Input
                    label="Complemento"
                    variant="default-optional"
                    initialValue={value.endereco.complemento}
                    disabled={!editing}
                    ref={refs.endereco.complemento}
                  />
                </Row>
                <Row>
                  <Input
                    label="Cidade"
                    variant={variantRequired}
                    initialValue={value.regional.municipio}
                    disabled={!editing}
                    validate={validation.requiredTextField}
                    ref={refs.regional.municipio}
                  />
                  <Input
                    label="Estado"
                    variant={variantRequired}
                    initialValue={value.regional.estado}
                    disabled={!editing}
                    validate={validation.requiredTextField}
                    ref={refs.regional.estado}
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
                    ref={refs.telefone}
                    validate={validation.testRequiredPhone}
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
                    ref={refs.email}
                    validate={validation.testEmail}
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
                  ref={refs.formacaoSuperior}
                />
                <Input
                  label="Data de Formação"
                  variant="default-optional"
                  initialValue={value.dataFormacao}
                  disabled={!editing}
                  ref={refs.dataFormacao}
                />
              </Dados>

              <Dados>
                <Subtitle2>Dados Empregatícios</Subtitle2>
                <Input
                  label="Organização ou empresa que trabalha"
                  variant="default-optional"
                  initialValue={value.empresa}
                  disabled={!editing}
                  ref={refs.empresa}
                />
                <Input
                  label="Instituição"
                  variant="default-optional"
                  initialValue={value.instituicaoSuperior}
                  disabled={!editing}
                  ref={refs.instituicaoSuperior}
                />
                <Input
                  label="Salário"
                  variant="default-optional"
                  initialValue={value.salario}
                  disabled={!editing}
                  ref={refs.salario}
                />
              </Dados>

              <Dados>
                <Subtitle2>Vínculo com a SINAVEZ</Subtitle2>
                <Input
                  label="Número de registro no conselho"
                  variant="default-optional"
                  initialValue={value.numRegistroConselho}
                  disabled={!editing}
                  ref={refs.numRegistroConselho}
                />
                <Input
                  label="Data de registro no conselho"
                  variant="default-optional"
                  initialValue={value.dataRegistroConselho}
                  disabled={!editing}
                  ref={refs.dataRegistroConselho}
                />
                <Input
                  label="Data da afiliação"
                  variant="default-optional"
                  initialValue={value.dataAfiliacao}
                  disabled={!editing}
                  ref={refs.dataAfiliacao}
                />
                <Input
                  label="Número de Inscrição"
                  variant="default-optional"
                  initialValue={value.numInscricao}
                  disabled={!editing}
                  ref={refs.numInscricao}
                />
              </Dados>
            </div>
          </div>
          { editing && <div className="confirm-buttons">
            <div className="cancel" onClick={() => setTriedCancel(true)}>CANCELAR</div>
            <Button onClick={handleSave}>SALVAR ALTERAÇÕES</Button>
          </div> }
        </article>
      </div>
    </DadosPopup>
    { triedCancel && <BigConfirmPopup
      title="Cancelar Alterações"
      image={WomanExclamation.src}
      body="Deseja realmente cancelar as alterações não salvas?"
      cancelText="CANCELAR ALTERAÇÕES"
      confirmText="SALVAR ALTERAÇÕES"
      onCancel={handleCancel}
      onConfirm={handleSave}
    /> }
    { triedClose && <BigConfirmPopup
      title="Alterações Não Salvas"
      image={WomanExclamation.src}
      body="Deseja sair sem salvar as alterações? "
      cancelText="CANCELAR ALTERAÇÕES"
      confirmText="SALVAR ALTERAÇÕES"
      onCancel={handleCancel}
      onConfirm={handleSave}
    /> }
    { showError && <BigConfirmPopup
      title="Erro Desconhecido"
      image={WomanExclamation.src}
      body="Houve um erro ao tentar salvar as alterações. Por favor tente novamente"
      cancelText="VOLTAR"
      onCancel={() => setShowError(false)}
    /> }
  </>;
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
