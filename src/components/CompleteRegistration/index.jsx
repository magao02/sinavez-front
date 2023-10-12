import {  useState } from "react"
import DarkBackground from "../commom/DarkBackground"
import { Container, MainContentContainer, TitleArea, Steps, StepDivider, StepColor, StepNumber, FormContainer, ButtonContainer } from "./styles"
import { GenericForm, GenericFormValue } from "../GenericForm"
import Button from "../commom/Button"
import theme from "../../styles/theme"
import { useRef } from "react"
import * as validation from "../../utils/validation";
import * as api from "../../services/accounts"
import { useAuth } from "../../contexts/AuthContext"
import {  useRouter } from "next/router"

export const CompleteRegistration = ( { handleModal, handleSuccessModal } ) => {

    const authContext = useAuth();

    const router = useRouter();
    
    // Inputs for the first step
    const nameRef = useRef(null);
    const birthdayRef = useRef(null);
    const cpfRef = useRef(null);
    const rgRef = useRef(null);
    const dataEmissaoRef = useRef(null);
    const filiacaoRef = useRef(null);
    const cursoRef = useRef(null)
    const dataCursoRef = useRef(null)
    const collegeRef = useRef(null);

    // Inputs for the second step
    const profissaoRef = useRef(null);
    const orgRef = useRef(null);
    const salarioRef = useRef(null)
    const phoneRef = useRef(null);
    const cepRef = useRef(null);
    const ruaRef = useRef(null);
    const bairroRef = useRef(null);
    const numeroResRef = useRef(null);
    const cidadeRef = useRef(null);


    // Inputs for the third step
    const numRegRef = useRef(null)
    const dateRegRef = useRef(null)
    const subsNumRef = useRef(null)
    const dateAffiliationRef = useRef(null)
  

    // Inputs for the third step
    const emailRef = useRef(null);
    const currPasswordRef = useRef(null)
    const passwordRef = useRef(null);
    const passwordConfRef = useRef(null);

    const [currentStep, setCurrentStep] = useState(0);


    const Step = ({ active, number, children }) => {
        return (
          <StepColor active={active}>
            <StepNumber active={active}>{number}</StepNumber> {children}
          </StepColor>
        )
    }

    const backStep = () => {
        if (currentStep !== 0) {
          setCurrentStep(currentStep - 1);
        }else{
            handleModal()
        }
      };


    const nextStep = async () => {
        if (!await validate()) return;
    
        if (currentStep !== 3) {
          setCurrentStep(currentStep + 1);
        } else {
            handleModal()
            handleSuccessModal(true)
            //await submitData();
        }
      };

      const submitData = async () => {
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            telefone: phoneRef.current.value,
            nascimento: birthdayRef.current.value,
            cpf: cpfRef.current.value,
            rg: rgRef.current.value,
            emissao: dataEmissaoRef.current.value,
            filiacao: filiacaoRef.current.value ?? "",
            profissao: profissaoRef.current.value ?? "",
            endereco: {
              rua: ruaRef.current.value,
              bairro: bairroRef.current.value,
              numero: numeroResRef.current.value,
            },
            isPendingSignUp: false,
            regional: {
              municipio: cidadeRef.current.value
            },
            numInscricao: subsNumRef.current.value ?? "",
            dataAfiliacao: dateAffiliationRef.current.value ?? "",
            formacaoSuperior: cursoRef.current.value ?? "",
            instituicaoSuperior: collegeRef.current.value ?? "",
            dataFormacao: dataCursoRef.current.value ?? "",
            numRegistroConselho: numRegRef.current.value ?? "",
            dataRegistroConselho: dateRegRef.current.value ?? "",
            empresa: orgRef.current.value ?? "",
            salario: salarioRef.current.value ?? "",
          };

          try{
            await api.setUserData(authContext.urlUser, data, authContext.token);
            router.push("/home")
          }catch(error){
            console.log(error?.response?.data?.message)
          }
      }

      const validate = async () => {
        let refs;
        switch (currentStep) {
          case 0:
            refs = [nameRef, birthdayRef, cpfRef, rgRef, dataEmissaoRef, filiacaoRef, cursoRef, dataCursoRef, collegeRef];
            break;
          case 1:
            refs = [profissaoRef, orgRef, salarioRef, phoneRef, cepRef, ruaRef, bairroRef, numeroResRef, cidadeRef];
            break;
          case 2:
            refs = [numRegRef, dateRegRef, subsNumRef, dateAffiliationRef];
            break;
          case 3:
            refs = [emailRef, currPasswordRef, passwordRef, passwordConfRef];
            break;
          default: return false;
        }
        
        return (await Promise.all(refs.map(ref => ref.current.validate()))).every(x => !!x);
      };

    return (
        <Container>
            <DarkBackground></DarkBackground>
            <MainContentContainer>    
                <TitleArea>
                    <h3>COMPLETE SEU CADASTRO</h3>
                </TitleArea>
                <Steps>
                    <Step active={currentStep === 0} number="1">Dados</Step>
                    <StepDivider />
                    <Step active={currentStep === 1} number="2">Contatos</Step>
                    <StepDivider />
                    <Step active={currentStep === 2} number="3">Vínculo</Step>
                    <StepDivider />
                    <Step active={currentStep === 3} number="4">Senha</Step>
                </Steps>
                <FormContainer>
                    <GenericForm gap={".2rem"}>
                        {
                            currentStep === 0 && 
                                <>
                                    <GenericFormValue
                                        label="Nome completo"
                                        placeholder="Seu nome"
                                        description="Digite o seu nome completo no campo acima."
                                        variant="completeRegistration"
                                        ref={nameRef}
                                        validate={validation.requiredTextField}
                                    />
                                    <GenericFormValue
                                        label="Data de nascimento"
                                        placeholder="00/00/0000"
                                        description="Digite a sua data de nascimento no campo acima."
                                        variant="completeRegistration"
                                        ref={birthdayRef}
                                        validate={validation.testRequiredData}
                                    />
                                    <GenericFormValue
                                        label="CPF"
                                        placeholder="000.000.000-00"
                                        description="Digite o seu CPF no campo acima."
                                        variant="completeRegistration"
                                        ref={cpfRef}
                                        validate={validation.testRequiredCpf}
                                    />
                                    <GenericFormValue
                                        label="RG"
                                        placeholder="00.000.000"
                                        description="Digite o seu RG no campo acima."
                                        variant="completeRegistration"
                                        ref={rgRef}
                                        validate={validation.testRequiredNumbers}
                                    />
                                    <GenericFormValue
                                        label="Data de Emissão"
                                        placeholder="00/00/0000"
                                        description="Digite a data de emissão no campo acima."
                                        variant="completeRegistration"
                                        ref={dataEmissaoRef}
                                        validate={validation.testRequiredData}
                                    />
                                    <GenericFormValue
                                        label="Filiação"
                                        placeholder="Sua filiação"
                                        description="Digite sua filiação no campo acima."
                                        variant="completeRegistration-optional"
                                        ref={filiacaoRef}
                                        validate={validation.TextField}
                                    />
                                    <GenericFormValue
                                        label="Curso de formação"
                                        placeholder="Seu curso de formação"
                                        description="Digite seu curso de formação no campo acima."
                                        variant="completeRegistration-optional"
                                        ref={cursoRef}
                                        validate={validation.TextField}
                                    />
                                    <GenericFormValue
                                        label="Data de formação"
                                        placeholder="DD/MM/AAAA"
                                        description="Digite sua data de formação no campo acima."
                                        variant="completeRegistration-optional"
                                        ref={dataCursoRef}
                                        validate={validation.testDate}
                                    />
                                    <GenericFormValue
                                        label="Universidade"
                                        placeholder="Universidade"
                                        description="Digite sua universidade de formação no campo acima."
                                        variant="completeRegistration-optional"
                                        ref={collegeRef}
                                        validate={validation.TextField}
                                    />
                                </>
                        }

                        {
                            currentStep === 1 && 
                                <>
                                    <GenericFormValue
                                        label="Profissão"
                                        placeholder="Sua profissão"
                                        description="Digite sua profissão."
                                        variant="completeRegistration-optional"
                                        ref={profissaoRef}
                                        validate={validation.TextField}
                                    />
                                    <GenericFormValue
                                        label="Organização ou empresa que trabalha"
                                        placeholder="Digite onde você trabalha"
                                        description="Digite onde você trabalha no campo acima."
                                        variant="completeRegistration-optional"
                                        ref={orgRef}
                                        validate={validation.TextField}
                                    />
                                    <GenericFormValue
                                        label="Salário"
                                        placeholder="0"
                                        description="Digite seu salário."
                                        variant="completeRegistration-optional"
                                        type="number"
                                        ref={salarioRef}
                                        validate={validation.TextField}
                                    />
                                    <GenericFormValue
                                        label="Telefone"
                                        placeholder="(00) 00000-0000"
                                        description="Digite o número em uso do seu celular."
                                        variant="completeRegistration"
                                        ref={phoneRef}
                                        validate={validation.testRequiredPhone}
                                    />
                                    <GenericFormValue
                                        label="CEP"
                                        placeholder="00000-000"
                                        description="Digite o seu CEP no campo acima."
                                        variant="completeRegistration-optional"
                                        ref={cepRef}
                                        validate={validation.TextField}
                                    />
                                    <GenericFormValue
                                        label="Rua"
                                        placeholder="Rua da sua residência"
                                        description="Digite o nome da rua da sua residência."
                                        variant="completeRegistration"
                                        ref={ruaRef}
                                        validate={validation.requiredTextField}
                                    />
                                    <GenericFormValue
                                        label="Bairro"
                                        placeholder="Bairro da sua residência"
                                        description="Digite bairro em que você reside."
                                        variant="completeRegistration"
                                        ref={bairroRef}
                                        validate={validation.requiredTextField}  
                                    />
                                    <GenericFormValue
                                        label="Número de residência"
                                        placeholder="000"
                                        description="Digite o número de sua residência."
                                        variant="completeRegistration"
                                        ref={numeroResRef}
                                        validate={validation.requiredTextField}
                                    />
                                    <GenericFormValue
                                        label="Cidade"
                                        placeholder="Cidade da sua residência"
                                        description="Digite o nome da sua cidade."
                                        variant="completeRegistration"
                                        ref={cidadeRef}
                                        validate={validation.requiredTextField}
                                    />
                                </>
                        }

                        {
                            currentStep === 2 && 
                                <>
                                    <GenericFormValue
                                        label="Número de registro no conselho"
                                        placeholder="Digite o seu número de registro no conselho"
                                        description="Digite o seu número de registro no conselho."
                                        variant="completeRegistration-optional"
                                        ref={numRegRef}
                                        validate={validation.TextField}
                                    />
                                    <GenericFormValue
                                        label="Data de registro no conselho"
                                        placeholder="DD/MM/AAAA"
                                        description="Digite sua data de registro no conselho."
                                        variant="completeRegistration-optional"
                                        ref={dateRegRef}
                                        validate={validation.testDate}
                                    />
                                    <GenericFormValue
                                        label="Número de inscrição"
                                        placeholder="Número de inscrição"
                                        description="Digite seu número de inscrição."
                                        variant="completeRegistration-optional"
                                        validate={validation.TextField}
                                        ref={subsNumRef}
                                    />
                                    <GenericFormValue
                                        label="Data de afiliação"
                                        placeholder="DD/MM/AAAA"
                                        description="Digite sua data de afiliação."
                                        variant="completeRegistration-optional"
                                        ref={dateAffiliationRef}
                                        validate={validation.testDate}
                                    />
                                </>
                        }

                        
                        {
                            currentStep === 3 && 
                                <>
                                    <GenericFormValue
                                        label="Email"
                                        placeholder="seuemail@dominio.com"
                                        description="Digite o seu melhor email."
                                        variant="completeRegistration"
                                        ref={emailRef}
                                        validate={validation.testRequiredEmail}
                                    />
                                    <GenericFormValue
                                        label="Senha atual"
                                        placeholder="************"
                                        description="Digite sua senha atual. De 8 a 12 dígitos."
                                        variant="completeRegistration"
                                        type="password"
                                        ref={currPasswordRef}
                                        validate={validation.testRequiredCpf}
                                    />
                                    <GenericFormValue
                                        label="Nova Senha"
                                        placeholder="************"
                                        description="Digite sua senha. De 8 a 12 dígitos."
                                        variant="completeRegistration"
                                        type="password"
                                        ref={passwordRef}
                                        validate={validation.testRequiredPassword}
                                    />
                                    <GenericFormValue
                                        label="Confirmar nova senha "
                                        placeholder="**************"
                                        description="Digite exatamente a mesma senha anterior."
                                        variant="completeRegistration"
                                        type="password"
                                        ref={passwordConfRef}
                                        validate={value => validation.testRequiredMatchingPassword(value, passwordRef.current.value)}
                                    />
                                </>
                        }
                    </GenericForm>
                </FormContainer>

                <ButtonContainer>
                    <Button onClick={backStep} width={"100%"} height={"4vh"} backgroundColor={currentStep === 0 ? theme.colors.gray.default : theme.colors.blue.heavy} variant="registrationComplete">{currentStep === 0 ? "CANCELAR" : "VOLTAR"}</Button>
                    <Button onClick={nextStep} width={"100%"} height={"4vh"} backgroundColor={currentStep === 3 ? theme.colors.green.default : theme.colors.blue.heavy} variant="registrationComplete">{currentStep === 3 ? "CONCLUIR" : "PRÓXIMO"}</Button>
                </ButtonContainer>
            </MainContentContainer>

        </Container>
    )
}