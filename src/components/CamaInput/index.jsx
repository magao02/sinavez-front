import { Container, DeleteBedButton, Select, } from "./styles"
import Input from "../commom/Input";
import trash from "../../assets/trash.svg";
import Image from "next/image";

const CamaInput = ( {id, deleteCama, handleCama}) => {

    return (
        <Container onChange={(e) => handleCama(id, e)}>
            <Select name="tipoDeCama" id="selectCama">
                <option value="Tipo de Cama" disabled selected hidden>Tipo de Cama</option>
                <option value="Solteiro">Solteiro</option>
                <option value="Casal">Casal</option>
            </Select>
            <Input
                variant="default"
                name="Quantidade"
                type="number"
                placeholder="Quantidade"
            />
            <DeleteBedButton onClick={() => deleteCama(id)}><Image src={trash} alt="trashIcon" width={50} height={50}/></DeleteBedButton>
        </Container>

    )
}

export default CamaInput;