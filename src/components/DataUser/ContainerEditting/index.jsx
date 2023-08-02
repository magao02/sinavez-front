import React, { useCallback, useEffect, useRef, useState } from "react";
import { Aviso, ContainerButtonCancel, ContainerButtons, ContainerData, ContainerDataUser, ContentButton, LineButton } from "../style";
import { InputsContainer, SubContainer, SubTitle } from "../../UserDataForm/styles";
import Input from "../../commom/Input";
import Button from "../../commom/Button";
import * as service from "../../../services/accounts";


const ContainerEditting = ({data, urlUser, authContext, cancel, handleEditUser, dataCollector}) => {
 
    const [dataNova, setDataNova] = useState(data);
    const [nome , setNome] = useState(dataNova.name);
    const [cpf, setCPF] = useState(dataNova.cpf);
    const [nascimento, setNascimento] = useState(dataNova.nascimento);
    const [rg, setRG] = useState(dataNova.rg);
    const [emissao, setEmissao] = useState(dataNova.emissao);
    const [naturalidade, setNaturalidade] = useState(dataNova.regional.naturalidade);
    const [nacionalidade, setNacionalidade] = useState(dataNova.regional.nacionalidade);
    const [rua, setRua] = useState(dataNova.endereco.rua);
    const [bairro, setBairro] = useState(dataNova.endereco.bairro);
    const [numero, setNumero] = useState(dataNova.endereco.numero);
    const [cidade, setCidade] = useState(dataNova.regional.municipio);
    const [estado, setEstado] = useState(dataNova.regional.estado);
    const [email, setEmail] = useState(dataNova.email);
    const [senha, setSenha] = useState(dataNova.senha);
    const [telefone, setTelefone] = useState(dataNova.telefone);
    const [formacao, setFormacao] = useState(dataNova.formacaoSuperior);
    const [dataFormacao, setDataFormacao] = useState(dataNova.dataFormacao);
    const [profissao, setProfissao] = useState(dataNova.profissao);
    const [trabalho, setTrabalho] = useState(dataNova.instituicaoSuperior);
    const [salario, setSalario] = useState(dataNova.salario);
    const [conselho, setConselho] = useState(dataNova.numRegistroConselho);
    const [dataConselho, setDataConselho] = useState(dataNova.dataRegistroConselho);
    const [inscricao, setInscricao] = useState(dataNova.numInscricao);
    const [dataAfilicao, setDataAfiliacao] = useState(dataNova.dataAfiliacao);

    const [toggleContainerButtons, setToggleContainerButtons] = useState(false);
    const [mexeu, setMexeu] = useState(false);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        setDataNova((p) => ({
            ...p,
            name: nome,
            cpf: cpf,
            nascimento: nascimento,
            rg: rg,
            emissao: emissao,
            email: email,
            senha: senha,
            telefone: telefone,
            formacaoSuperior: formacao,
            dataFormacao: dataFormacao,
            profissao: profissao,
            instituicaoSuperior: trabalho,
            salario: salario,
            numRegistroConselho: conselho,
            dataRegistroConselho: dataConselho,
            numInscricao: inscricao,
            dataAfiliacao: dataAfilicao,
            endereco: {
                rua: rua,
                bairro: bairro,
                numero: numero,
            },
            regional: {
                municipio: cidade,
                estado: estado,
                naturalidade: naturalidade,
                nacionalidade: nacionalidade,
            },
        }));

        try {
            const response = await service.setUserData(urlUser, dataNova, authContext.token);
            console.log(response);
        } catch (error) {
            console.log("Erro ao atualizar dados do usuário");
        }
        
      }, [nome, cpf, nascimento, rg, emissao, naturalidade, nacionalidade, rua, bairro, numero, cidade, estado, email, senha, telefone, formacao, dataFormacao, profissao, trabalho, salario, conselho, dataConselho, inscricao, dataAfilicao]);

      useEffect(() => {
        console.log(dataNova);
    }, [dataNova]);

      const handleCancelData = () => {
        if (mexeu){
            setToggleContainerButtons(true);
        } else {
            cancel();
        }
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
                        value={nome}
                        onChange={(e) => setNome(e.target.value, setMexeu(true))}    
                        />
                        <InputsContainer>
                            <Input
                                variant="default"
                                label={"CPF"}
                                name={"cpf"}    
                                readOnly={false}        
                                value={cpf}
                                onChange={(e) => setCPF(e.target.value, setMexeu(true))}
                                />
                            <Input
                                variant="default"
                                label={"Data de Nascimento"}
                                name={"nascimento"}
                                readOnly={false}
                                value={nascimento}
                                onChange={(e) => setNascimento(e.target.value, setMexeu(true))}
                            />
                            <Input
                                variant="default"
                                label={"Registro Geral (RG)"}
                                name={"rg"}
                                readOnly={false}
                                value={rg}
                                onChange={(e) => setRG(e.target.value, setMexeu(true))}
                            />
                            <Input
                                variant="default"
                                label={"Data de Emissão"}
                                name={"data_de_emissão"}
                                readOnly={false}
                                value={emissao}
                                onChange={(e) => setEmissao(e.target.value, setMexeu(true))}
                            />
                            <Input
                                variant="default-optional"
                                label={"Naturalidade"}
                                name={"naturalidade"}    
                                readOnly={false}   
                                value={naturalidade}
                                onChange={(e) => setNaturalidade(e.target.value, setMexeu(true))}                                    
                            />
                            <Input
                                variant="default-optional"
                                label={"Nacionalidade"}
                                name={"nacionalidade"}
                                readOnly={false}
                                value={nacionalidade}
                                onChange={(e) => setNacionalidade(e.target.value, setMexeu(true))}
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
                        value={rua}
                        onChange={(e) => setRua(e.target.value, setMexeu(true))}
                        />
                        <InputsContainer>
                        <Input
                            variant="default"
                            label={"Bairro"}
                            name={"Bairro"}
                            readOnly={false}
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value, setMexeu(true))}
                        />
                        <Input
                            variant="default"
                            label={"Número"}
                            name={"Número"}
                            readOnly={false}
                            value={numero}
                            onChange={(e) => setNumero(e.target.value, setMexeu(true))}
                        />
                        <Input
                            variant="default"
                            label={"Cidade"}
                            name={"Cidade"}
                            readOnly={false}
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value, setMexeu(true))}
                        />
                        <Input
                            variant="default-optional"
                            label={"Estado"}
                            name={"Estado"} 
                            readOnly={false} 
                            value={estado}
                            onChange={(e) => setEstado(e.target.value, setMexeu(true))}         
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value, setMexeu(true))}
                        />
                        <Input
                        variant="default"
                        label={"Senha"}
                        name={"senha"}
                        readOnly={false}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value, setMexeu(true))}
                        />
                        <Input 
                        variant="default"
                        label={"Telefone"}
                        name={"Telefone"}
                        readOnly={false}
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value, setMexeu(true))}
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
                            value={formacao}
                            onChange={(e) => setFormacao(e.target.value, setMexeu(true))}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de Formação"}
                            name={"data_de_formacao"}
                            readOnly={false}
                            value={dataFormacao}
                            onChange={(e) => setDataFormacao(e.target.value, setMexeu(true))}
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
                            value={profissao}
                            onChange={(e) => setProfissao(e.target.value, setMexeu(true))}
                        />
                        <Input
                            variant="default-optional"
                            label={"Organização ou empresa que trabalha"}
                            name={"trabalho"}
                            readOnly={false}
                            value={trabalho}
                            onChange={(e) => setTrabalho(e.target.value, setMexeu(true))}
                        />
                        <Input
                            variant="default-optional"
                            label={"Salário"}
                            name={"salario"}
                            readOnly={false}
                            value={salario}
                            onChange={(e) => setSalario(e.target.value, setMexeu(true))}
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
                            value={conselho}
                            onChange={(e) => setConselho(e.target.value, setMexeu(true))}
                        />
                        <Input
                            variant="default-optional"
                            label={"Data de registro no conselho"}
                            name={"data_de_registro"}
                            readOnly={false}
                            value={dataConselho}
                            onChange={(e) => setDataConselho(e.target.value, setMexeu(true))}
                        />
                        <InputsContainer>
                            <Input
                                variant="default-optional"
                                label={"Número de Inscrição"}
                                name={"numero_de_inscricao"}
                                readOnly={false}
                                value={inscricao}
                                onChange={(e) => setInscricao(e.target.value, setMexeu(true))}
                            />
                            <Input
                                variant="default-optional"
                                label={"Data de Afiliação"}
                                name={"data_de_afiliacao"}
                                readOnly={false}
                                value={dataAfilicao}
                                onChange={(e) => setDataAfiliacao(e.target.value, setMexeu(true))}
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