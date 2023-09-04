import { Container } from "./styles";

const Button = ({ variant, children, ...rest }) => (
  <Container
    disabledButton={(props) => props.disabledButton}
    blue={(props) => props.blue}
    variant={variant}
    {...rest}
  >
    {children}
  </Container>
);

export default Button;
