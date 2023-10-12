import React from "react";
import { ContainerButtons, ContainerData, ContainerDataUser } from "../style";
import { InputsContainer, SubContainer, SubTitle } from "../../UserDataForm/styles";
import Input from "../../commom/Input";
import ContainerEditting from "../ContainerEditting";
import Button from "../../commom/Button";
import Image from "next/image";
import Trash from "../../../assets/trash.svg";

const ContainerDataUserPage = ({file, saveImage, data, edit, urlUser, authContext, cancelForm, handleEdit, cancel, handleEditUser, dataCollector}) => {

    const formatCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    const formataTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    };

    const formataData = (data) => {
        return data.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
    };

    if (!edit) {
        return (
            <>
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
                                        value={formatCPF(data.cpf)}       
                                        />
                                    <Input
                                        variant="default-optional"
                                        label={"Data de Nascimento"}
                                        name={"nascimento"}
                                        readOnly={true}
                                        value={formataData(data.nascimento)}
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Registro Geral (RG)"}
                                        name={"rg"}
                                        readOnly={true}
                                        value={data.rg}
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Data de Emissão"}
                                        name={"data_de_emissão"}
                                        readOnly={true}
                                        value={formataData(data.emissao)}
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Naturalidade"}
                                        name={"naturalidade"}    
                                        readOnly={true}   
                                        value={data.regional.naturalidade}                                    
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Nacionalidade"}
                                        name={"nacionalidade"}
                                        readOnly={true}
                                        value={data.regional.nacionalidade}
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
                                value={data.endereco.rua}
                                />
                                <InputsContainer>
                                <Input
                                    variant="default-optional"
                                    label={"Bairro"}
                                    name={"Bairro"}
                                    readOnly={true}
                                    value={data.endereco.bairro}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Número"}
                                    name={"Número"}
                                    readOnly={true}
                                    value={data.endereco.numero}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Cidade"}
                                    name={"Cidade"}
                                    readOnly={true}
                                    value={data.regional.municipio}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Estado"}
                                    name={"Estado"} 
                                    readOnly={true}      
                                    value={data.regional.estado}    
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
                                value={data.email}
                                />
                                <Input
                                variant="default-optional"
                                label={"Senha"}
                                name={"senha"}
                                readOnly={true}
                                value={data.password}
                                />
                                <Input 
                                variant="default-optional"
                                label={"Telefone"}
                                name={"Telefone"}
                                readOnly={true}
                                value={formataTelefone(data.telefone)}
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
                                    value={data.formacaoSuperior}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Data de Formação"}
                                    name={"data_de_formacao"}
                                    readOnly={true}
                                    value={data.dataFormacao}
                                />
                            </SubContainer>

                            <SubContainer gap={true} height={true}>
                                <SubTitle>
                                    Dados Empregatícios
                                </SubTitle>
                                <Input
                                    variant="default-optional"
                                    label={"Profissão"}
                                    name={"profissao"}
                                    readOnly={true}
                                    value={data.profissao}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Organização ou empresa que trabalha"}
                                    name={"trabalho"}
                                    readOnly={true}
                                    value={data.empresa}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Salário"}
                                    name={"salario"}
                                    readOnly={true}
                                    value={data.salario}
                                />
                            </SubContainer>

                            <SubContainer gap={true} height={true}>
                                <SubTitle>
                                    Vínculo com o SINAVEZ
                                </SubTitle>
                                <Input
                                    variant="default-optional"
                                    label={"Número de registro no conselho"}
                                    name={"numero_de_registro"}
                                    readOnly={true}
                                    value={data.numRegistroConselho}
                                />
                                <Input
                                    variant="default-optional"
                                    label={"Data de registro no conselho"}
                                    name={"data_de_registro"}
                                    readOnly={true}
                                    value={formataData(data.dataRegistroConselho)}
                                />
                                <InputsContainer>
                                    <Input
                                        variant="default-optional"
                                        label={"Número de Inscrição"}
                                        name={"numero_de_inscricao"}
                                        readOnly={true}
                                        value={data.numInscricao}
                                    />
                                    <Input
                                        variant="default-optional"
                                        label={"Data de Afiliação"}
                                        name={"data_de_afiliacao"}
                                        readOnly={true}
                                        value={formataData(data.dataAfiliacao)}
                                    />
                                </InputsContainer>
                            </SubContainer>
                        </ContainerDataUser>
                </ContainerData>

                <ContainerButtons>
                    <Button variant='removeBut' onClick={cancelForm}>
                        <Image src={Trash} />
                        Excluir Associado
                    </Button>
                    <Button variant='editButton' onClick={handleEdit}>
                        EDITAR DADOS
                    </Button>
                </ContainerButtons>
</>
        )
    } else {
        return (
           <ContainerEditting file={file} saveImage={saveImage} data={data} urlUser={urlUser} authContext={authContext} cancel={cancel} handleEditUser={handleEditUser} dataCollector={dataCollector}/>
        )}
        
};


export default ContainerDataUserPage;