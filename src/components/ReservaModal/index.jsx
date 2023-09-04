import { Button, Container, FotoArea, FotoBox, InfoArea, PagamentoArea, PersonInfoArea, ReservaInfoArea, PagamentoInfo, DataContainer, DataMainContent, Border, DataMainInfo, DataDiv, GeralDataContainer, DataTitleArea, DataSecondArea, DataRowContainer, DataContentWrapper, DataCollumContainer } from "./styles";
import arrow_down from "../../assets/arrow_down_blue.svg"
import { useState } from "react";

const ReservaModal = () => {

    const [showInfo, setShowInfo] = useState(false)

        if(showInfo) {
            return (
                <DataContainer>
                    <DataMainContent>
                        <FotoArea>
                            <FotoBox>
                                <img></img>
                            </FotoBox>
                        </FotoArea>
                        <InfoArea>
                            <PersonInfoArea>
                                <h3>Aldemar Martins Guerra Cunha Almeida</h3>
                                <p>Engenheiro Agrônomo</p>
                            </PersonInfoArea>
                            <ReservaInfoArea>
                                <p>Reservou este apartamento para os dias 12/04 à 18/04</p>
                            </ReservaInfoArea>
                        </InfoArea>
                        <PagamentoArea>
                            <PagamentoInfo color="#FF730E">Pagamento pendente</PagamentoInfo>
                            <Button onClick={() => setShowInfo(!showInfo)}>VER DADOS DA RESERVA <img src={arrow_down.src} alt="arrow" /></Button>
                        </PagamentoArea>
                    </DataMainContent>
                    <Border></Border>
                    <DataDiv>
                        <DataMainInfo>
                            <GeralDataContainer>
                                <DataTitleArea>Dados Gerais</DataTitleArea>
                                <DataRowContainer>
                                    <DataContentWrapper>    
                                        <h4>Chegada: </h4>
                                        <DataSecondArea>
                                            <span>08/06/2023</span>
                                            <span>10:00 Manhã</span>
                                        </DataSecondArea>
                                    </DataContentWrapper>
                                    <DataContentWrapper>    
                                        <h4>Saída:</h4>
                                        <DataSecondArea>
                                            <span>10/06/2023</span>
                                            <span>18:00 Noite</span>
                                        </DataSecondArea>
                                    </DataContentWrapper>
                                </DataRowContainer>
                            </GeralDataContainer>
                            <GeralDataContainer>
                                <DataTitleArea>Hóspedes</DataTitleArea>
                                <DataRowContainer>
                                    <DataContentWrapper>    
                                        <h4>Quantidade: </h4>
                                        <DataSecondArea>
                                            <span>2 adultos; </span>
                                            <span>3 crianças;</span>
                                        </DataSecondArea>
                                    </DataContentWrapper>
                                    <DataContentWrapper>    
                                        <DataSecondArea>
                                            <span>0 bebês;</span>
                                            <span>0 animais;</span>
                                        </DataSecondArea>
                                    </DataContentWrapper>
                                </DataRowContainer>
                            </GeralDataContainer>
                            <GeralDataContainer border={"none"}>
                                <DataTitleArea>Valores</DataTitleArea>
                                <DataCollumContainer>
                                    <DataContentWrapper>    
                                        <h4>Valor da diária: </h4>
                                        <DataSecondArea><span>R$ 40,00</span></DataSecondArea>
                                    </DataContentWrapper>
                                    <DataContentWrapper>    
                                        <h4>Quantidade de diárias: </h4>
                                        <DataSecondArea><span>3 dias</span></DataSecondArea>
                                    </DataContentWrapper>
                                </DataCollumContainer>
                            </GeralDataContainer>
                        </DataMainInfo>
                    </DataDiv>
                    <Border></Border>   
                </DataContainer>
            )
        }else{
            return (
                <Container>
                    <FotoArea>
                        <FotoBox>
                            <img></img>
                        </FotoBox>
                    </FotoArea>
                    <InfoArea>
                        <PersonInfoArea>
                            <h3>Aldemar Martins Guerra Cunha Almeida</h3>
                            <p>Engenheiro Agrônomo</p>
                        </PersonInfoArea>
                        <ReservaInfoArea>
                            <p>Reservou este apartamento para os dias 12/04 à 18/04</p>
                        </ReservaInfoArea>
                    </InfoArea>
                    <PagamentoArea>
                        <PagamentoInfo color="#FF730E">Pagamento pendente</PagamentoInfo>
                        <Button onClick={() => setShowInfo(!showInfo)}>VER DADOS DA RESERVA <img src={arrow_down.src} alt="arrow" /></Button>
                    </PagamentoArea>
                </Container>
            )
        }
}

export default ReservaModal;