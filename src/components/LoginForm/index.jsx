import { useCallback, useRef } from "react";

import { InputContainer, Link, ButtonContainer } from "./styles";
import * as validation from "../../utils/validation";

import Button from "../commom/Button";
import Input from "../commom/Input";

const LoginForm = ({ onValidSubmit, globalMessage }) => {
  const cpfRef = useRef(null);
  const passwordRef = useRef(null);

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [cpfRef, passwordRef];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate())
    );

    return validationResults.every((result) => result === true);
  }, []);

  const validateCpf = useCallback(async (cpf) => {
    await validation.testRequiredCpf(cpf);
  }, []);

  const validatePassword = useCallback(async (password) => {
    await validation.testPassword(password, 8);
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const isValidSubmit = await allFieldsAreValid();

    if (!isValidSubmit) return;

    const [cpf, password] = [cpfRef, passwordRef].map(
      (inputRef) => inputRef.current?.value
    );

    onValidSubmit({ cpf, password });
  }, [allFieldsAreValid, onValidSubmit]);

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Input
        variant="default"
        label="CPF"
        name="cpf"
        placeholder="Números do cpf"
        ref={cpfRef}
        validate={validateCpf}
      />
      <Input
        variant="default"
        label="Senha"
        name="password"
        type="password"
        placeholder="********"
        ref={passwordRef}
        validate={validatePassword}
      />

      <Link href="/senha">esqueceu sua senha?</Link>
      <ButtonContainer>
        {globalMessage && <a>{globalMessage}</a>}
        <Button variant="default">Entrar</Button>
      </ButtonContainer>
    </InputContainer>
  );
};

export default LoginForm;
