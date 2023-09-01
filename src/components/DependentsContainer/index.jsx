import { useRef, useCallback, useState, useEffect } from "react";

import { useAdmin } from "../../contexts/AdminContext";

import * as validation from "../../utils/validation";

import Input from "../commom/Input";
import Button from "../commom/Button";

import {
  Container,
  Header,
  Form,
  Title,
  SubTitle,
  FormContainer,
} from "./styles";

const DependentsForm = ({takeNewData, submitForm, pad, url, token, number, marginTop, takeDataDependents, editDependents, dadosDep }) => {
  const nameRef = useRef();
  const cpfRef = useRef();
  const nascimentoRef = useRef();
  const rgRef = useRef();
  const emissaoRef = useRef();
  const parentescoRef = useRef(); 

  const [dataDependentes, setDataDependentes] = useState({});
  let indice = 2;

  const [dataNova, setDataNova] = useState(dadosDep);
  const [valorData, setValorData] = useState({});

  useEffect(() => {
    setDataNova(dadosDep);
  }, [dadosDep]);

  useEffect(() => {
    enviarNewData(valorData);
  }, [valorData]);

  const onChageData = (value, textValue) => {
      setDataNova({...dataNova, [textValue]: value});
      setValorData({...valorData, [textValue]: value});
      enviarNewData(valorData);
  };

  const enviarNewData = (data) => {
    takeNewData(data);
  };


  const enviarDados = (data) => {
    if (data.name != undefined && data.cpf != undefined && data.nascimento != undefined && data.rg != undefined && data.emissao != undefined && data.parentesco != undefined){
      takeDataDependents({
        name: data.name,
        cpf: data.cpf,
        nascimento: data.nascimento,
        rg: data.rg,
        emissao: data.emissao,
        parentesco: data.parentesco,
        indice: indice
      });

      indice = indice + 1;
      console.log("enviou dados do dep");
      
    }
  };

  const onChangeInput = useCallback((value, textValue) => {
    setDataDependentes(prevState => ({ ...prevState, [textValue]: value }));
    console.log(textValue, value);
    enviarDados(dataDependentes);
  }, [dataDependentes]);

  useEffect(() => {
    enviarDados(dataDependentes);
  }, [dataDependentes]);

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [nameRef,
      nascimentoRef,
      cpfRef,
      rgRef,
      emissaoRef, 
      parentescoRef
    ];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate())
    );

    return validationResults.every((result) => result === true);
  });

  const handleSubmit = useCallback(async (event) => {
      event.preventDefault();
      const isValidSubmit = await allFieldsAreValid();

      if (!isValidSubmit) return;

      const [name, nascimento, cpf, rg, emissao, parentesco] = [
        nameRef,
        nascimentoRef,
        cpfRef,
        rgRef,
        emissaoRef,
        parentescoRef
      ].map((inputRef) => inputRef.current?.value);
        
      submitForm({ name, nascimento, cpf, rg, emissao, parentesco });
    },
    [allFieldsAreValid, submitForm, url, token]
  );
  if (!editDependents){
        return (
          <Container variant="default" padding={pad ? pad : false} gap={marginTop} onSubmit={handleSubmit}>
            <SubTitle marginTop = {marginTop}>
              Dados do Dependente {number !== 0 ? number : ""}
            </SubTitle>
            <Input
              variant="default"
              label={"Nome Completo"}
              name={"name"}
              placeholder={"Nome Completo"}
              onChange={(event) => onChangeInput(event.target.value, "name")}
              ref={nameRef}
              validate={validation.requiredTextField}
            />
            <Input
              variant="default"
              label={"Data de nascimento"}
              name={"nascimento"}
              placeholder={"DD/MM/AAAA"}
              onChange={(event) => onChangeInput(event.target.value, "nascimento")}
              ref={nascimentoRef}
              validate={validation.testDate}
            />
            <Input
              variant="default"
              label={"CPF"}
              name={"cpf"}
              placeholder={"000.000.000-0"}
              ref={cpfRef}
              onChange={(event) => onChangeInput(event.target.value, "cpf")}
              validate={validation.testCpf}
            />
            <Input
              variant="default"
              label={"RG"}
              name={"rg"}
              placeholder={"Digite o RG do dependente"}
              onChange={(event) => onChangeInput(event.target.value, "rg")}
              ref={rgRef}
              validate={validation.TextField}
            />
            <Input
              variant="default"
              label={"Data de emissão"}
              name={"emissao"}
              placeholder={"DD/MM/AAAA"}
              onChange={(event) => onChangeInput(event.target.value, "emissao")}
              ref={emissaoRef}
              validate={validation.testDate}
            />
            <Input
              variant="default"
              label={"Parentesco"}
              name={"parentesco"}
              placeholder={"Filho/Filha/Neto/etc"}
              onChange={(event) => onChangeInput(event.target.value, "parentesco")}
              ref={parentescoRef}
              validate={validation.TextField}
            />
          </Container>
        );
      } else {
    return (
      <Container variant="default" padding={pad ? pad : false} gap={marginTop} onSubmit={handleSubmit}>
        <SubTitle marginTop = {marginTop}>
          Dados do Dependente {number !== 0 ? number : ""}
        </SubTitle>
        <Input
          variant="default"
          label={"Nome Completo"}
          name={"name"}
          placeholder={"Nome Completo"}
          value={dataNova.name}
          onChange={(e) => onChageData(e.target.value, "name")}
          validate={validation.requiredTextField}
        />
        <Input
          variant="default"
          label={"Data de nascimento"}
          name={"nascimento"}
          placeholder={"DD/MM/AAAA"}
          value={dataNova.nascimento}
          readOnly={false}
          onChange={(e) => onChageData(e.target.value, "nascimento")}
          validate={validation.testDate}
        />
        <Input
          variant="default"
          label={"CPF"}
          name={"cpf"}
          placeholder={"000.000.000-0"}
          value={dataNova.cpf}
          readOnly={false}
          onChange={(e) => onChageData(e.target.value, "cpf")}
          validate={validation.testCpf}
        />
        <Input
          variant="default"
          label={"RG"}
          name={"rg"}
          placeholder={"Digite o RG do dependente"}
          value={dataNova.rg}
          readOnly={false}
          onChange={(e) => onChageData(e.target.value, "rg")}
          validate={validation.TextField}
        />
        <Input
          variant="default"
          label={"Data de emissão"}
          name={"emissao"}
          placeholder={"DD/MM/AAAA"}
          value={dataNova.emissao}
          readOnly={false}
          onChange={(e) => onChageData(e.target.value, "emissao")}
          validate={validation.testDate}
        />
        <Input
          variant="default"
          label={"Parentesco"}
          name={"parentesco"}
          placeholder={"Filho/Filha/Neto/etc"}
          value={dadosDep.parentesco}
          readOnly={false}
          onChange={(e) => onChageData(e.target.value, "parentesco")}
          validate={validation.TextField}
        />
      </Container>
    );
  }
  //   case "admin": {
  //     return (
  //       <Container variant="admin">
  //         <Button variant={"close"} onClick={() => window.location.reload(true)}>
  //           &#10005;
  //         </Button>
  //         <Header>
  //           <Title>Cadastrar Dependente</Title>
  //           <SubTitle>{adminContext.associado.name}</SubTitle>
  //         </Header>
  //         <Form onSubmit={handleSubmit}>
  //           <FormContainer>
  //             <Input
  //               type="text"
  //               label="Nome"
  //               placeholder="Digite seu nome completo"
  //               variant="signup"
  //               ref={nameRef}
  //               validate={validation.requiredTextField}
  //             />
  //             <Input
  //               type="text"
  //               label="Data de Nascimento"
  //               placeholder="DD/MM/AAAA"
  //               variant="signup-optional"
  //               ref={birthdayRef}
  //               validate={validation.testDate}
  //             />
  //             <Input
  //               type="text"
  //               label="CPF"
  //               placeholder="Digite apenas os números do CPF"
  //               variant="signup-optional"
  //               ref={cpfRef}
  //               validate={validation.testCpf}
  //             />
  //           </FormContainer>
  //           <FormContainer>
  //             <Input
  //               type="text"
  //               label="RG"
  //               placeholder="Digite os números do seu RG"
  //               variant="signup-optional"
  //               ref={rgRef}
  //               validate={validation.testNumbers}
  //             />
  //             <Input
  //               type="text"
  //               label="Data de Emissão"
  //               placeholder="DD/MM/AAAA"
  //               variant="signup-optional"
  //               ref={dataEmissaoRef}
  //               validate={validation.testDate}
  //             />
  //             <Button variant="signup">Cadastrar Dependente</Button>
  //             {adminContext.globalMessage && (
  //               <span>{adminContext.globalMessage}</span>
  //             )}
  //           </FormContainer>
  //         </Form>
  //       </Container>
  //     );
  //   }
  // }
};



export default DependentsForm;
