import {  Container, Label, CheckBox, Button } from "./styles"
import Image from "next/image";
import trash from "../../../assets/trash.svg";

const CheckBoxInput = ({label, showTrash}) => {
        
        if(showTrash.showTrash){
            return (
                    <Container>
                        <Button variant={trash}>
                            <Image src={trash} alt={"trashIcon"} />
                        </Button>
                        <Label>{label}</Label>
                    </Container>
                )
            }else{
                return (
                    <Container>
                        <CheckBox name="Itens" id={label} value={label} onClick={(e) => console.log(e.target.value)}></CheckBox>
                        <Label>{label}</Label>
                    </Container>

                )

            }
            
    
}

export default CheckBoxInput;