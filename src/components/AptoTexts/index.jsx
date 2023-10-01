import Input from "../commom/Input";
import { Container, Label, Placeholder } from "./styles"
import { Span } from "../commom/RadioInput/styles";


const AptoTexts = ({text, placeholder, title, setText, type, required}) => {

    return (
        <Container>
            <h3>{title}{required && <Span red>*</Span>}</h3>
            <Label>
                <Input
                    type={type}
                    onChange={(event) => setText(event.target.value)}
                    value={text == 0 ? "" : text}
                />
                {
                    !text && 
                    <Placeholder typeMargin={type}>{placeholder}</Placeholder>

                }
            </Label>
        </Container>
    )
}


export default AptoTexts;