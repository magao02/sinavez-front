import { Container, BaseInput } from './styles';

const Input = ({ variant, label, name, type, ...rest }) => (
    <Container variant = {variant}>
        {label && <label htmlFor={name}>{label}</label>}
        <BaseInput 
            id={name}
            name={name}
            type={type}
            {...rest}
        />
    </Container>
);

export default Input;