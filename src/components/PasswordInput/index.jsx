import { Container, BaseInput } from './styles';

const Input = ({ label, name, ...rest }) => (
    <Container>
        {label && <label htmlFor={name}>{label}</label>}
        <BaseInput 
            id={name}
            name={name}
            {...rest}
        />
    </Container>
);

export default Input;
