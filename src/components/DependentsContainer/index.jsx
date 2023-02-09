import { useRef, useCallback } from "react";

import { useAdmin } from "../../contexts/AdminContext";

import * as validation from "../../utils/validation";

import Input from "../commom/Input";
import Button from "../commom/Button";

import {
  Container,
  Header,
  Form,
  Title,
  SubTitle,
  FormContainer,
} from "./styles";

const DependentsForm = ({ submitForm, globalMessage, variant, url, token, depSingUpController }) => {
  const nameRef = useRef(null);
  const cpfRef = useRef(null);
  const birthdayRef = useRef(null);
  const rgRef = useRef(null);
  const dataEmissaoRef = useRef(null);

  const adminContext = useAdmin();

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [nameRef,
      birthdayRef,
      cpfRef,
      rgRef,
      dataEmissaoRef
    ];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate())
    );

    return validationResults.every((result) => result === true);
  });

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const isValidSubmit = await allFieldsAreValid();

      if (!isValidSubmit) return;

      const [name, nascimento, cpf, rg, emissao] = [
        nameRef,
        birthdayRef,
        cpfRef,
        rgRef,
        dataEmissaoRef,
      ].map((inputRef) => inputRef.current?.value);

      if (variant == "admin") {
        adminContext.createDependentOnUser({
          name,
          nascimento,
          cpf,
          rg,
          emissao,
        }, url, token);
        return;
      }
      submitForm({ name, nascimento, cpf, rg, emissao });
    },
    [allFieldsAreValid, submitForm]
  );

  switch (variant) {
    case "default": {
      return (
        <Container>
          <Button variant="image"></Button>
          <Header>
            <Title>Cadastrar Dependente</Title>
          </Header>
          <Form onSubmit={handleSubmit}>
            <FormContainer>
              <Input
                type="text"
                label="Nome"
                placeholder="Digite seu nome completo"
                variant="signup"
                ref={nameRef}
                validate={validation.requiredTextField}
              />
              <Input
                type="text"
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
                variant="signup"
                ref={birthdayRef}
                validate={validation.testDate}
              />
              <Input
                type="text"
                label="CPF"
                placeholder="Digite apenas os números do CPF"
                variant="signup-optional"
                ref={cpfRef}
                validate={validation.testCpf}
              />
            </FormContainer>
            <FormContainer>
              <Input
                type="text"
                label="RG"
                placeholder="Digite os números do seu RG"
                variant="signup-optional"
                ref={rgRef}
                validate={validation.testNumbers}
              />
              <Input
                type="text"
                label="Data de Emissão"
                placeholder="DD/MM/AAAA"
                variant="signup"
                ref={dataEmissaoRef}
                validate={validation.testDate}
              />
              <Button variant="signup">Cadastrar Dependente</Button>
              {globalMessage && <span>{globalMessage}</span>}
            </FormContainer>
          </Form>
        </Container>
      );
    }
    case "admin": {
      return (
        <Container variant="admin">
          <Button variant={"close"} onClick={() => window.location.reload(true)}>
            &#10005;
          </Button>
          <Header>
            <Title>Cadastrar Dependente</Title>
            <SubTitle>{adminContext.associado.name}</SubTitle>
          </Header>
          <Form onSubmit={handleSubmit}>
            <FormContainer>
              <Input
                type="text"
                label="Nome"
                placeholder="Digite seu nome completo"
                variant="signup"
                ref={nameRef}
                validate={validation.requiredTextField}
              />
              <Input
                type="text"
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
                variant="signup"
                ref={birthdayRef}
                validate={validation.testDate}
              />
              <Input
                type="text"
                label="CPF"
                placeholder="Digite apenas os números do CPF"
                variant="signup-optional"
                ref={cpfRef}
                validate={validation.testCpf}
              />
            </FormContainer>
            <FormContainer>
              <Input
                type="text"
                label="RG"
                placeholder="Digite os números do seu RG"
                variant="signup-optional"
                ref={rgRef}
                validate={validation.testNumbers}
              />
              <Input
                type="text"
                label="Data de Emissão"
                placeholder="DD/MM/AAAA"
                variant="signup"
                ref={dataEmissaoRef}
                validate={validation.testDate}
              />
              <Button variant="signup">Cadastrar Dependente</Button>
              {adminContext.globalMessage && (
                <span>{adminContext.globalMessage}</span>
              )}
            </FormContainer>
          </Form>
        </Container>
      );
    }
  }
};

export default DependentsForm;
