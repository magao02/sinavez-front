import Input from "../commom/Input";
import { Container } from "./styles"
import { Span } from "../commom/RadioInput/styles";


const AptoTexts = ({text, placeholder, title, setText, type, required}) => {

    return (
        <Container>
            <h3>{title}{required && <Span red>*</Span>}</h3>
            <Input
                placeholder={placeholder}
                type={type}
                onChange={(event) => setText(event.target.value)}
                value={text}
            />
        </Container>
    )
}


export default AptoTexts;