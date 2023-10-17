import { useState, useRef } from "react";
import { useRouter } from "next/router";

import Image from "next/image.js";

import Pattern from "../../assets/login_pattern.svg";
import Ilustration from "../../assets/form_illustration.svg";
import LogoImage from "../../assets/sinavez_logo_text_blue.svg";

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
  FormRow,
} from "../../styles/cadastroStyles";

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
  const cursoFormacaoRef = useRef(null);
  const dataFormacaoRef = useRef(null);
  const universidadeRef = useRef(null);

  // Inputs for the second step
  const profissaoRef = useRef(null);
  const empresaRef = useRef(null);
  const phoneRef = useRef(null);
  const ruaRef = useRef(null);
  const bairroRef = useRef(null);
  const numeroResRef = useRef(null);
  const cidadeRef = useRef(null);
  const salarioRef = useRef(null);
  const cepRef = useRef(null);

  const numRegistroRef = useRef(null);
  const dataRegistroRef = useRef(null);
  const numInscricaoRef = useRef(null);
  const dataAfiliacaoRef = useRef(null);

  // Inputs for the last step
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
        refs = [nameRef, birthdayRef, cpfRef, rgRef, dataEmissaoRef, filiacaoRef, dataFormacaoRef];
        break;
      case 1:
        refs = [profissaoRef, phoneRef, ruaRef, bairroRef, numeroResRef, cidadeRef, salarioRef, cepRef, empresaRef];
        break;
      case 2:
        refs = [numRegistroRef, dataRegistroRef, numInscricaoRef, dataAfiliacaoRef];
        break;
      case 3:
        refs = [emailRef, passwordRef, passwordConfRef];
        break;
      default: return false;
    }

    return (await Promise.all(refs.map(ref => ref.current.validate()))).every(x => !!x);
  };

  const router = useRouter();

  const nextStep = async () => {
    if (!await validate()) return;

    if (currentStep !== 3) {
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
        numero: numeroResRef.current.value,
        cep: cepRef.current.value,
      },
      regional: {
        municipio: cidadeRef.current.value,
      },
      formacaoSuperior: cursoFormacaoRef.current.value,
      dataFormacao: dataFormacaoRef.current.value,
      universidade: universidadeRef.current.value,
      empresa: empresaRef.current.value,
      salario: salarioRef.current.value,
      numInscricao: numInscricaoRef.current.value,
      dataAfiliacao: dataAfiliacaoRef.current.value,
      numRegistroConselho: numRegistroRef.current.value,
      dataRegistroConselho: dataRegistroRef.current.value,

      // unused
      instituicaoSuperior: "",
    };

    setApiError("");

    try {
      await service.signUp(data);
      router.push("/login");
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
          <Step active={currentStep === 2} number="3">Vínculo</Step>
          <StepDivider />
          <Step active={currentStep === 3} number="4">Senha</Step>
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
              <FormRow>
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
              </FormRow>
              <GenericFormValue
                label="Data de Emissão"
                placeholder="00/00/0000"
                description="Digite a data de emissão no campo acima."
                ref={dataEmissaoRef}
                validate={validation.testRequiredData}
              />
              <GenericFormValue
                label="Filiação"
                variant="default-optional"
                placeholder="Sua filiação"
                description="Digite sua filiação no campo acima."
                ref={filiacaoRef}
              />
              <FormRow>
                <GenericFormValue
                  label="Curso de formação"
                  variant="default-optional"
                  placeholder="Seu curso de formação"
                  description="Digite seu curso de formação no campo acima."
                  ref={cursoFormacaoRef}
                  validate={validation.requiredTextField}
                />
                <GenericFormValue
                  label="Data de formação"
                  variant="default-optional"
                  placeholder="DD/MM/AAAA"
                  description="Digite a data de formação no campo acima."
                  ref={dataFormacaoRef}
                  validate={validation.testDate}
                />
              </FormRow>
              <GenericFormValue
                label="Universidade"
                variant="default-optional"
                placeholder="Universidade"
                description="Digite sua universidade no campo acima."
                ref={universidadeRef}
                validate={validation.testDate}
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
              <FormRow>
                <GenericFormValue
                  label="Organização ou empresa que trabalha"
                  variant="default-optional"
                  placeholder="Digite onde você trabalha"
                  description="Digite onde você trabalha."
                  ref={empresaRef}
                />
                <GenericFormValue
                  label="Salário"
                  variant="default-optional"
                  placeholder="0"
                  description="Digite seu salário."
                  ref={salarioRef}
                />
              </FormRow>
              <GenericFormValue
                label="Telefone"
                placeholder="(00) 00000-0000"
                description="Digite o número em uso do seu celular."
                ref={phoneRef}
                validate={validation.testRequiredPhone}
              />
              <GenericFormValue
                label="CEP"
                variant="default-optional"
                placeholder="00000-000"
                description="Digite o seu CEP no campo acima."
                ref={cepRef}
                validate={validation.testCEP}
              />
              <FormRow>
                <GenericFormValue
                  label="Rua"
                  description="Digite o nome da rua da sua residência."
                  ref={ruaRef}
                  validate={validation.requiredTextField}
                />
                <GenericFormValue
                  label="Número de Residência"
                  description="Digite o número de sua residência."
                  ref={numeroResRef}
                  validate={validation.requiredTextField}
                />
              </FormRow>
              <FormRow>
                <GenericFormValue
                  label="Bairro"
                  description="Digite o bairro em que você reside."
                  ref={bairroRef}
                  validate={validation.requiredTextField}
                />
                <GenericFormValue
                  label="Cidade"
                  description="Digite a cidade em que você reside."
                  ref={cidadeRef}
                  validate={validation.requiredTextField}
                />
              </FormRow>
            </GenericForm>
          </FormBox>
        )}

        {currentStep === 2 && (
          <FormBox flipAnimation={shouldFlipAnimation}>
            <Title>
              Vínculo com o SINAVEZ
            </Title>
            <GenericForm>
              <GenericFormValue
                label="Número de registro no conselho"
                variant="default-optional"
                placeholder="Digite o seu número de registro no conselho"
                description="Digite o seu número de registro no conselho."
                ref={numRegistroRef}
              />
              <GenericFormValue
                label="Data de registro no conselho"
                variant="default-optional"
                placeholder="DD/MM/AAAA"
                description="Digite sua data de registro no conselho."
                ref={dataRegistroRef}
                validate={validation.testDate}
              />
              <GenericFormValue
                label="Número de inscrição"
                variant="default-optional"
                placeholder="Número de inscrição"
                description="Digite seu número de inscrição."
                ref={numInscricaoRef}
              />
              <GenericFormValue
                label="Data de afiliação"
                variant="default-optional"
                placeholder="DD/MM/AAAA"
                description="Digite sua data de afiliação."
                ref={dataAfiliacaoRef}
                validate={validation.testDate}
              />
            </GenericForm>
          </FormBox>
        )}

        {currentStep === 3 && (
          <FormBox flipAnimation={shouldFlipAnimation}>
            <Title>
              Finalização cadastral!
            </Title>
            <GenericForm>
              <GenericFormValue
                label="Email"
                placeholder="seuemail@dominio.com"
                description="Digite o seu melhor email."
                ref={emailRef}
                validate={validation.testRequiredEmail}
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
                description="Digite exatamente a mesma senha anterior."
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
          <Button onClick={nextStep} variant="default">{currentStep === 3 ? "FINALIZAR" : "PRÓXIMO"}</Button>
        </ButtonContainer>
      </RightContent>
      
    </Container>
  );
};

export default CadastroPage;
