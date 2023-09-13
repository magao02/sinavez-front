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
  RadioInputWrapper,
  ProgressBar
} from "./styles";
import arrow_down from "../../assets/arrow_down_blue.svg";
import { useState } from "react";
import upload_cloud from "../../assets/upload_cloud.svg"
import excluir_comprovante from "../../assets/excluir_comprovante.svg"
import { dateFromDMY } from "../../utils/date";

const ReservaCard = ({ obj, id, handlePagamento, handleFile, deleteFile}) => {

  const [showInfo, setShowInfo] = useState(false);
  const [file, setFile] = useState(obj.pagamento.files);
  const [progress, setProgress] = useState(0);

  const formatDate = (data, style) => {
    const newDate = dateFromDMY(data);

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

  const getFile = ( event ) => {
    const file = event.target.files[0]
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        setProgress(percentage);
      }
    }

    setFile([file])
    handleFile(id, file)
    reader.readAsDataURL(file)
  }

  const formatHora = ( horario ) => {
    var hora = parseInt(horario.slice(0,2))
    if(hora >= 0 && hora <= 12){
      return `${horario} manhã`
    }else if (hora <= 18){
      return `${horario} tarde`
    }else{
      return `${horario} noite`
    }
  }


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
                    <span>{formatHora(obj.horarioChegada)}</span>
                  </DataSecondArea>
                </DataContentWrapper>
                <DataContentWrapper>
                  <h4>Saída:</h4>
                  <DataSecondArea>
                    <span>{formatDate(obj.dataSaida, "full")}</span>
                    <span>{formatHora(obj.horarioSaida)}</span>
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
                    <label key={id}>
                      <input type="file" key={id} name="file" accept="image/jpg, image/jpeg ,image/png, application/pdf" onChange={(e) => getFile(e)}/>
                      <img src={upload_cloud.src} />
                      <TextArea>
                          <h3>Adicione um comprovante de pagamento</h3>
                          <span>Formatos aceitos: JPEG, PNG, PDF</span>
                      </TextArea>
                    </label>
                </InputComprovanteArea>
                <LoadFileArea>
                    <span>{file[file?.length - 1]?.name}</span>
                    {
                      file && file?.length > 0 &&
                      <img src={excluir_comprovante.src} onClick={() => {
                        deleteFile(id, file[file?.length - 1])
                        setFile([])
                        setProgress(0)
                      }}></img>
                    }
                </LoadFileArea>
                <ProgressBar width={progress + "%"}></ProgressBar>
                <RadioInputArea>
                    <span>Atualize a situação do pagamento</span>
                        <RadioInputsContainer onChange={() => handlePagamento(id)}>
                              <RadioInputWrapper>
                                <input type="radio" id={id} name={id}  checked={obj.pagamento.pago == true}/>
                                <label htmlFor={"pago"}>{"Pago"}</label>
                              </RadioInputWrapper>
                              <RadioInputWrapper>
                                <input type="radio" id={id} name={id} checked={obj.pagamento.pago == false}/>
                                <label htmlFor={"pendente"}>{"Pendente"}</label>
                              </RadioInputWrapper>
                        </RadioInputsContainer>
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

export default ReservaCard;
