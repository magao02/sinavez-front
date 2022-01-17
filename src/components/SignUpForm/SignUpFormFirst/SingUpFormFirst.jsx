import { Container, InputForm, InputContainer, ButtonContainer } from "./styles";

import Input from "../../commom/Input";
import Button from "../../commom/Button";

const SignUpFormFirst = () => {
  return (
    <Container>
      <InputForm>
        <InputContainer>
          <Input
            variant="signup"
            label="Nome"
            name="nome"
            placeholder="Digite seu nome completo"
          />
          <Input
            variant="signup"
            label="Email"
            name="email"
            placeholder="email@domínio.com"
          />
          <Input
            variant="signup"
            label="Telefone"
            name="telefone"
            placeholder="(**) - ********"
          />
        </InputContainer>
        <InputContainer>
          <Input
            variant="signup"
            label="CPF"
            name="cpf"
            placeholder="***.***.***-**"
          />
          <Input
            variant="signup"
            label="Senha"
            name="password"
            placeholder="Digite sua senha (8 dígitos)"
          />
          <Input
            variant="signup"
            label="Data de Nascimento"
            name="nascimento"
            placeholder="DD/MM/AAAA"
          />
        </InputContainer>
      </InputForm>
      <ButtonContainer>
        <Button variant="signup">Próxima Página</Button>
      </ButtonContainer>
    </Container>
  );
};

export default SignUpFormFirst;
