import { InputContainer, Link } from './styles';

import Button from '../commom/Button';
import Input from '../commom/Input';

const LoginForm = () => (
  <InputContainer>
        <Input
          variant="default"
          label="CPF"
          name="CPF"
          placeholder="Números do cpf"
        />
        <Input
          variant="default"
          label="Senha"
          name="Senha"
          placeholder="********"
        />

        <Link href="/senha">esqueceu sua senha?</Link>

        <Button variant="default">Entrar</Button>
      </InputContainer>
);

export default LoginForm;