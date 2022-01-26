import { useState, useEffect } from 'react';

import { Container, InputsContainer, CheckBox } from "./styles.js";

import Input from "../Input";

const MultiInput = (props) => MultiInputVariant(props);

const MultiInputVariant = ({ label, names, refs, validation, variant }) => {
  switch (variant) {
    case "step1": {
      return (
        <Container>
          <Input
            variant="signup"
            label={label}
            name={names[0]}
            placeholder={names[0]}
            ref={refs.ruaRef}
            validate={validation.requiredTextField}
          />
          <InputsContainer>
            <Input
              variant="signup"
              name={names[1]}
              placeholder={names[1]}
              ref={refs.bairroRef}
              validate={validation.requiredTextField}
            />
            <Input
              variant="signup"
              name={names[2]}
              placeholder={names[2]}
              ref={refs.complementoRef}
              validate={validation.requiredTextField}
            />
          </InputsContainer>
          <InputsContainer>
            <Input
              variant="signup"
              name={names[3]}
              placeholder={names[3]}
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
            variant="signup"
            label={label}
            name={names[0]}
            placeholder={names[0]}
            ref={refs.cidadeRef}
            validate={validation.requiredTextField}
          />
          <InputsContainer>
            <Input
              variant="signup"
              name={names[1]}
              placeholder={names[1]}
              ref={refs.estadoRef}
              validate={validation.requiredTextField}
            />
            <Input
              variant="signup"
              name={names[2]}
              placeholder={names[2]}
              ref={refs.naturalidadeRef}
              validate={validation.requiredTextField}
            />
          </InputsContainer>
          <InputsContainer>
            <Input
              variant="signup"
              name={names[3]}
              placeholder={names[3]}
              ref={refs.nacionalidadeRef}
              validate={validation.requiredTextField}
            />
          </InputsContainer>
        </Container>
      );
    }
  }
};

export default MultiInput;
