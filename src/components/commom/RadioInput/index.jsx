import { CheckBox, Container, Input, CheckBoxContainer, Label } from "./styles"


const RadioInput = ( {title, op1, op2 ,border, addRadioInfo}) => {


        const handle = () => {
            var el = document.getElementsByName("OPCAO");
            el.forEach((radio) => {
                if(radio.checked){
                    addRadioInfo(title, radio.value)
                }
            })
        }

        return (
            <Container border={border}>
                <span>{title}</span>
                <CheckBoxContainer>
                    <form>
                        <CheckBox>
                            <Input onChange={handle} name="OPCAO" value={op1 ? op1 : "Sim"}/>
                            <Label htmlFor="checkbox-1">{op1 ? op1 : "Sim"}</Label>
                        </CheckBox>
                        <CheckBox>
                            <Input onChange={handle} name="OPCAO" value={op2 ? op2 : "Nao"}/>
                            <Label htmlFor="checkbox-2">{op2 ? op2 : "Nao"}</Label>
                        </CheckBox>
                    </form>
                </CheckBoxContainer>
            </Container>
        )

}

export default RadioInput;