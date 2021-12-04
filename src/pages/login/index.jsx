import { Container, LoginSection, GreetingsContainer, Title, SubTitle, InputContainer, Link, Center, DecorativeSection } from './styles';
import Input from '../../components/commom/Input';
import Button from '../../components/commom/Button';


const LoginPage = () => (
    <Container>
        <LoginSection>
            <GreetingsContainer>
                <Title>Login</Title>
                <SubTitle>Seja bem-vindo de volta!</SubTitle>
            </GreetingsContainer>

            <InputContainer>
                <Input label="CPF" name="CPF" placeholder="Números do cpf" />
                <Input label="Senha" name="Senha" placeholder="********" />
            </InputContainer>

           <Link href="/senha">esqueceu sua senha?</Link>

           <Button variant='default'>Entrar</Button>

            <Center>
                <span>Não possui uma conta?</span>
                <Link href="/cadastro">Criar Conta</Link>
            </Center>

        </LoginSection>

        <DecorativeSection>
        </DecorativeSection>


    </Container>
);

export default LoginPage;