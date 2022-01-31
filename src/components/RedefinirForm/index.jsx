import { useRef, useCallback } from "react";

import * as validation from "../../utils/validation";

import Input from "../commom/Input";
import Button from "../commom/Button";

import { FormContainer } from "./styles";

const RedefinirForm = ({ onValidSubmit, globalMessage }) => {
  const cpfRef = useRef(null);
  const passwordRef = useRef(null);

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [cpfRef, passwordRef];

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

      const [cpf, password] = [cpfRef, passwordRef].map(
        (inputRef) => inputRef.current?.value
      );

      onValidSubmit({ cpf, password });
    },
    [allFieldsAreValid, onValidSubmit]
  );

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        label="CPF"
        placeholder="Digite os números do seu CPF"
        variant="signup"
        ref={cpfRef}
        validate={validation.testCpf}
      />
      <Input
        type="password"
        label="Nova Senha"
        placeholder="Digite sua senha"
        variant="signup"
        ref={passwordRef}
        validate={validation.testPassword}
      />
      <Button variant="signup">Redefinir Senha</Button>
      {globalMessage && <span>{globalMessage}</span>}
    </FormContainer>
  );
};

export default RedefinirForm;
