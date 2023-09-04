import ItensModal from "../commom/ItensModal";
import { Container, PhotoArea, InfoArea, MainInfo, ItensArea, Button, TitleAndButtonArea, SpanArea, Status } from "./styles";
import wifi_icon from "../../assets/wifi_icon.svg"
import dog_paw from "../../assets/dog_paw.svg"
import wind from "../../assets/wind.svg"
import suite from "../../assets/suite.svg"
import { useRouter } from "next/router";


export const AmbientModal = ({title, datas, itens, status, url, showVerMais, ambientType}) => {

    const router = useRouter();

    const handleRedirectVerMais = () => {
        router.push(`/ambienteDados?url=${url}`)
        localStorage.setItem("urlAmbient", url)
        localStorage.setItem("ambientType", ambientType)
    }

    const handleRedirectEdit = () => {
        if(localStorage.getItem("ambientType") == "apto"){
            router.push(`/editApartment?url=${url}`)
        }else{
            router.push(`/editRecreationArea?url=${url}`)
        }
    }



    return (
        <Container>
            <PhotoArea>
                <img src="https://img.freepik.com/fotos-gratis/design-moderno-apartamento-com-quarto-e-sala-de-estar_1262-12375.jpg"></img>
                <Status status={status}> {status ? "Livre agora" : "Reservado agora"}</Status>
            </PhotoArea>
            <InfoArea>
                <MainInfo>
                    <TitleAndButtonArea>
                        <h2>{title}</h2>
                        {
                            showVerMais ?
                            <Button onClick={handleRedirectVerMais}>VER MAIS</Button>
                            :
                            <Button onClick={handleRedirectEdit}>EDITAR DADOS</Button>
                        }
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
                    {
                        itens.arCondicionado && 
                        <ItensModal label={"Ar Condicionado"} img={wind.src}></ItensModal>
                    }
                </ItensArea>
            </InfoArea>
        </Container>
    )
}

export default AmbientModal;