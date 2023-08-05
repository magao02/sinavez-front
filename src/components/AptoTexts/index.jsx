import Input from "../commom/Input";
import { Container } from "./styles"
import { Span } from "../commom/RadioInput/styles";


const AptoTexts = ({text, title, setText, type, required}) => {

    return (
        <Container>
            <h3>{title}{required && <Span red>*</Span>}</h3>
            <Input
                placeholder={text}
                type={type}
                onChange={(event) => setText(event.target.value)}
            />
        </Container>
    )
}


export default AptoTexts;