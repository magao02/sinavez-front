import { Container } from './styles';

const Button = ({ variant, children, ...rest }) => 
<Container 
variant={variant}{...rest}>{children
}</Container>

export default Button;