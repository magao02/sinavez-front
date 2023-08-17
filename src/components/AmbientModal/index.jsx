import ItensModal from "../commom/ItensModal";
import { Container, PhotoArea, InfoArea, MainInfo, ItensArea, Button, TitleAndButtonArea, SpanArea } from "./styles";
import wifi_icon from "../../assets/wifi_icon.svg"
import dog_paw from "../../assets/dog_paw.svg"
import wind from "../../assets/wind.svg"
import suite from "../../assets/suite.svg"

export const AmbientModal = ({title, datas, itens}) => {

    return (
        <Container>
            <PhotoArea>
                <img src="https://img.freepik.com/fotos-gratis/design-moderno-apartamento-com-quarto-e-sala-de-estar_1262-12375.jpg"></img>
            </PhotoArea>
            <InfoArea>
                <MainInfo>
                    <TitleAndButtonArea>
                        <h2>{title}</h2>
                        <Button>VER MAIS</Button>
                    </TitleAndButtonArea>
                    <SpanArea>
                        <span>Reserva mais próxima: De 05/04/2023 até 10/05/2023</span>
                        <span>Próxima reserva: 07/06 até 10/06</span>
                    </SpanArea>
                </MainInfo>
                <ItensArea>
                    {
                        itens.suite &&
                        <ItensModal label={"1 Suite"} img={suite.src}></ItensModal>
                    }
                    {
                        itens.wifi &&
                        <ItensModal label={"Wifi Gratis"} img={wifi_icon.src}></ItensModal>
                    }
                    {
                        itens.animais && 
                        <ItensModal label={"Aceita Pets"} img={dog_paw.src}></ItensModal>
                    }
                    <ItensModal label={"Ar Condicionado"} img={wind.src}></ItensModal>
                </ItensArea>
            </InfoArea>
        </Container>
    )
}

export default AmbientModal;