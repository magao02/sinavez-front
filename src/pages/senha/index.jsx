import Image from 'next/image';
import { Container, ContentSection, PasswordSection, DecorativeSection, Title, Subtitle, Greetings } from './styles';

import SinavezLogo from '../../assets/logo_picture.svg'
import Input from '../../components/PasswordInput';
import Button from '../../components/commom/Button'

const PasswordRecovery = () => (
    <Container>
        <ContentSection>
            <PasswordSection>
                <Image src={SinavezLogo}/>
                <Greetings>
                    <Title>Esqueceu sua senha?</Title>
                    <Subtitle>Por favor, digite seu endereço de e-mail que você usou durante a criação da sua conta. Nós mandaremos instruções para redefinir sua senha.</Subtitle>
                </Greetings>
                <Input label="E-MAIL" required></Input>
                <Button variant="password">Enviar</Button>
            </PasswordSection>
            <DecorativeSection>
            </DecorativeSection>
        </ContentSection>
    </Container>
);

export default PasswordRecovery;