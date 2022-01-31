import { useRef, useCallback, forwardRef } from "react";

import * as validation from "../../../utils/validation";

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

const FirstStepForm = ({ dataCollector, globalMessage }) => {
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
  const numeroRef = useRef(" ");

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      nameRef,
      emailRef,
      phoneRef,
      cpfRef,
      passwordRef,
      birthdayRef,
      filiacaoRef,
      rgRef,
      dataEmissaoRef,
      ruaRef,
      bairroRef,
      complementoRef,
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

    // console.log({
    //   name,
    //   email,
    //   password,
    //   telefone,
    //   nascimento,
    //   cpf,
    //   rg,
    //   emissao,
    //   filiacao,
    //   profissao,
    //   endereco: { rua, bairro, complemento, numero },
    // });
  });

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
            validate={validation.testEmail}
          />
          <Input
            variant="signup"
            label="Senha"
            name="password"
            placeholder="Digite sua senha (8 dígitos)"
            type="password"
            ref={passwordRef}
            validate={validation.testPassword}
          />
          <Input
            variant="signup"
            label="Telefone"
            name="telefone"
            placeholder="(**) *****-****"
            ref={phoneRef}
            validate={validation.testPhone}
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
            placeholder="xxx.xxx.xxx-xx"
            ref={cpfRef}
            validate={validation.testCpf}
          />
          <Input
            variant="signup"
            label="RG"
            name="rg"
            placeholder="Digite os números do seu RG"
            ref={rgRef}
            validate={validation.testNumbers}
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
};

export default FirstStepForm;
