import { useCallback, useRef } from "react";

import { InputContainer, Link } from "./styles";
import * as validation from "../../utils/validation";

import Button from "../commom/Button";
import Input from "../commom/Input";

const LoginForm = () => {
  const cpfRef = useRef(null);
  const passwordRef = useRef(null);

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [cpfRef, passwordRef];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate()),
    );

    return validationResults.every((result) => result === true);
  })

  const validateCpf = useCallback(async (cpf) => {
    await validation.requireCpfField(cpf, 11)
  }, [])

  const validatePassword = useCallback(async (password) => {
    await validation.requirePasswordField(password, 8)
  }, [])

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    console.log(cpfRef.current.value, passwordRef.current.value);
    
    const isValidSubmit = await allFieldsAreValid();
    console.log(isValidSubmit)
  });

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Input
        variant="default"
        label="CPF"
        name="cpf"
        type="number"
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
        required
      />

      <Link href="/senha">esqueceu sua senha?</Link>

      <Button variant="default">Entrar</Button>
    </InputContainer>
  );
};

export default LoginForm;
