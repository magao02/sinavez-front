import { useState } from "react";

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
  StepDivider,
  StepColor,
  StepNumber,
  ButtonContainer,
} from "../../styles/cadastroAssociadoStyles";

import { GenericForm, GenericFormValue } from "../../components/GenericForm";
import Button from "../../components/commom/Button";

const Step = ({ active, number, children }) => {
  return (
    <StepColor active={active}>
      <StepNumber active={active}>{number}</StepNumber> {children}
    </StepColor>
  )
}

const CadastroPage = () => {
  let [currentStep, setCurrentStep] = useState(0);
  let [shouldFlipAnimation, setShouldFlipAnimation] = useState(false);

  const backStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
      setShouldFlipAnimation(true);
    }
  };

  const nextStep = () => {
    if (currentStep !== 2) {
      setCurrentStep(currentStep + 1);
      setShouldFlipAnimation(false);
    }
  };

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
          <Step active={currentStep === 0} number="1">Dados</Step>
          <StepDivider />
          <Step active={currentStep === 1} number="2">Contatos</Step>
          <StepDivider />
          <Step active={currentStep === 2} number="3">Senha</Step>
        </Steps>

        {currentStep === 0 && (
          <FormBox flipAnimation={shouldFlipAnimation}>
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
                variant="default-optional"
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
        )}

        {currentStep === 1 && (
          <FormBox flipAnimation={shouldFlipAnimation}>
            <Title>
              Seus Contatos!
            </Title>
            <GenericForm>
              <GenericFormValue
                label="Profissão"
                placeholder="Sua profissão"
              />
              <GenericFormValue
                label="Telefone"
                placeholder="(00) 00000-0000"
                description="Digite o número em uso do seu celular."
              />
              <GenericFormValue
                label="Rua"
                placeholder="sei la"
                description="Digite o nome da rua da sua residência."
              />
              <GenericFormValue
                label="Bairro"
                placeholder="sei la"
                description="Digite o bairro em que você reside."
              />
              <GenericFormValue
                label="Número de Residência"
                placeholder="sei la"
                description="Digite o número de sua residência."
              />
              <GenericFormValue
                label="Complemento"
                placeholder="sei la"
                description="Digite o complemento de seu endereço."
              />
            </GenericForm>
          </FormBox>
        )}

        {currentStep === 2 && (
          <FormBox flipAnimation={shouldFlipAnimation}>
            <Title>
              Finalização cadastral!
            </Title>
            <GenericForm>
              <GenericFormValue
                label="Email"
                placeholder="seuemail@dominio.com"
                // melhor??
                description="Digite o seu melhor email."
              />
              <GenericFormValue
                label="Senha"
                placeholder="**********"
                description="Digite sua senha. De 8 a 12 dígitos."
                type="password"
              />
              <GenericFormValue
                label="Confirmar senha"
                placeholder="**********"
                description="Digite exatamente a mesma senha"
                type="password"
              />
            </GenericForm>
          </FormBox>
        )}

        <ButtonContainer>
          <Button onClick={backStep} variant="default">{currentStep === 0 ? "CANCELAR" : "VOLTAR"}</Button>
          <Button onClick={nextStep} variant="default">{currentStep === 2 ? "FINALIZAR" : "PRÓXIMO"}</Button>
        </ButtonContainer>
      </RightContent>
      
    </Container>
  );
};

export default CadastroPage;
