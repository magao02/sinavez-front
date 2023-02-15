import { useState, useEffect } from 'react';

import { Container, InputsContainer } from "./styles.js";

import Input from "../Input";

const MultiInput = (props) => MultiInputVariant(props);

const MultiInputVariant = ({ label, names, refs, validation, variant, placeholders }) => {

  switch (variant) {
    case "step1": {
      return (
        <Container>
          <Input
            variant="signup-optional"
            label={label}
            name={names[0]}
            placeholder={placeholders ? placeholders.rua : names[0]}
            ref={refs.ruaRef}
            validate={validation.TextField}
          />
          <InputsContainer>
            <Input
              variant="signup-optional"
              name={names[1]}
              placeholder={placeholders ? placeholders.bairro : names[1]}
              ref={refs.bairroRef}
              validate={validation.TextField}
            />
            <Input
              variant="signup-optional"
              name={names[2]}
              placeholder={placeholders ? placeholders.complemento : names[2]}
              ref={refs.complementoRef}
              validate={validation.TextField}
            />
          </InputsContainer>
          <InputsContainer>
            <Input
              variant="signup-optional"
              name={names[3]}
              placeholder={placeholders ? placeholders.numero : names[3]}
              ref={refs.numeroRef}
              validate={validation.testNumbers}
            />
          </InputsContainer>
        </Container>
      );
    }
    case "step2": {
      return (
        <Container>
          <Input
            variant="signup-optional"
            label={label}
            name={names[0]}
            placeholder={placeholders ? placeholders.municipio : names[0]}
            ref={refs.cidadeRef}
            validate={validation.TextField}
          />
          <InputsContainer>
            <Input
              variant="signup-optional"
              name={names[1]}
              placeholder={placeholders ? placeholders.estado : names[1]}
              ref={refs.estadoRef}
              validate={validation.TextField}
            />
            <Input
              variant="signup-optional"
              name={names[2]}
              placeholder={placeholders ? placeholders.naturalidade : names[2]}
              ref={refs.naturalidadeRef}
              validate={validation.TextField}
            />
          </InputsContainer>
          <InputsContainer>
            <Input
              variant="signup-optional"
              name={names[3]}
              placeholder={placeholders ? placeholders.nacionalidade : names[3]}
              ref={refs.nacionalidadeRef}
              validate={validation.TextField}
            />
          </InputsContainer>
        </Container>
      );
    }
  }
};

export default MultiInput;
