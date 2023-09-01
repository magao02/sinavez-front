import React, { useCallback, useEffect, useRef, useState } from "react";
import { Aviso, ContainerButtonCancel, ContainerButtons, ContainerData, ContainerDataUser, ContainerImg, ContentButton, LineButton } from "../style";
import { InputsContainer, SubContainer, SubTitle } from "../../UserDataForm/styles";
import Input from "../../commom/Input";
import Button from "../../commom/Button";


const ContainerEditting = ({data, urlUser, authContext, cancel, handleEditUser, dataCollector}) => {
 
    const [dataNova, setDataNova] = useState(data);
    const [valorData, setValorData] = useState({});
    
    const [toggleContainerButtons, setToggleContainerButtons] = useState(false);
    const [mexeu, setMexeu] = useState(false);

    useEffect(() => {
        setDataNova(data);
    }, [data]);

    useEffect(() => {
        if (mexeu) {
          setToggleContainerButtons(true);
        }
      }, [mexeu]);

      useEffect(() => {
        console.log("Estado atualizado:", valorData);
      }, [valorData]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        
        try{
            handleEditUser(valorData, urlUser);
            cancel();
        } catch (error) {
            console.log("Deu erro");
        }
        
        
      }, [valorData, urlUser, handleEditUser]);

      const handleCancelData = () => {
        if (mexeu){
            setToggleContainerButtons(true);
        } else {
            cancel();
        }
      };

      const onChageData = (value, textValue, valorObj) => {
        if (valorObj == ""){
            setDataNova({...dataNova, [textValue]: value});
            setValorData({...valorData, [textValue]: value});
        } else {
            setDataNova({...dataNova,
                [valorObj]: {...dataNova[valorObj], [textValue]: value},
            });
            setValorData({...valorData,
                [valorObj]: {...valorData[valorObj], [textValue]: value}});
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
                        variant="default"
                        label={"Nome Completo"}
                        name={"nome"}
                        readOnly={false}
                        value={dataNova.name}
                        onChange={(e) => onChageData(e.target.value, "name", "")}
                        />
                        <InputsContainer>
                            <Input
                                variant="default"
                                label={"CPF"}
                                name={"cpf"}    
                                readOnly={false}        
                                value={dataNova.cpf}
                                onChange={(e) => onChageData(e.target.value, "cpf", "")}
                                />
                            <Input
                                variant="default"
                                label={"Data de Nascimento"}
                                name={"nascimento"}
                                readOnly={false}
                                value={dataNova.nascimento}
                                onChange={(e) => onChageData(e.target.value, "nascimento", "")}
                            />
                            <Input
                                variant="default"
                                label={"Registro Geral (RG)"}
                                name={"rg"}
                                readOnly={false}
                                value={dataNova.rg}
                                onChange={(e) => onChageData(e.target.value, "rg", "")}
                            />
                            <Input
                                variant="default"
                                label={"Data de Emissão"}
                                name={"data_de_emissão"}
                                readOnly={false}
                                value={dataNova.emissao}
                                onChange={(e) => onChageData(e.target.value, "emissao", "")}
                            />
                            <Input
                                variant="default-optional"
                                label={"Naturalidade"}
                                name={"naturalidade"}    
                                readOnly={false}   
                                value={dataNova.regional.naturalidade}
                                onChange={(e) => onChageData(e.target.value, "naturalidade", "regional")}                                    
                            />
                            <Input
                                variant="default-optional"
                                label={"Nacionalidade"}
                                name={"nacionalidade"}
                                readOnly={false}
                                value={dataNova.regional.nacionalidade}
                                onChange={(e) => onChageData(e.target.value, "nacionalidade", "regional")}
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
                        value={dataNova.endereco.rua}
                        onChange={(e) => onChageData(e.target.value, "rua", "endereco")}
                        />
                        <InputsContainer>
                        <Input
                            variant="default"
                            label={"Bairro"}
                            name={"Bairro"}
                            readOnly={false}
                            value={dataNova.endereco.bairro}
                            onChange={(e) => onChageData(e.target.value, "bairro", "endereco")}
                        />
                        <Input
                            variant="default"
                            label={"Número"}
                            name={"Número"}
                            readOnly={false}
                            value={dataNova.endereco.numero}
                            onChange={(e) => onChageData(e.target.value, "numero", "endereco")}
                        />
                        <Input
                            variant="default"
                            label={"Cidade"}
                            name={"Cidade"}
                            readOnly={false}
                            value={dataNova.regional.municipio}
                            onChange={(e) => onChageData(e.target.value, "municipio", "regional")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Estado"}
                            name={"Estado"} 
                            readOnly={false} 
                            value={dataNova.regional.estado}
                            onChange={(e) => onChageData(e.target.value, "estado", "regional")}         
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
                        value={dataNova.email}
                        onChange={(e) => onChageData(e.target.value, "email", "")}
                        />
                        <Input
                        variant="default"
                        label={"Senha"}
                        name={"senha"}
                        readOnly={false}
                        value={dataNova.password}
                        onChange={(e) => onChageData(e.target.value, "password", "")}
                        />
                        <Input 
                        variant="default"
                        label={"Telefone"}
                        name={"Telefone"}
                        readOnly={false}
                        value={dataNova.telefone}
                        onChange={(e) => onChageData(e.target.value, "telefone", "")}
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
                            value={dataNova.formacaoSuperior}
                            onChange={(e) => onChageData(e.target.value, "formacaoSuperior", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de Formação"}
                            name={"data_de_formacao"}
                            readOnly={false}
                            value={dataNova.dataFormacao}
                            onChange={(e) => onChageData(e.target.value, "dataFormacao", "")}
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
                            readOnly={false}
                            value={dataNova.profissao}
                            onChange={(e) => onChageData(e.target.value, "profissao", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Organização ou empresa que trabalha"}
                            name={"trabalho"}
                            readOnly={false}
                            value={dataNova.empresa}
                            onChange={(e) => onChageData(e.target.value, "empresa", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Salário"}
                            name={"salario"}
                            readOnly={false}
                            value={dataNova.salario}
                            onChange={(e) => onChageData(e.target.value, "salario", "")}
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
                            readOnly={false}
                            value={dataNova.numRegistroConselho}
                            onChange={(e) => onChageData(e.target.value, "numRegistroConselho", "")}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de registro no conselho"}
                            name={"data_de_registro"}
                            readOnly={false}
                            value={dataNova.dataRegistroConselho}
                            onChange={(e) => onChageData(e.target.value, "dataRegistroConselho", "")}
                        />
                        <InputsContainer>
                            <Input
                                variant="default-optional"
                                label={"Número de Inscrição"}
                                name={"numero_de_inscricao"}
                                readOnly={false}
                                value={dataNova.numInscricao}
                                onChange={(e) => onChageData(e.target.value, "numInscricao", "")}
                            />
                            <Input
                                variant="default-optional"
                                label={"Data de Afiliação"}
                                name={"data_de_afiliacao"}
                                readOnly={false}
                                value={dataNova.dataAfiliacao}
                                onChange={(e) => onChageData(e.target.value, "dataAfiliacao", "")}
                            />
                        </InputsContainer>
                    </SubContainer>
            </ContainerDataUser>
            </ContainerData>

            <ContainerButtons>
                <Button variant='removeBut' onClick={handleCancelData}>
                    CANCELAR
                </Button>
                <Button variant='default-sucess' onClick={handleSubmit}>
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
                        <Button variant='default-sucess' onClick={handleSubmit}>
                            SALVAR ALTERAÇÕES
                        </Button>
                        <Button variant='removeBut' onClick={cancelou}>
                            CANCELAR
                        </Button>
                        </ContentButton>

                        
                    </LineButton>
                </ContainerButtonCancel>
            )}
        </> 
    )
};


export default ContainerEditting;