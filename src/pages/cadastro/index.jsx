import { Container, MainContent, InputForm, InputContainer } from './styles';

import Navigation from '../../components/commom/Nav';
import Input from '../../components/commom/Input';
import Select from '../../components/commom/Select';
import MultiInput from '../../components/commom/MultiInput';
import Button from '../../components/commom/Button';

const SignUpPage = () => (
    <Container>
        <Navigation variant="singup" />
        <MainContent>
            <InputForm>
                <InputContainer>
                    <Input variant="signup" label="Nome" name="nome" placeholder="Digite seu nome completo" />
                    <Input variant="signup" label="Email" name="email" placeholder="email@domínio.com" />
                    <Input variant="signup" label="Telefone" name="telefone" placeholder="(**) - ********" />
                    <Input variant="signup" label="Data de Nascimento" name="data_de_nascimento" placeholder="DD/MM/AAAA"/>
                </InputContainer>
                <InputContainer>
                    <Input variant="signup" label="CPF" name="cpf" placeholder="***.***.***-**" />
                    <Input variant="signup" label="RG" name="rg" placeholder="*******.*" />
                    <Input variant="signup" label="Data De Emissão" name="data_de_emissão" placeholder="DD/MM/AAAA" />
                    <Input variant="signup" label="Data de Filiação" name="filiação" placeholder="Digite o(s) nome(s) completo(s)"/>
                </InputContainer>
                <InputContainer>
                    <Select name="Profissão" profissoes={["lenhador", "pescador"]}></Select>
                    <MultiInput label="Endereço" names= {["Rua", "Bairro", "Complemento", "Número", "Brasileiro?" ]}></MultiInput>
                    <Button variant="signup">Próxima Página</Button>
                </InputContainer>
            </InputForm>
        </MainContent>
    </Container>
);

export default SignUpPage;