import { useCallback, useRef, useState } from "react";

import { Container, InputContainer, InputColumn, InputYear } from "./styles";
import * as validation from "../../utils/validation";

import Button from "../commom/Button";
import Input from "../commom/Input";

const PdfForm = ({ handleSubmitForm, data, actualPerson, ano }) => {
  let [depedentIndex, setDepedentIndex] = useState(-1)

  try{ if (depedentIndex == -1) {
    var janeiro = data.impostoDeRenda.janeiro;
    var fevereiro = data.impostoDeRenda.fevereiro;
    var marco = data.impostoDeRenda.marco;
    var abril = data.impostoDeRenda.abril;
    var maio = data.impostoDeRenda.maio;
    var junho = data.impostoDeRenda.junho;
    var julho = data.impostoDeRenda.julho;
    var agosto = data.impostoDeRenda.agosto;
    var setembro = data.impostoDeRenda.setembro;
    var outubro = data.impostoDeRenda.outubro;
    var novembro = data.impostoDeRenda.novembro;
    var dezembro = data.impostoDeRenda.dezembro;
  } else {
    var janeiro = data.dependentes[depedentIndex].impostoDeRenda[0].janeiro;
    var fevereiro = data.dependentes[depedentIndex].impostoDeRenda[0].fevereiro;
    var marco = data.dependentes[depedentIndex].impostoDeRenda[0].marco;
    var abril = data.dependentes[depedentIndex].impostoDeRenda[0].abril;
    var maio = data.dependentes[depedentIndex].impostoDeRenda[0].maio;
    var junho = data.dependentes[depedentIndex].impostoDeRenda[0].junho;
    var julho = data.dependentes[depedentIndex].impostoDeRenda[0].julho;
    var agosto = data.dependentes[depedentIndex].impostoDeRenda[0].agosto;
    var setembro = data.dependentes[depedentIndex].impostoDeRenda[0].setembro;
    var outubro = data.dependentes[depedentIndex].impostoDeRenda[0].outubro;
    var novembro = data.dependentes[depedentIndex].impostoDeRenda[0].novembro;
    var dezembro = data.dependentes[depedentIndex].impostoDeRenda[0].dezembro;
  };}catch{};

  const janRef = useRef();
  const fevRef = useRef();
  const marRef = useRef();
  const abrRef = useRef();
  const maiRef = useRef();
  const junRef = useRef();
  const julRef = useRef();
  const agoRef = useRef();
  const setRef = useRef();
  const outRef = useRef();
  const novRef = useRef();
  const dezRef = useRef();
  const anoRef = useRef();

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      janRef,
      fevRef,
      marRef,
      abrRef,
      maiRef,
      junRef,
      julRef,
      agoRef,
      setRef,
      outRef,
      novRef,
      dezRef,
    ];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate())
    );

    return validationResults.every((result) => result === true);
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    const isValidSubmit = await allFieldsAreValid();

    if (!isValidSubmit) return;

    const [
      janeiro,
      fevereiro,
      marco,
      abril,
      maio,
      junho,
      julho,
      agosto,
      setembro,
      outubro,
      novembro,
      dezembro,
    ] = [
      janRef,
      fevRef,
      marRef,
      abrRef,
      maiRef,
      junRef,
      julRef,
      agoRef,
      setRef,
      outRef,
      novRef,
      dezRef,
    ].map((inputRef) => Number(inputRef.current?.value.replace(",", ".")));
    
    cleanInputs();

    handleSubmitForm({
      impostoDeRenda: {
        ano: ano,
        janeiro,
        fevereiro,
        marco,
        abril,
        maio,
        junho,
        julho,
        agosto,
        setembro,
        outubro,
        novembro,
        dezembro,
      }
    });
  }, [allFieldsAreValid, handleSubmitForm]);

  const cleanInputs = () => {
    janRef.current.clear();
    fevRef.current.clear();
    marRef.current.clear();
    abrRef.current.clear();
    maiRef.current.clear();
    junRef.current.clear();
    julRef.current.clear();
    agoRef.current.clear();
    setRef.current.clear();
    outRef.current.clear();
    novRef.current.clear();
    dezRef.current.clear();
  }

  return (
    <Container onSubmit={handleSubmit}>
      <InputContainer>
        <InputColumn>
          <Input
            variant="default"
            label="Janeiro"
            name="janeiro"
            placeholder={janeiro}
            ref={janRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Fevereiro"
            name="fevereiro"
            placeholder={fevereiro}
            ref={fevRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Março"
            name="março"
            placeholder={marco}
            ref={marRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Abril"
            name="abril"
            placeholder={abril}
            ref={abrRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Maio"
            name="maio"
            placeholder={maio}
            ref={maiRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Junho"
            name="junho"
            placeholder={junho}
            ref={junRef}
            validate={validation.testNumberImposto}
          />
        </InputColumn>

        <InputColumn>
          <Input
            variant="default"
            label="Julho"
            name="julho"
            placeholder={julho}
            ref={julRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Agosto"
            name="agosto"
            placeholder={agosto}
            ref={agoRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Setembro"
            name="setembro"
            placeholder={setembro}
            ref={setRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Outubro"
            name="outubro"
            placeholder={outubro}
            ref={outRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Novembro"
            name="novembro"
            placeholder={novembro}
            ref={novRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Dezembro"
            name="dezembro"
            placeholder={dezembro}
            ref={dezRef}
            validate={validation.testNumberImposto}
          />
        </InputColumn>
      </InputContainer>
      <Button onClick={() => setDepedentIndex(depedentIndex + 1)} variant="default">Enviar</Button>
    </Container>
  );
};

export default PdfForm;
