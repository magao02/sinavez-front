import { Container, BaseInput } from './styles';

const Input = ({ variant, label, name, ...rest }) => (
    <Container variant = {variant}>
        {label && <label htmlFor={name}>{label}</label>}
        <BaseInput 
            id={name}
            name={name}
            {...rest}
        />
    </Container>
);

export default Input;