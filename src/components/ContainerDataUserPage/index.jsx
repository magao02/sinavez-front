import React from "react";
import { ContainerData, ContainerDataUser } from "../DataUser/style";
import { InputsContainer, SubContainer, SubTitle } from "../UserDataForm/styles";
import Input from "../commom/Input";

const ContainerDataUserPage = ({data, edit}) => {

    if (edit) {
        return (
            <ContainerData>
                    <ContainerDataUser>
                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                                Dados Pessoais
                            </SubTitle>
                            <Input
                            variant="default-optional"
                            label={"Nome Completo"}
                            name={"nome"}
                            readOnly={true}
                            value={data.name}
                            />
                            <InputsContainer>
                                <Input
                                    variant="default-optional"
                                    label={"CPF"}
                                    name={"cpf"}    
                                    readOnly={true}        
                                    />
                                <Input
                                    variant="default-optional"
                                    label={"Data de Nascimento"}
                                    name={"nascimento"}
                                    readOnly={true}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Registro Geral (RG)"}
                                    name={"rg"}
                                    readOnly={true}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Data de Emissão"}
                                    name={"data_de_emissão"}
                                    readOnly={true}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Naturalidade"}
                                    name={"naturalidade"}    
                                    readOnly={true}                                       
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Nacionalidade"}
                                    name={"nacionalidade"}
                                    readOnly={true}
                                />
                            </InputsContainer>

                        </SubContainer>

                        <SubContainer marginTop = {true} gap={true} height={true}>
                            <SubTitle>
                            Endereço
                            </SubTitle>
                            <Input
                            variant="default-optional"
                            label={"Nome da rua"}
                            name={"Rua"}
                            readOnly={true}
                            />
                            <InputsContainer>
                            <Input
                                variant="default-optional"
                                label={"Bairro"}
                                name={"Bairro"}
                                readOnly={true}
                             />
                            <Input
                                variant="default-optional"
                                label={"Número"}
                                name={"Número"}
                                readOnly={true}
                             />
                            <Input
                                variant="default-optional"
                                label={"Cidade"}
                                name={"Cidade"}
                                readOnly={true}
                            />
                            <Input
                                variant="default-optional"
                                label={"Complemento"}
                                name={"Complemento"} 
                                readOnly={true}          
                            />
                            </InputsContainer>
                        </SubContainer>

                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                            Dados cadastrais
                            </SubTitle>
                            <Input
                            variant="default-optional"
                            label={"E-mail"}
                            name={"E-mail"}
                            readOnly={true}
                            />
                            <Input
                            variant="default-optional"
                            label={"Senha"}
                            name={"senha"}
                            readOnly={true}
                            />
                            <Input 
                            variant="default-optional"
                            label={"Telefone"}
                            name={"Telefone"}
                            readOnly={true}
                            />
                        </SubContainer>

                    </ContainerDataUser>

                    <ContainerDataUser>
                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                                Dados Acadêmicos
                            </SubTitle>
                            <Input
                                variant="default-optional"
                                label={"Curso de Formação"}
                                name={"curso_de_formacao"}
                                readOnly={true}
                            />
                            <Input
                                variant="default-optional"
                                label={"Data de Formação"}
                                name={"data_de_formacao"}
                                readOnly={true}
                            />
                        </SubContainer>

                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                                Dados Empregatícios
                            </SubTitle>
                            <Input
                                variant="default-optional"
                                label={"Organização ou empresa que trabalha"}
                                name={"trabalho"}
                                readOnly={true}
                            />
                            <Input
                                variant="default-optional"
                                label={"Instituição"}
                                name={"instituição"}
                                readOnly={true}
                            />
                            <Input
                                variant="default-optional"
                                label={"Salário"}
                                name={"salario"}
                                readOnly={true}
                            />
                        </SubContainer>

                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                                Vínculo com a SINAVEZ
                            </SubTitle>
                            <Input
                                variant="default-optional"
                                label={"Regional"}
                                name={"regional"}
                                readOnly={true}
                            />
                            <Input
                                variant="default-optional"
                                label={"Número de registro no conselho"}
                                name={"numero_de_registro"}
                                readOnly={true}
                            />
                            <Input
                                variant="default-optional"
                                label={"Data de registro no conselho"}
                                name={"data_de_registro"}
                                readOnly={true}
                            />
                            <InputsContainer>
                                <Input
                                    variant="default-optional"
                                    label={"Número de Inscrição"}
                                    name={"numero_de_inscricao"}
                                    readOnly={true}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Data de Afiliação"}
                                    name={"data_de_afiliacao"}
                                    readOnly={true}
                                />
                            </InputsContainer>
                        </SubContainer>
                    </ContainerDataUser>
                </ContainerData>
        )
    } else {
        return (

            <ContainerData>
                        <ContainerDataUser>
                            <SubContainer gap={true} height={true}>
                                <SubTitle>
                                    Dados Pessoais
                                </SubTitle>
                                <Input
                                variant="default"
                                label={"Nome Completo"}
                                name={"nome"}
                                readOnly={false}
                                
                                />
                                <InputsContainer>
                                    <Input
                                        variant="default"
                                        label={"CPF"}
                                        name={"cpf"}    
                                        readOnly={false}        
                                        />
                                    <Input
                                        variant="default"
                                        label={"Data de Nascimento"}
                                        name={"nascimento"}
                                        readOnly={false}
                                    />
                                    <Input
                                        variant="default"
                                        label={"Registro Geral (RG)"}
                                        name={"rg"}
                                        readOnly={false}
                                    />
                                    <Input
                                        variant="default"
                                        label={"Data de Emissão"}
                                        name={"data_de_emissão"}
                                        readOnly={false}
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Naturalidade"}
                                        name={"naturalidade"}    
                                        readOnly={false}                                       
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Nacionalidade"}
                                        name={"nacionalidade"}
                                        readOnly={false}
                                    />
                                </InputsContainer>

                            </SubContainer>

                            <SubContainer marginTop = {true} gap={true} height={true}>
                                <SubTitle>
                                Endereço
                                </SubTitle>
                                <Input
                                variant="default"
                                label={"Nome da rua"}
                                name={"Rua"}
                                readOnly={false}
                                />
                                <InputsContainer>
                                <Input
                                    variant="default"
                                    label={"Bairro"}
                                    name={"Bairro"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default"
                                    label={"Número"}
                                    name={"Número"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default"
                                    label={"Cidade"}
                                    name={"Cidade"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Complemento"}
                                    name={"Complemento"} 
                                    readOnly={false}          
                                />
                                </InputsContainer>
                            </SubContainer>

                            <SubContainer gap={true} height={true}>
                                <SubTitle>
                                Dados cadastrais
                                </SubTitle>
                                <Input
                                variant="default"
                                label={"E-mail"}
                                name={"E-mail"}
                                readOnly={false}
                                />
                                <Input
                                variant="default"
                                label={"Senha"}
                                name={"senha"}
                                readOnly={false}
                                />
                                <Input 
                                variant="default"
                                label={"Telefone"}
                                name={"Telefone"}
                                readOnly={false}
                                />
                            </SubContainer>

                        </ContainerDataUser>

                        <ContainerDataUser>
                            <SubContainer gap={true} height={true}>
                                <SubTitle>
                                    Dados Acadêmicos
                                </SubTitle>
                                <Input
                                    variant="default-optional"
                                    label={"Curso de Formação"}
                                    name={"curso_de_formacao"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Data de Formação"}
                                    name={"data_de_formacao"}
                                    readOnly={false}
                                />
                            </SubContainer>

                            <SubContainer gap={true} height={true}>
                                <SubTitle>
                                    Dados Empregatícios
                                </SubTitle>
                                <Input
                                    variant="default-optional"
                                    label={"Organização ou empresa que trabalha"}
                                    name={"trabalho"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Instituição"}
                                    name={"instituição"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Salário"}
                                    name={"salario"}
                                    readOnly={false}
                                />
                            </SubContainer>

                            <SubContainer gap={true} height={true}>
                                <SubTitle>
                                    Vínculo com a SINAVEZ
                                </SubTitle>
                                <Input
                                    variant="default-optional"
                                    label={"Regional"}
                                    name={"regional"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Número de registro no conselho"}
                                    name={"numero_de_registro"}
                                    readOnly={false}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Data de registro no conselho"}
                                    name={"data_de_registro"}
                                    readOnly={false}
                                />
                                <InputsContainer>
                                    <Input
                                        variant="default-optional"
                                        label={"Número de Inscrição"}
                                        name={"numero_de_inscricao"}
                                        readOnly={false}
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Data de Afiliação"}
                                        name={"data_de_afiliacao"}
                                        readOnly={false}
                                    />
                                </InputsContainer>
                            </SubContainer>
                        </ContainerDataUser>
                    </ContainerData>
        )}
        
};


export default ContainerDataUserPage;