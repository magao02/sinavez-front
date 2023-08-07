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

const DependentsForm = ({ submitForm, globalMessage, variant, url, token, depSingUpController, number, marginTop }) => {
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
        <Container variant="default">
          <SubTitle marginTop = {marginTop}>
            Dados do Dependente {number !== 0 ? number : ""}
          </SubTitle>
          <Input
            variant="default"
            label={"Nome Completo"}
            name={"nome_completo"}
            placeholder={"Nome Completo"}
            validate={validation.requiredTextField}
          />
          <Input
            variant="default-optional"
            label={"Data de nascimento"}
            name={"data_de_nascimento"}
            placeholder={"DD/MM/AAAA"}
            validate={validation.testDate}
          />
          <Input
            variant="default"
            label={"CPF"}
            name={"cpf"}
            placeholder={"000.000.000-0"}
            validate={validation.testCpf}
          />
          <Input
            variant="default-optional"
            label={"RG"}
            name={"rg"}
            placeholder={"Digite o RG do dependente"}
            validate={validation.TextField}
          />
          <Input
            variant="default-optional"
            label={"Data de emissão"}
            name={"data_de_emissao"}
            placeholder={"DD/MM/AAAA"}
            validate={validation.testDate}
          />
          <Input
            variant="default"
            label={"Parentesco"}
            name={"parentesco"}
            placeholder={"Filho/Filha/Neto/etc"}
            validate={validation.TextField}
          />
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
                variant="signup-optional"
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
                variant="signup-optional"
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
