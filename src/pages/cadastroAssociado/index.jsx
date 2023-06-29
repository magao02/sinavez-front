import Image from "next/image.js";

import Pattern from "../../assets/login_pattern.svg";
import Ilustration from "../../assets/form_illustration.svg";
import LogoImage from "../../assets/sinavez_logo_azul_texto.svg";

import {
  Container,
  LeftContent,
  RightContent,
  Title,
  PatternBox,
  FormBox,
  Steps,
  StepDivider
} from "../../styles/cadastroAssociadoStyles";

import { GenericForm, GenericFormValue } from "../../components/GenericForm";

const CadastroPage = () => {
  return (
    <Container>
      <LeftContent>
        <Image src={LogoImage} />
        <Image src={Ilustration} />
      </LeftContent>

      <PatternBox>
        <Image src={Pattern} />
      </PatternBox>
      
      <RightContent>
        <Steps>
          <span>1 Dados</span>
          <StepDivider />
          <span>2 Contatos</span>
          <StepDivider />
          <span>3 Senha</span>
        </Steps>

        <FormBox>
          <Title>
            Seus Dados!
          </Title>
          <GenericForm>
            <GenericFormValue
              label="Nome completo"
              placeholder="Seu nome"
              description="Digite o seu nome completo no campo acima."
            />
            <GenericFormValue
              label="Data de nascimento"
              placeholder="00/00/0000"
              description="Digite a sua data de nascimento no campo acima."
            />
            <GenericFormValue
              label="CPF"
              placeholder="000.000.000-00"
              description="Digite o seu CPF no campo acima."
            />
            <GenericFormValue
              label="RG"
              placeholder="00.000.000"
              description="Digite o seu RG no campo acima."
            />
            <GenericFormValue
              label="Data de Emissão"
              // variant="default-optional"
              placeholder="00/00/0000"
              description="Digite a data de emissão no campo acima."
            />
            <GenericFormValue
              label="Filiação"
              placeholder="Sua filiação"
              description="Digite sua filiação no campo acima."
            />
          </GenericForm>
        </FormBox>
      </RightContent>
      
    </Container>
  );
};

export default CadastroPage;
