import {
  Container,
  InputForm,
  InputContainer,
  ButtonContainer,
} from "./styles";

import Input from "../../commom/Input";
import Button from "../../commom/Button";
import Select from "../../commom/Select";
import MultiInput from "../../commom/MultiInput";

const SignUpFormThird = () => {
  return (
    <Container>
      <InputForm>
        <InputContainer>
          <MultiInput
            label="Regional"
            names={[
              "Município",
              "Estado",
              "Naturalidade",
              "Nacionalidade",
              "Brasileiro",
            ]}
          />
          <Input
            variant="signup"
            label="Número de Inscrição"
            name="numInscricao"
            placeholder="Digite o seu número de inscrição"
          />
          <Input
            variant="signup"
            label="Data de Afiliação"
            name="dataFiliacao"
            placeholder="DD/MM/AA"
          />
        </InputContainer>
        <InputContainer>
          <Input
            variant="signup"
            label="Formação Superior"
            name="formacaoSuperior"
            placeholder="Digite o nome do seu curso"
          />
          <Input
            variant="signup"
            label="Instituição"
            name="instituicaoSuperior"
            placeholder="Digite o nome da sua instituição de formação"
          />
          <Input
            variant="signup"
            label="Data de Formação"
            name="dataFormacao"
            placeholder="DD/MM/AAAA"
          />
          <Input
            variant="signup"
            label="Nº de Registro no Conselho"
            name="numRegistroConselho"
            placeholder="Digite o seu número de registro"
          />
          <Input
            variant="signup"
            label="Data de Registro no Conselho"
            name="dataRegistroConselho"
            placeholder="DD/MM/AAAA"
          />
        </InputContainer>
        <InputContainer>
          <Input
            variant="signup"
            label="Orgão ou Empresa em que trabalha"
            name="empresa"
            placeholder="Digite o nome do Orgão ou Empresa"
          />

          <Input
            variant="signup"
            label="Salário"
            name="salario"
            placeholder="Digite apenas o valor sem vírgulas ou pontos"
          />
          <ButtonContainer>
            <Button variant="password">Finalizar Cadastro</Button>
          </ButtonContainer>
        </InputContainer>
      </InputForm>
    </Container>
  );
};

export default SignUpFormThird;
