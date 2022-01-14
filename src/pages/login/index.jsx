import {
  Container,
  LoginSection,
  GreetingsContainer,
  Title,
  SubTitle,
  Link,
  Center,
  DecorativeSection,
} from "./styles";

import LoginForm from '../../components/LoginForm';

const LoginPage = () => (
  <Container>
    <LoginSection>
      <GreetingsContainer>
        <Title>Login</Title>
        <SubTitle>Seja bem-vindo de volta!</SubTitle>
      </GreetingsContainer>
      <LoginForm />
      <Center>
        <span>Não possui uma conta?</span>
        <Link href="/cadastro">Criar Conta</Link>
      </Center>
    </LoginSection>

    <DecorativeSection></DecorativeSection>
  </Container>
);

export default LoginPage;
