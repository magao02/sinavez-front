import {
  Button,
  Container,
  FotoArea,
  FotoBox,
  InfoArea,
  PagamentoArea,
  PersonInfoArea,
  ReservaInfoArea,
  PagamentoInfo,
  DataContainer,
  DataMainContent,
  Border,
  DataMainInfo,
  DataDiv,
  GeralDataContainer,
  DataTitleArea,
  DataSecondArea,
  DataRowContainer,
  DataContentWrapper,
  DataCollumContainer,
  NotaFiscalContainer,
  InfoNotaFiscal,
  InputComprovanteArea,
  TextArea,
  LoadFileArea,
  RadioInputArea,
  RadioInputsContainer,
  RadioInputWrapper
} from "./styles";
import arrow_down from "../../assets/arrow_down_blue.svg";
import { useState } from "react";
import upload_cloud from "../../assets/upload_cloud.svg"
import { useEffect } from "react";


const ReservaModal = ({ obj }) => {
  const [showInfo, setShowInfo] = useState(false);

  const formatDate = (data, style) => {
    const newDate = new Date(data);
    newDate.setDate(newDate.getDate() + 1);

    var optionsShort = {
      short: {
        month: "numeric",
        day: "numeric",
      },
      full: {
        dateStyle: "short",
      },
    };

    const estilo = style == "short" ? optionsShort.short : optionsShort.full;
    const formatter = Intl.DateTimeFormat("pt-br", estilo);

    return formatter.format(newDate);
  };

  useEffect(() => {
    () => radioChecked()
  }, [])

  if (showInfo) {
    return (
      <DataContainer>
        <DataMainContent>
          <FotoArea>
            <FotoBox>
              <img src={obj.associado.profilePic}></img>
            </FotoBox>
          </FotoArea>
          <InfoArea>
            <PersonInfoArea>
              <h3>{obj.associado.nome}</h3>
              <p>{obj.associado.profissao}</p>
            </PersonInfoArea>
            <ReservaInfoArea>
              <p>
                Reservou este apartamento para os dias{" "}
                {formatDate(obj.dataChegada, "short")} à{" "}
                {formatDate(obj.dataSaida, "short")}
              </p>
            </ReservaInfoArea>
          </InfoArea>
          <PagamentoArea>
            <PagamentoInfo pagamento={obj.pagamento.pago}>
              Pagamento {obj.pagamento.pago ? "efetuado" : "pendente"}
            </PagamentoInfo>
            <Button onClick={() => setShowInfo(!showInfo)}>
              VER DADOS DA RESERVA <img src={arrow_down.src} alt="arrow" />
            </Button>
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
                    <span>{formatDate(obj.dataChegada, "full")}</span>
                    <span>{obj.horarioChegada}</span>
                  </DataSecondArea>
                </DataContentWrapper>
                <DataContentWrapper>
                  <h4>Saída:</h4>
                  <DataSecondArea>
                    <span>{formatDate(obj.dataSaida, "full")}</span>
                    <span>{obj.horarioSaida}</span>
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
                    <span>{obj.hospedes.adultos} adultos; </span>
                    <span>{obj.hospedes.criancas} crianças;</span>
                  </DataSecondArea>
                </DataContentWrapper>
                <DataContentWrapper>
                  <DataSecondArea>
                    <span>{obj.hospedes.bebes} bebês;</span>
                    <span>{obj.hospedes.animais} animais;</span>
                  </DataSecondArea>
                </DataContentWrapper>
              </DataRowContainer>
            </GeralDataContainer>
            <GeralDataContainer border={"none"}>
              <DataTitleArea>Valores</DataTitleArea>
              <DataCollumContainer>
                <DataContentWrapper>
                  <h4>Valor da diária: </h4>
                  <DataSecondArea>
                    <span>R$ {obj.diaria}</span>
                  </DataSecondArea>
                </DataContentWrapper>
                <DataContentWrapper>
                  <h4>Quantidade de diárias: </h4>
                  <DataSecondArea>
                    <span>{obj.dias} dias</span>
                  </DataSecondArea>
                </DataContentWrapper>
              </DataCollumContainer>
            </GeralDataContainer>
          </DataMainInfo>
        </DataDiv>
        <Border></Border>
        <NotaFiscalContainer>
            <InfoNotaFiscal>
                <DataTitleArea>
                    <h3>Informações do pagamento</h3>
                </DataTitleArea>
                <InputComprovanteArea>
                    <img src={upload_cloud.src} />
                    <TextArea>
                        <h3>Adicione um comprovante de pagamento</h3>
                        <span>Formatos aceitos: JPEG, PNG, PDF</span>
                    </TextArea>
                </InputComprovanteArea>
                <LoadFileArea>
                    <span>file</span>
                </LoadFileArea>
                <RadioInputArea>
                    <span>Atualize a situação do pagamento</span>
                    <form>
                        <RadioInputsContainer>
                            <RadioInputWrapper>
                                <input type="radio" name="pagamento" value="pago" id="pago"/>
                                <label htmlFor="pago">Pago</label>
                            </RadioInputWrapper>
                            <RadioInputWrapper>
                                <input type="radio" name="pagamento" value="pendente" id="pendente"/>
                                <label htmlFor="pendente">Pendente</label>
                            </RadioInputWrapper>
                        </RadioInputsContainer>
                    </form>
                </RadioInputArea>
            </InfoNotaFiscal>
        </NotaFiscalContainer>
      </DataContainer>
    );
  } else {
    return (
      <Container>
        <FotoArea>
          <FotoBox>
            <img src={obj.associado.profilePic}></img>
          </FotoBox>
        </FotoArea>
        <InfoArea>
          <PersonInfoArea>
            <h3>{obj.associado.nome}</h3>
            <p>{obj.associado.profissao}</p>
          </PersonInfoArea>
          <ReservaInfoArea>
            <p>
              Reservou este apartamento para os dias{" "}
              {formatDate(obj.dataChegada, "short")} à{" "}
              {formatDate(obj.dataSaida, "short")}
            </p>
          </ReservaInfoArea>
        </InfoArea>
        <PagamentoArea>
          <PagamentoInfo pagamento={obj.pagamento.pago}>
            Pagamento {obj.pagamento.pago ? "efetuado" : "pendente"}
          </PagamentoInfo>
          <Button onClick={() => setShowInfo(!showInfo)}>
            VER DADOS DA RESERVA <img src={arrow_down.src} alt="arrow" />
          </Button>
        </PagamentoArea>
      </Container>
    );
  }
};

export default ReservaModal;
