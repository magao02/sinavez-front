import { useState, useRef } from "react";
import { useRouter } from "next/router";


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
  SubmitError,
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

import * as service from "../../services/accounts";
import * as validation from "../../utils/validation";

const CadastroPage = () => {
  let [currentStep, setCurrentStep] = useState(0);
  let [shouldFlipAnimation, setShouldFlipAnimation] = useState(false);

  // Inputs for the first step
  const nameRef = useRef(null);
  const birthdayRef = useRef(null);
  const cpfRef = useRef(null);
  const rgRef = useRef(null);
  const dataEmissaoRef = useRef(null);
  const filiacaoRef = useRef(null);

  // Inputs for the second step
  const profissaoRef = useRef(null);
  const phoneRef = useRef(null);
  const ruaRef = useRef(null);
  const bairroRef = useRef(null);
  const numeroResRef = useRef(null);
  const complementoRef = useRef(null);

  // Inputs for the third step
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfRef = useRef(null);

  const backStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
      setShouldFlipAnimation(true);
    }
  };

  const validate = async () => {
    let refs;
    switch (currentStep) {
      case 0:
        refs = [nameRef, birthdayRef, cpfRef, rgRef, dataEmissaoRef, filiacaoRef];
        break;
      case 1:
        refs = [profissaoRef, phoneRef, ruaRef, bairroRef, numeroResRef, complementoRef];
        break;
      case 2:
        refs = [emailRef, passwordRef, passwordConfRef];
        break;
      default: return false;
    }

    return (await Promise.all(refs.map(ref => ref.current.validate()))).every(x => !!x);
  };

  const router = useRouter();

  const nextStep = async () => {
    if (!await validate()) return;

    if (currentStep !== 2) {
      setCurrentStep(currentStep + 1);
      setShouldFlipAnimation(false);
    } else {
      await submitData();
    }
  };

  const [apiError, setApiError] = useState("");

  const submitData = async () => {
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      telefone: phoneRef.current.value,
      nascimento: birthdayRef.current.value,
      cpf: cpfRef.current.value,
      rg: rgRef.current.value,
      emissao: dataEmissaoRef.current.value ?? "",
      filiacao: filiacaoRef.current.value,
      profissao: profissaoRef.current.value,
      endereco: {
        rua: ruaRef.current.value,
        bairro: bairroRef.current.value,
        complemento: complementoRef.current.value,
        numero: numeroResRef.current.value,
      },
      // TODO: should these be added?
      regional: "",
      numInscricao: "",
      dataAfiliacao: "",
      formacaoSuperior: "",
      instituicaoSuperior: "",
      dataFormacao: "",
      numRegistroConselho: "",
      dataRegistroConselho: "",
      empresa: "",
      salario: "",
    };

    setApiError("");

    try {
      const response = await service.signUp(data);
      router.push("/");
    } catch (error) {
      const err = error.response.data;
      if (typeof err === 'string') {
        setApiError(err);
      } else {
        setApiError(error.response.data?.message);
      }
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
                ref={nameRef}
                validate={validation.requiredTextField}
              />
              <GenericFormValue
                label="Data de nascimento"
                placeholder="00/00/0000"
                description="Digite a sua data de nascimento no campo acima."
                ref={birthdayRef}
                validate={validation.testRequiredData}
              />
              <GenericFormValue
                label="CPF"
                placeholder="000.000.000-00"
                description="Digite o seu CPF no campo acima."
                ref={cpfRef}
                validate={validation.testRequiredCpf}
              />
              <GenericFormValue
                label="RG"
                placeholder="00.000.000"
                description="Digite o seu RG no campo acima."
                ref={rgRef}
                validate={validation.testRequiredNumbers}
              />
              <GenericFormValue
                label="Data de Emissão"
                variant="default-optional"
                placeholder="00/00/0000"
                description="Digite a data de emissão no campo acima."
                ref={dataEmissaoRef}
                validate={validation.testDate}
              />
              <GenericFormValue
                label="Filiação"
                placeholder="Sua filiação"
                description="Digite sua filiação no campo acima."
                ref={filiacaoRef}
                validate={validation.requiredTextField}
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
                variant="default-optional"
                placeholder="Sua profissão"
                ref={profissaoRef}
              />
              <GenericFormValue
                label="Telefone"
                placeholder="(00) 00000-0000"
                description="Digite o número em uso do seu celular."
                ref={phoneRef}
                validate={validation.testRequiredPhone}
              />
              <GenericFormValue
                label="Rua"
                placeholder="sei la"
                variant="default-optional"
                description="Digite o nome da rua da sua residência."
                ref={ruaRef}
              />
              <GenericFormValue
                label="Bairro"
                placeholder="sei la"
                variant="default-optional"
                description="Digite o bairro em que você reside."
                ref={bairroRef}
              />
              <GenericFormValue
                label="Número de Residência"
                placeholder="sei la"
                variant="default-optional"
                description="Digite o número de sua residência."
                ref={numeroResRef}
              />
              <GenericFormValue
                label="Complemento"
                placeholder="sei la"
                variant="default-optional"
                description="Digite o complemento de seu endereço."
                ref={complementoRef}
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
                variant="default-optional"
                // melhor??
                description="Digite o seu melhor email."
                ref={emailRef}
                validate={validation.testEmail}
              />
              <GenericFormValue
                label="Senha"
                placeholder="**********"
                // TODO: the validation function doesnt check for >12
                description="Digite sua senha. De 8 a 12 dígitos."
                type="password"
                ref={passwordRef}
                validate={validation.testRequiredPassword}
              />
              <GenericFormValue
                label="Confirmar senha"
                placeholder="**********"
                description="Digite exatamente a mesma senha"
                type="password"
                ref={passwordConfRef}
                validate={value => validation.testRequiredMatchingPassword(value, passwordRef.current.value)}
              />
            </GenericForm>
          </FormBox>
        )}

        {apiError && <SubmitError>{apiError}</SubmitError>}

        <ButtonContainer>
          <Button onClick={backStep} variant="default">{currentStep === 0 ? "CANCELAR" : "VOLTAR"}</Button>
          <Button onClick={nextStep} variant="default">{currentStep === 2 ? "FINALIZAR" : "PRÓXIMO"}</Button>
        </ButtonContainer>
      </RightContent>
      
    </Container>
  );
};

export default CadastroPage;