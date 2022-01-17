import { Container, InputForm, InputContainer, ButtonContainer } from "./styles";

import Input from "../../commom/Input";
import Button from "../../commom/Button";
import Select from '../../commom/Select'
import MultiInput from '../../commom/MultiInput';

const SignUpFormSecond = () => {
  return (
    <Container>
      <InputForm>
        <InputContainer>
          <Input
            variant="signup"
            label="Filiação"
            name="filiation"
            placeholder="Digite o(s) nome(s) completo(s)"
          />
          <Input
            variant="signup"
            label="RG"
            name="rg"
            placeholder="Digite os números do seu RG"
          />
          <Input
            variant="signup"
            label="Data de Emissão"
            name="emissionDate"
            placeholder="DD/MM/AA"
          />
        </InputContainer>
        <InputContainer>
          <Select 
         name="Profissões"
         profissoes={
           ["Engenheiro Agrônomo", "Engenheiro Florestal", "Engenheiro de Pesca", "Tecnólogo em Cooperativismo", "Médico Veterinário", "Zootecnista", "Biólogo", "Outro"]}
         />
          <MultiInput 
          label="Endereço"
          names={["Rua", "Bairro", "Complemento", "Número", "Sem Número?"]}
          />
        </InputContainer>
      </InputForm>
      <ButtonContainer>
        <Button variant="signup">Próxima Página</Button>
      </ButtonContainer>
    </Container>
  );
};

export default SignUpFormSecond;
