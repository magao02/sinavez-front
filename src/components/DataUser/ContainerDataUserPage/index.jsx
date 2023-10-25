import React from "react";
import { ContainerButtons, ContainerData, ContainerDataUser } from "../style";
import { InputsContainer, SubContainer, SubTitle } from "../../UserDataForm/styles";
import Input from "../../commom/Input";
import ContainerEditting from "../ContainerEditting";
import Button from "../../commom/Button";
import Image from "next/image";
import Trash from "../../../assets/trash.svg";
import { ContainerInputLabel, ContainerLabel, Label, SpanLabel } from "../../../styles/homeStyles";

const ContainerDataUserPage = ({ file, saveImage, data, edit, urlUser, authContext, cancelForm, handleEdit, cancel, handleEditUser, dataCollector }) => {

    const formatCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    const formataTelefone = (telefone) => {
        if (telefone !== null && telefone !== undefined) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
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
                            <Input
                                variant="default-optional"
                                label={"Data de Nascimento"}
                                name={"nascimento"}
                                readOnly={true}
                                value={formataData(data.nascimento)}
                            />
                            <Input
                                variant="default-optional"
                                label={"CPF"}
                                name={"cpf"}
                                readOnly={true}
                                value={formatCPF(data.cpf)}
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
                                label={"Filiação"}
                                name={"filiacao"}
                                readOnly={true}
                                value={data.filiacao}
                            />
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
                            <Input
                                variant="default-optional"
                                label={"Universidade"}
                                name={"universidade"}
                                readOnly={true}
                                value={data.universidade}
                            />

                        </SubContainer>

                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                                Vínculo com a SINAVEZ
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
                        </SubContainer>
                        {authContext.adminMaster && (
                            <SubContainer gap={true} height={true}>
                            <ContainerLabel>
                                <Label>Esse usuário é um Administrador?<SpanLabel color={true}>*</SpanLabel></Label>

                                <ContainerInputLabel>
                                    <label for="sim">
                                        <input type="radio" id="sim" name="admin" value={data.admin} checked={data.admin} readOnly={true} />
                                        <SpanLabel margin={true}>Sim</SpanLabel>
                                    </label>

                                    <label for="sim">
                                        <input type="radio" id="nao" name="admin" value={data.admin} checked={!data.admin} readOnly={true} />
                                        <SpanLabel margin={true}>Não</SpanLabel>
                                    </label>
                                </ContainerInputLabel>
                            </ContainerLabel>
                        </SubContainer>
                        )}
                    </ContainerDataUser>

                    <ContainerDataUser>
                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                                Contatos
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
                            <Input
                                variant="default-optional"
                                label={"Telefone"}
                                name={"Telefone"}
                                readOnly={true}
                                value={formataTelefone(data.telefone)}
                            />
                            <Input
                                variant="default-optional"
                                label={"Nome da rua"}
                                name={"Rua"}
                                readOnly={true}
                                value={data.endereco.rua}
                            />
                            <Input
                                variant="default-optional"
                                label={"Bairro"}
                                name={"Bairro"}
                                readOnly={true}
                                value={data.endereco.bairro}
                            />

                            <Input
                                variant="default-optional"
                                label={"Número da residência"}
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
                        </SubContainer>

                        <SubContainer gap={true} height={true}>
                            <SubTitle>
                                Email e Senha
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
            <ContainerEditting file={file} saveImage={saveImage} data={data} urlUser={urlUser} authContext={authContext} cancel={cancel} handleEditUser={handleEditUser} dataCollector={dataCollector} />
        )
    }

};


export default ContainerDataUserPage;