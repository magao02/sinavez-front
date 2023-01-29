import { useRef, useCallback, forwardRef, useEffect, useState } from "react";

import * as validation from "../../../utils/validation";
import { useAuth } from "../../../contexts/AuthContext";
import * as service from "../../../services/accounts";

import {
  Container,
  InputForm,
  InputContainer,
  ButtonContainer,
} from "./styles";

import Input from "../../commom/Input";
import Button from "../../commom/Button";
import Select from "../../commom/Select";
import MultiInput from "../../commom/MultiInput";

const FirstStepForm = ({ dataCollector, globalMessage, variant, urlAssociado }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const cpfRef = useRef(null);
  const passwordRef = useRef(null);
  const birthdayRef = useRef(null);
  const filiacaoRef = useRef(null);
  const rgRef = useRef(null);
  const dataEmissaoRef = useRef(null);
  const profissaoRef = useRef("Engenheiro Agrônomo");
  const ruaRef = useRef(null);
  const bairroRef = useRef(null);
  const complementoRef = useRef(null);
  const numeroRef = useRef(null);

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      nameRef,
      emailRef,
      passwordRef,
      phoneRef,
      birthdayRef,
      cpfRef,
      rgRef,
      dataEmissaoRef,
      filiacaoRef,
    ];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate())
    );

    return validationResults.every((result) => result === true);
  });

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const isValidSubmit = await allFieldsAreValid();

    if (!isValidSubmit) return;

    const [
      name,
      email,
      password,
      telefone,
      nascimento,
      cpf,
      rg,
      emissao,
      filiacao,
      profissao,
      rua,
      bairro,
      complemento,
      numero,
    ] = [
      nameRef,
      emailRef,
      passwordRef,
      phoneRef,
      birthdayRef,
      cpfRef,
      rgRef,
      dataEmissaoRef,
      filiacaoRef,
      profissaoRef,
      ruaRef,
      bairroRef,
      complementoRef,
      numeroRef,

    ].map((inputRef) => inputRef.current?.value);

    dataCollector({
      name,
      email,
      password,
      telefone,
      nascimento,
      cpf,
      rg,
      emissao,
      filiacao,
      profissao,
      endereco: { rua, bairro, complemento, numero },
    });
  });

  const authContext = useAuth();
  let [userData, setUserData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserData = useCallback(async () => {
    if (urlAssociado == "" || urlAssociado == undefined) {
      var url = authContext.urlUser;
    } else {
      var url = urlAssociado;
    }
    try {
      const responseData = await service.getUserData(
        url,
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
    setUserData(responseData);
    setIsLoaded(true);
  }, [getUserData]);

  useEffect(() => {
    getUserData();
    handleUserData();
  }, []);

  switch (variant) {
    case "signUp": {
      return (
        <Container>
          <InputForm onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                variant="signup"
                label="Nome"
                name="nome"
                placeholder="Digite seu nome completo"
                ref={nameRef}
                validate={validation.requiredTextField}
              />
              <Input
                variant="signup"
                label="Email"
                name="email"
                placeholder="email@domínio.com"
                ref={emailRef}
                validate={validation.testRequiredEmail}
              />
              <Input
                variant="signup"
                label="Senha"
                name="password"
                placeholder="Digite sua senha (8 dígitos)"
                type="password"
                ref={passwordRef}
                validate={validation.testRequiredPassword}
              />
              <Input
                variant="signup"
                label="Telefone"
                name="telefone"
                placeholder="***********"
                ref={phoneRef}
                validate={validation.testRequiredPhone}
              />
            </InputContainer>
            <InputContainer>
              <Input
                variant="signup"
                label="Data de Nascimento"
                name="nascimento"
                placeholder="DD/MM/AAAA"
                ref={birthdayRef}
                validate={validation.testDate}
              />
              <Input
                variant="signup"
                label="CPF"
                name="cpf"
                placeholder="Digite os números do seu CPF"
                ref={cpfRef}
                validate={validation.testRequiredCpf}
              />
              <Input
                variant="signup"
                label="RG"
                name="rg"
                placeholder="Digite os números do seu RG"
                ref={rgRef}
                validate={validation.testRequiredNumbers}
              />
              <Input
                variant="signup"
                label="Data De Emissão"
                name="data_de_emissão"
                placeholder="DD/MM/AAAA"
                ref={dataEmissaoRef}
                validate={validation.testDate}
              />
              <Input
                variant="signup"
                label="Filiação"
                name="filiação"
                placeholder="Digite o(s) nome(s) completo(s)"
                ref={filiacaoRef}
                validate={validation.requiredTextField}
              />
            </InputContainer>
            <InputContainer>
              <Select
                name="Profissões"
                ref={profissaoRef}
                profissoes={[
                  "Engenheiro Agrônomo",
                  "Engenheiro Florestal",
                  "Engenheiro de Pesca",
                  "Tecnólogo em Cooperativismo",
                  "Médico Veterinário",
                  "Zootecnista",
                  "Biólogo",
                  "Outro",
                ]}
              />
              <MultiInput
                label="Endereço"
                names={["Rua", "Bairro", "Complemento", "Número"]}
                refs={{
                  ruaRef,
                  bairroRef,
                  complementoRef,
                  numeroRef,
                }}
                validation={validation}
                variant="step1"
              />
              <ButtonContainer>
                {globalMessage && <span>{globalMessage}</span>}
                <Button variant="signup">Próxima Página</Button>
              </ButtonContainer>
            </InputContainer>
          </InputForm>
        </Container>
      );
    }
    case "editData": {
      return (
        <Container>
          {isLoaded && (
            <InputForm onSubmit={handleSubmit}>
              <InputContainer>
                <Input
                  variant="signup"
                  label="Nome"
                  name="nome"
                  placeholder={userData.name}
                  validate={validation.TextField}
                  ref={nameRef}
                />
                <Input
                  variant="signup"
                  label="Email"
                  name="email"
                  placeholder={userData.email}
                  ref={emailRef}
                  validate={validation.testEmail}
                />
                <Input
                  variant="signup"
                  validate={validation.testPassword}
                  label="Senha"
                  name="password"
                  placeholder="Digite sua senha (8 dígitos)"
                  type="password"
                  ref={passwordRef}
                />
                <Input
                  variant="signup"
                  validate={validation.testPhone}
                  label="Telefone"
                  name="telefone"
                  placeholder={userData.telefone}
                  ref={phoneRef}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  variant="signup"
                  label="Data de Nascimento"
                  validate={validation.testDate}
                  name="nascimento"
                  placeholder={userData.nascimento}
                  ref={birthdayRef}
                />
                <Input
                  variant="signup"
                  label="CPF"
                  name="cpf"
                  validate={validation.testCpf}
                  placeholder={userData.cpf}
                  ref={cpfRef}
                  disabled
                />
                <Input
                  variant="signup"
                  label="RG"
                  name="rg"
                  validate={validation.testNumbers}
                  placeholder={userData.rg}
                  ref={rgRef}
                />
                <Input
                  variant="signup"
                  label="Data De Emissão"
                  name="data_de_emissão"
                  placeholder={userData.emissao}
                  validate={validation.testDate}
                  ref={dataEmissaoRef}
                />
                <Input
                  variant="signup"
                  label="Filiação"
                  name="filiação"
                  placeholder={userData.filiacao}
                  ref={filiacaoRef}
                  validate={validation.TextField}
                />
              </InputContainer>
              <InputContainer>
                <Select
                  profissaoDefault={userData.profissao}
                  name="Profissões"
                  ref={profissaoRef}
                  profissoes={[
                    "Engenheiro Agrônomo",
                    "Engenheiro Florestal",
                    "Engenheiro de Pesca",
                    "Tecnólogo em Cooperativismo",
                    "Médico Veterinário",
                    "Zootecnista",
                    "Biólogo",
                    "Outro",
                  ]}
                />
                <MultiInput
                  label="Endereço"
                  names={["Rua", "Bairro", "Complemento", "Número"]}
                  placeholders={userData.endereco}
                  refs={{
                    ruaRef,
                    bairroRef,
                    complementoRef,
                    numeroRef,
                  }}
                  variant="step1"
                  validation={validation}
                />
                <ButtonContainer>
                  {globalMessage && <span>{globalMessage}</span>}
                  <Button variant="signup">Próxima Página</Button>
                </ButtonContainer>
              </InputContainer>
            </InputForm>)}
        </Container>
      );
    }
  }
};

export default FirstStepForm;
