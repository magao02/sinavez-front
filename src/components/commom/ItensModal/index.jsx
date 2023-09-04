import { Container } from "./styles"

const ItensModal = ({label, img}) => {
    return (
        <Container>
            <img src={img}></img>
            <label>{label}</label>
        </Container>
    )
}

export default ItensModal