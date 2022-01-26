import { useCallback, useRef } from "react";

import { Container, InputContainer, InputColumn } from "./styles";
import * as validation from "../../utils/validation";

import Button from "../commom/Button";
import Input from "../commom/Input";

const PdfForm = ({ handleSubmitForm }) => {
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
  });

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

    handleSubmitForm({impostoDeRenda: {
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
    }});
  });

  return (
    <Container onSubmit={handleSubmit}>
      <InputContainer>
        <InputColumn>
          <Input
            variant="default"
            label="Janeiro"
            name="janeiro"
            placeholder="Digite o valor referente a janeiro"
            ref={janRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Fevereiro"
            name="fevereiro"
            placeholder="Digite o valor referente a fevereiro"
            ref={fevRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Março"
            name="março"
            placeholder="Digite o valor referente a março"
            ref={marRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Abril"
            name="abril"
            placeholder="Digite o valor referente a abril"
            ref={abrRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Maio"
            name="maio"
            placeholder="Digite o valor referente a maio"
            ref={maiRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Junho"
            name="junho"
            placeholder="Digite o valor referente a junho"
            ref={junRef}
            validate={validation.testNumberImposto}
          />
        </InputColumn>
        <InputColumn>
          <Input
            variant="default"
            label="Julho"
            name="julho"
            placeholder="Digite o valor referente a julho"
            ref={julRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Agosto"
            name="agosto"
            placeholder="Digite o valor referente a agosto"
            ref={agoRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Setembro"
            name="setembro"
            placeholder="Digite o valor referente a setembro"
            ref={setRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Outubro"
            name="outubro"
            placeholder="Digite o valor referente a outubro"
            ref={outRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Novembro"
            name="novembro"
            placeholder="Digite o valor referente a novembro"
            ref={novRef}
            validate={validation.testNumberImposto}
          />
          <Input
            variant="default"
            label="Dezembro"
            name="dezembro"
            placeholder="Digite o valor referente a dezembro"
            ref={dezRef}
            validate={validation.testNumberImposto}
          />
        </InputColumn>
      </InputContainer>
      <Button variant="default">Enviar</Button>
    </Container>
  );
};

export default PdfForm;
