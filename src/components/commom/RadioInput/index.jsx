import { CheckBox, Container, Input, CheckBoxContainer, Label, Span } from "./styles";

const RadioInput = ({ title, op1, op2, border, addRadioInfo }) => {
  return (
    <Container border={border}>
      <Span>{title}<Span red>*</Span></Span>
      <CheckBoxContainer onChange={(e) => addRadioInfo(e.target)}>
        <form>
          <CheckBox>
            <Input
              name="OPCAO"
              value={op1 ? op1 : true}
              title={title.toLowerCase()}
            />
            <Label htmlFor="checkbox-1" style={{fontSize:"1.7vh"}}>{op1 ? op1 : "Sim"}</Label>
          </CheckBox>
          <CheckBox>
            <Input
              name="OPCAO"
              value={op2 ? op2 : false}
              title={title.toLowerCase()}
            />
            <Label htmlFor="checkbox-2" style={{fontSize:"1.7vh"}}>{op2 ? op2 : "Nao"} </Label>
          </CheckBox>
        </form>
      </CheckBoxContainer>
    </Container>
  );
};

export default RadioInput;
