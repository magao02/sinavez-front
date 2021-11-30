import Image from 'next/image';

import { Container, LoginSection, TitleContainer, Title, SubTitle, Link, DecorativeSection } from './styles';
import Input from '../../components/commom/Input';
import Button from '../../components/commom/Button';
import FachadaSinavez from '../../assets/home_picture.svg';

const LoginPage = () => (
    <Container>
        <LoginSection>

            <TitleContainer>
                <Title>Login</Title>
                <SubTitle>Seja bem-vindo de volta!</SubTitle>
            </TitleContainer>
            
           <Input label="CPF" name="CPF" placeholder="Números do cpf" />
           <Input label="Senha" name="Senha" placeholder="********" />

           <Link href="/senha">esqueceu sua senha?</Link>

           <Button>Entrar</Button>

        </LoginSection>



        <DecorativeSection>
            <Image src={FachadaSinavez} alt="Fachada Sinavez" />
        </DecorativeSection>


    </Container>
);

export default LoginPage;