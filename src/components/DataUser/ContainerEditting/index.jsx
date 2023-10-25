import React, { useCallback, useEffect, useRef, useState } from "react";
import { Aviso, ContainerButtonCancel, ContainerButtons, ContainerData, ContainerDataUser, ContainerImg, ContentButton, LineButton } from "../style";
import { InputsContainer, SubContainer, SubTitle } from "../../UserDataForm/styles";
import Input from "../../commom/Input";
import Button from "../../commom/Button";
import { ContainerInputLabel, ContainerLabel, Label, SpanLabel, ToggleCard, Card } from "../../../styles/homeStyles";
import { ButtonCancel, CancelBox, CancelOptions, TextCancel, TitleCancel } from "../../CancelForm/style";
import Image from "next/image";
import Sucess from "../../../assets/sucess.svg";
import X from "../../../assets/x.svg";
import { useAuth } from "../../../contexts/AuthContext";


const ContainerEditting = ({ file, saveImage, data, urlUser, authContext, cancel, handleEditUser, dataCollector }) => {

    const [dataNova, setDataNova] = useState(data);
    const [valorData, setValorData] = useState({});

    const [toggleContainerButtons, setToggleContainerButtons] = useState(false);
    const [mexeu, setMexeu] = useState(false);
    const [save, setSave] = useState(false);
    const [addAdm, setAddAdm] = useState(false);
    const [removeAdm, setRemoveAdm] = useState(false);

    const user = useAuth;

    useEffect(() => {

    }, [data]);

    useEffect(() => {
        if (mexeu) {
            setToggleContainerButtons(true);
        }
    }, [mexeu]);

    useEffect(() => {

    }, [valorData]);

    const handleSubmit = useCallback(async () => {

        try {
            await handleEditUser(valorData, urlUser);
            await saveImage(file);
            cancel();
            setSave(false);
        } catch (error) {
            console.log("Deu erro");
        }


    }, [valorData, urlUser, handleEditUser]);

    const handleSaveData = () => {
        setSave(true);
        setToggleContainerButtons(false);
    }

    const handleFinishSave = () => {
        setSave(false);
        setToggleContainerButtons(false);
    };


    const handleCancelData = () => {
        if (mexeu) {
            setToggleContainerButtons(true);
        } else {
            cancel();
        }
    };

    const onChageData = (value, textValue, valorObj) => {
        if (valorObj == "") {
            setDataNova({ ...dataNova, [textValue]: value });
            setValorData({ ...valorData, [textValue]: value });
        } else {
            setDataNova({
                ...dataNova,
                [valorObj]: { ...dataNova[valorObj], [textValue]: value },
            });
            setValorData({
                ...valorData,
                [valorObj]: { ...valorData[valorObj], [textValue]: value }
            });
        }

        setMexeu(true);
    };

    const cancelou = () => {
        setToggleContainerButtons(false);
        cancel();
    };

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
                            readOnly={false}
                            value={dataNova.name}
                            onChange={(event) => onChageData(event.target.value, "name", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de Nascimento"}
                            name={"nascimento"}
                            readOnly={false}
                            value={dataNova.nascimento}
                            onChange={(event) => onChageData(event.target.value, "nascimento", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"CPF"}
                            name={"cpf"}
                            readOnly={false}
                            value={dataNova.cpf}
                            onChange={(event) => onChageData(event.target.value, "cpf", "")}
                        />

                        <Input
                            variant="default-optional"
                            label={"Registro Geral (RG)"}
                            name={"rg"}
                            readOnly={false}
                            value={dataNova.rg}
                            onChange={(event) => onChageData(event.target.value, "rg", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de Emissão"}
                            name={"data_de_emissão"}
                            readOnly={false}
                            value={dataNova.emissao}
                            onChange={(event) => onChageData(event.target.value, "emissao", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Filiação"}
                            name={"filiacao"}
                            readOnly={false}
                            value={dataNova.filiacao}
                            onChange={(event) => onChageData(event.target.value, "filiacao", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Curso de Formação"}
                            name={"curso_de_formacao"}
                            readOnly={false}
                            value={dataNova.formacaoSuperior}
                            onChange={(event) => onChageData(event.target.value, "formacaoSuperior", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de Formação"}
                            name={"data_de_formacao"}
                            readOnly={false}
                            value={dataNova.dataFormacao}
                            onChange={(event) => onChageData(event.target.value, "dataFormacao", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Universidade"}
                            name={"universidade"}
                            readOnly={false}
                            value={dataNova.universidade}
                            onChange={(event) => onChageData(event.target.value, "universidade", "")}
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
                            readOnly={false}
                            value={dataNova.numRegistroConselho}
                            onChange={(event) => onChageData(event.target.value, "numRegistroConselho", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de registro no conselho"}
                            name={"data_de_registro"}
                            readOnly={false}
                            value={dataNova.dataRegistroConselho}
                            onChange={(event) => onChageData(event.target.value, "dataRegistroConselho", "")}
                        />

                        <Input
                            variant="default-optional"
                            label={"Número de Inscrição"}
                            name={"numero_de_inscricao"}
                            readOnly={false}
                            value={dataNova.numInscricao}
                            onChange={(event) => onChageData(event.target.value, "numInscricao", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de Afiliação"}
                            name={"data_de_afiliacao"}
                            readOnly={false}
                            value={dataNova.dataAfiliacao}
                            onChange={(event) => onChageData(event.target.value, "dataAfiliacao", "")}
                        />
                    </SubContainer>
                    {authContext.adminMaster && (
                        <SubContainer gap={true} height={true}>
                            <ContainerLabel>
                                <Label>Esse usuário é um Administrador?<SpanLabel color={true}>*</SpanLabel></Label>

                                <ContainerInputLabel>
                                    <label for="sim">
                                        <input
                                            type="radio"
                                            id="sim"
                                            name="admin"
                                            value={dataNova.admin}
                                            readOnly={false}
                                            onChange={() => onChageData(true, "admin", "")} />
                                        <SpanLabel margin={true}>Sim</SpanLabel>
                                    </label>

                                    <label for="sim">
                                        <input
                                            type="radio"
                                            id="nao"
                                            name="admin"
                                            value={dataNova.admin}
                                            readOnly={false}
                                            onChange={() => onChageData(false, "admin", "")}
                                        />
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
                            readOnly={false}
                            value={dataNova.profissao}
                            onChange={(event) => onChageData(event.target.value, "profissao", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Organização ou empresa que trabalha"}
                            name={"trabalho"}
                            readOnly={false}
                            value={dataNova.empresa}
                            onChange={(event) => onChageData(event.target.value, "empresa", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Salário"}
                            name={"salario"}
                            readOnly={false}
                            value={dataNova.salario}
                            onChange={(event) => onChageData(event.target.value, "salario", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Telefone"}
                            name={"Telefone"}
                            readOnly={false}
                            value={dataNova.telefone}
                            onChange={(event) => onChageData(event.target.value, "telefone", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Nome da rua"}
                            name={"Rua"}
                            readOnly={false}
                            value={dataNova.endereco.rua}
                            onChange={(event) => onChageData(event.target.value, "rua", "endereco")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Bairro"}
                            name={"Bairro"}
                            readOnly={false}
                            value={dataNova.endereco.bairro}
                            onChange={(event) => onChageData(event.target.value, "bairro", "endereco")}
                        />

                        <Input
                            variant="default-optional"
                            label={"Número da residência"}
                            name={"Número"}
                            readOnly={false}
                            value={dataNova.endereco.numero}
                            onChange={(event) => onChageData(event.target.value, "numero", "endereco")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Cidade"}
                            name={"Cidade"}
                            readOnly={false}
                            value={dataNova.regional.municipio}
                            onChange={(event) => onChageData(event.target.value, "municipio", "regional")}
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
                            readOnly={false}
                            value={dataNova.email}
                            onChange={(event) => onChageData(event.target.value, "email", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Senha"}
                            name={"senha"}
                            readOnly={false}
                            value={dataNova.password}
                            onChange={(event) => onChageData(event.target.value, "password", "")}
                        />

                    </SubContainer>


                </ContainerDataUser>
            </ContainerData>

            <ContainerButtons>
                <Button variant='removeBut' onClick={handleCancelData}>
                    CANCELAR
                </Button>
                <Button variant='default-sucess' onClick={handleSaveData}>
                    SALVAR ALTERAÇÕES
                </Button>

            </ContainerButtons>

            {toggleContainerButtons && (
                <ContainerButtonCancel>
                    <LineButton>

                        <ContentButton direction={true}>
                            <Aviso>Cuidado - Você tem alterações que não foram salvas!</Aviso>
                        </ContentButton>

                        <ContentButton >
                            <Button variant='default-sucess' onClick={handleSaveData}>
                                SALVAR ALTERAÇÕES
                            </Button>
                            <Button variant='removeBut' onClick={cancelou}>
                                CANCELAR
                            </Button>
                        </ContentButton>


                    </LineButton>
                </ContainerButtonCancel>
            )}

            {save && (
                <>
                    <ToggleCard alt={true} />
                    <Card alt={true}>
                        <CancelBox>
                            <TitleCancel>Sucesso</TitleCancel>

                            <CancelOptions>
                                <Image src={Sucess} width={'357.377px'} height={'200px'} />
                                {!data.admin && !dataNova.admin && (
                                    <TextCancel>
                                        Salvar alterações nos dados de {data.name}?
                                    </TextCancel>
                                )}

                                {data.admin && dataNova.admin && (
                                    <TextCancel>
                                        Salvar alterações nos dados de {data.name}?
                                    </TextCancel>
                                )}


                                {!data.admin && dataNova.admin && (
                                    <TextCancel>
                                        Salvar alterações nos dados de {data.name} e promover a Administrador?
                                    </TextCancel>
                                )}

                                {data.admin && !dataNova.admin && (
                                    <TextCancel>
                                        Salvar alterações nos dados de {data.name} e remover da lista de Administradores?
                                    </TextCancel>
                                )}

                            </CancelOptions>

                            <ButtonCancel>
                                <Button variant={'cancelRemove'} onClick={handleFinishSave}>
                                    CANCELAR ALTERAÇÕES
                                </Button>
                                <Button variant={'saveAlt'} onClick={(event) => handleSubmit(event)}>
                                    SALVAR ALTERAÇÕES
                                </Button>
                            </ButtonCancel>
                        </CancelBox>
                    </Card>
                </>
            )}
        </>
    )
};


export default ContainerEditting;