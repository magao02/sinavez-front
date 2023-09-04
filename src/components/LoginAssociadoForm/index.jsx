import { useCallback, useRef } from "react";

import { InputContainer, Link, ButtonContainer, Description, InputBox, LinkBox } from "./styles";
import * as validation from "../../utils/validation";

import Button from "../commom/Button";
import Input from "../commom/Input";

const LoginAssociadoForm = ({ onValidSubmit, globalMessage }) => {
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
      <InputBox>
        <Input
          variant="default"
          label="Usuário"
          name="cpf"
          placeholder="000.000.000-00"
          ref={cpfRef}
          validate={validateCpf}
        />
        <Description>
          Digite o seu CPF no campo acima.
        </Description>
      </InputBox>
      <InputBox>
        <Input
          variant="default"
          label="Senha"
          name="password"
          type="password"
          placeholder="Insira sua senha"
          ref={passwordRef}
          validate={validatePassword}
        />
        <Description>
          Digite a sua senha no campo acima.
        </Description>
      </InputBox>

      <LinkBox>
        Novo por aqui? <Link href="/cadastro">Criar conta</Link>
      </LinkBox>
      <Link href="/loginAdmin">Login Administrador</Link>
      <ButtonContainer>
        {globalMessage && <a>{globalMessage}</a>}
        <Button variant="default">ENTRAR</Button>
      </ButtonContainer>
    </InputContainer>
  );
};

export default LoginAssociadoForm;
