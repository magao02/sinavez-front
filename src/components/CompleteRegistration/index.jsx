import { useState } from "react"
import DarkBackground from "../commom/DarkBackground"
import { Container, MainContentContainer, TitleArea, Steps, StepDivider, StepColor, StepNumber, FormContainer, ButtonContainer } from "./styles"
import { GenericForm, GenericFormValue } from "../GenericForm"
import Button from "../commom/Button"
import theme from "../../styles/theme"

export const CompleteRegistration = () => {

    const [currentStep, setCurrentStep] = useState(0)

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
        }
      };
    

    const nextStep = async () => {
        //if (!await validate()) return;
    
        if (currentStep !== 3) {
          setCurrentStep(currentStep + 1);
        } else {
          //await submitData();
        }
      };

    if(typeof document !== 'undefined') document.body.style.overflow="hidden"

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
                                    />
                                    <GenericFormValue
                                        label="Data de nascimento"
                                        placeholder="00/00/0000"
                                        description="Digite a sua data de nascimento no campo acima."
                                        variant="completeRegistration"
                                        
                                    />
                                    <GenericFormValue
                                        label="CPF"
                                        placeholder="000.000.000-00"
                                        description="Digite o seu CPF no campo acima."
                                        variant="completeRegistration"
                                        
                                    />
                                    <GenericFormValue
                                        label="RG"
                                        placeholder="00.000.000"
                                        description="Digite o seu RG no campo acima."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Data de Emissão"
                                        placeholder="00/00/0000"
                                        description="Digite a data de emissão no campo acima."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Filiação"
                                        placeholder="Sua filiação"
                                        description="Digite sua filiação no campo acima."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Curso de formação"
                                        placeholder="Seu curso de formação"
                                        description="Digite seu curso de formação no campo acima."
                                        variant="completeRegistration"  
                                    />
                                    <GenericFormValue
                                        label="Data de formação"
                                        placeholder="DD/MM/AAAA"
                                        description="Digite sua data de formação no campo acima."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Universidade"
                                        placeholder="Universidade"
                                        description="Digite sua universidade de formação no campo acima."
                                        variant="completeRegistration"
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
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Organização ou empresa que trabalha"
                                        placeholder="Digite onde você trabalha"
                                        description="Digite onde você trabalha no campo acima."
                                        variant="completeRegistration"
                                        
                                    />
                                    <GenericFormValue
                                        label="Salário"
                                        placeholder="0"
                                        description="Digite seu salário."
                                        variant="completeRegistration"
                                        type="number"
                                        
                                    />
                                    <GenericFormValue
                                        label="Telefone*"
                                        placeholder="(00) 00000-0000"
                                        description="Digite o número em uso do seu celular."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="CEP"
                                        placeholder="00000-000"
                                        description="Digite o seu CEP no campo acima."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Rua"
                                        placeholder="Rua da sua residência"
                                        description="Digite o nome da rua da sua residência."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Bairro"
                                        placeholder="Bairro da sua residência"
                                        description="Digite bairro em que você reside."
                                        variant="completeRegistration"  
                                    />
                                    <GenericFormValue
                                        label="Número de residência"
                                        placeholder="000"
                                        description="Digite o número de sua residência."
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Cidade"
                                        placeholder="Cidade da sua residência"
                                        description="Digite o nome da sua cidade."
                                        variant="completeRegistration"
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
                                        variant="completeRegistration"
                                    />
                                    <GenericFormValue
                                        label="Data de registro no conselho"
                                        placeholder="DD/MM/AAAA"
                                        description="Digite sua data de registro no conselho."
                                        variant="completeRegistration"
                                        
                                    />
                                    <GenericFormValue
                                        label="Número de inscrição"
                                        placeholder="Número de inscrição"
                                        description="Digite seu número de inscrição."
                                        variant="completeRegistration"
                                        
                                    />
                                    <GenericFormValue
                                        label="Data de afiliação"
                                        placeholder="DD/MM/AAAA"
                                        description="Digite sua data de afiliação."
                                        variant="completeRegistration"
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
                                    />
                                    <GenericFormValue
                                        label="Senha atual"
                                        placeholder="************"
                                        description="Digite sua senha atual. De 8 a 12 dígitos."
                                        variant="completeRegistration"
                                        
                                    />
                                    <GenericFormValue
                                        label="Nova Senha"
                                        placeholder="************"
                                        description="Digite sua senha. De 8 a 12 dígitos."
                                        variant="completeRegistration"
                                        
                                    />
                                    <GenericFormValue
                                        label="Confirmar nova senha "
                                        placeholder="**************"
                                        description="Digite exatamente a mesma senha anterior."
                                        variant="completeRegistration"
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