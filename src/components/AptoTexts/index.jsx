import { useState } from "react";
import Input from "../commom/Input";
import { Container } from "./styles"


const AptoTexts = ({text, title,type}) => {
    const [value, setValue] = useState();

    return (
        <Container>
            <h3>{title}</h3>
            <Input
                placeholder={text}
                type={type}
                onChange={(event) => setValue(event.target.value)}
            />
        </Container>
    )
}


export default AptoTexts;