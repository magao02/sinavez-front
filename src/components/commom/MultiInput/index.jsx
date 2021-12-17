import { Container, InputsContainer, CheckBox } from './styles.js';

import Input from '../Input';

const MultiInput = ({ label, names }) => (
    <Container>
        <Input variant="signup" label={label} name={names[0]} placeholder={names[0]} />
        <InputsContainer>
            <Input variant="signup" name={names[1]} placeholder={names[1]} />
            <Input variant="signup" name={names[2]} placeholder={names[2]} />
        </InputsContainer>
        <InputsContainer>
        <Input variant="signup" name={names[3]} placeholder={names[3]} />
        <CheckBox> {names[4]}
            <input type="checkbox"></input>
        </CheckBox>
        </InputsContainer>
    </Container>

);

export default MultiInput;