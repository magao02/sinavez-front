import { useState } from "react";
import Input from "../commom/Input";
import { Container } from "./styles"


const AptoTexts = ({text, title, setText, type}) => {

    return (
        <Container>
            <h3>{title}</h3>
            <Input
                placeholder={text}
                type={type}
                onChange={(event) => setText(event.target.value)}
            />
        </Container>
    )
}


export default AptoTexts;