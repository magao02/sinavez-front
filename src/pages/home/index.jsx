import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import userComputer from "../../assets/user_computer.svg";
import repeatTutorial from "../../assets/repeat.svg";
import IconInfoOutline from "../../assets/info_icon.svg";
import IconInfoFilled from "../../assets/info_filled.svg";
import BuildIcon from "../../assets/white_build_icon.svg";
import ProfileIcon from "../../assets/white_profile_icon.svg";
import ConfigIcon from "../../assets/white_config_icon.svg";
import BrawerIcon from "../../assets/white_brawer_icon.svg";
import Pattern from "../../assets/home_pattern.svg"
import Vector from "../../assets/Vector.svg"
import Sucess from "../../assets/sucess.svg"
import X from "../../assets/x.svg"

import DarkBackground from "../../components/commom/DarkBackground"

import Navigation from "../../components/commom/Nav";
import Button from "../../components/commom/Button";
import * as service from "../../services/accounts";


import {
  Container,BottomCotainer, MainContent, Title, Text, Texts, Main, BottonTitle, BottonMainContent, BottonMain, BottonDetail, TitleBottom, TextBottom, TextsBottom, BottomDivider, LinkText, Sublime, InfoToolTip, BottonMainCad, ToggleCard, CardPreCadastro, Card, ContainerPreCadastro, TitlePreCadastro, SpanInput
} from "../../styles/homeStyles";
import Input from "../../components/commom/Input";
import { ButtonCancel, CancelBox, CancelOptions, ContainerCancel, TextCancel, TitleCancel } from "../../components/CancelForm/style";
import SucessAdd from "../../components/CancelForm/SucessAdd";

function InfoIcon({ children }) {
  const [hovering, setHovering] = useState(false);


  return <>
    <div
      style={{position: "relative", display: "flex"}}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <Image src={hovering ? IconInfoFilled : IconInfoOutline} />
      {hovering && <InfoToolTip>{children}</InfoToolTip>}
    </div>
  </>;
}

const Home = () => {
  const router = useRouter();

  const authContext = useAuth();

  const checkNav = () => {
    if (authContext.admin == 'true' || authContext.admin == true) {
      return "admin"
    }
    else {
      return "logged";
    }
  }

  useEffect(() => {
    if (!authContext.auth) {
      router.push("/login");
      return;
    }
  }, []);

  const [toggle, setToggle] = useState(false);
  const [finishCad, setFinishCad] = useState(false);
  const [nameUser, setNameUser] = useState('');
  const [collectedData, setCollectedData] = useState({});
  const [spanError, setSpanError] = useState(false);

  const showToggle = () => {
    setToggle(!toggle);
  }

  const showFinishCad = () => {

    if (collectedData.name == undefined || collectedData.name == '' || collectedData.cpf == undefined || collectedData.cpf == '' || collectedData.password == undefined || collectedData.password == '') {
      setSpanError(true);
    } else {
      setToggle(false)
      setSpanError(false);
      preCadastro();
      setFinishCad(!finishCad);
    }
  }

  const takeName = (nome) => {
    setNameUser(nome);
  }

  const dataCollected = (data) => {
    setCollectedData(data);
    console.log(collectedData);
  }

  useEffect(() => {
    dataCollected(collectedData);
  }, [collectedData]);

  const preCadastro = useCallback(async () => {
    try {
      const response = await service.incompleteDataUser(collectedData, authContext.token);
      console.log(response);
    } catch (error) {
      console.log("Deu erro");
    }
  }, [collectedData]);

  return (
    <>
      <Container>
        <Navigation selectedPage={"home"} variant={checkNav()} />
        <Main>
          <MainContent>
            <Texts>
              <Title>
                Bem vindo à Sinavez
                Sinta-se a vontade!
              </Title>
              <Text>
                Agora a Sinavez está com site novo! E além de mais bonito, ele está mais fácil de se usar!
                Com o Onboarding você pode descobrir como navegar com facilidade e tranquilidade e sem se estressar com o caminho!
              </Text>
              <Link href={"/onboarding"}>
                <Button variant="white">
                  <Image src={repeatTutorial} />
                  REFAZER TUTORIAL
                </Button>
              </Link>
            </Texts>
            <Image src={userComputer} />
          </MainContent>
        </Main>
      </Container>

      <BottomCotainer>
        <BottonMainContent>
          <Texts>
            <BottonTitle>
              Espaço Pessoal
              <InfoIcon>
                Espaço destinado aos associados. Aqui você terá acesso à página de apartamentos e ao seu perfil!<br/>
                Basta clicar no botão que você será redirecionado para a página desejada.
              </InfoIcon>
            </BottonTitle>
          </Texts>
          <BottonMain>
            <Link href={"/apartamentos"}>
              <Button variant="home">
                <Image src={BuildIcon} />
                <TextsBottom>
                  <TitleBottom>
                    Reservar Apartamentos
                  </TitleBottom>
                  <TextBottom>
                    Quer alugar um apartamento para passar um
                    <br />
                    tempo com a família fora? Acesse a página para 
                    <br/>
                    consultar a disponibilidade!
                  </TextBottom>
                  <LinkText>
                    Veja mais
                    <Sublime />
                  </LinkText>
                </TextsBottom>
              </Button>
            </Link>
            <Link href={"/usuario"}>
              <Button variant="home">
                <Image src={ProfileIcon} />
                <TextsBottom>
                  <TitleBottom>
                    Meu Perfil
                  </TitleBottom>
                  <TextBottom>
                    No seu perfil, você poderá encontrar seus dados 
                    <br />
                    e dos seus dependentes. Acesse a página para 
                    <br />
                    vê-los e atualiza-los!
                  </TextBottom>
                  <LinkText>
                    Veja mais
                    <Sublime />
                  </LinkText>
                </TextsBottom>
              </Button>
            </Link>
          </BottonMain>

          <BottomDivider />

          { authContext.admin && <>
          <Texts>
            <BottonTitle>
              Espaço Administrativo
              <InfoIcon>
                Espaço destinado aos administradores. Aqui você terá acesso à página de gerenciamento de apartamentos e associados!<br/>
                Basta clicar no botão que você será redirecionado para a página desejada.
              </InfoIcon>
            </BottonTitle>
          </Texts>
          <BottonMain>
            <Link href={"/associados"}>
              <Button variant="home">
                <Image src={ConfigIcon} />
                <TextsBottom>
                  <TitleBottom>
                    Gerenciar Associados
                  </TitleBottom>
                  <TextBottom>
                    Está precisando alterar informações dos 
                    <br />
                    associados e seus dependentes? Essa página 
                    <br />
                    pode te ajudar com isso!
                  </TextBottom>
                  <LinkText>
                    Veja mais
                    <Sublime />
                  </LinkText>
                </TextsBottom>
              </Button>
            </Link>
            <Link href={"/manageReservations"}>
              <Button variant="home">
                <Image src={BrawerIcon} />
                <TextsBottom>
                  <TitleBottom>
                    Gerenciar Apartamentos
                  </TitleBottom>
                  <TextBottom>
                    Está precisando alterar informações nos
                    <br />
                    apartamentos? Essa página pode te ajudar com
                    <br />
                    isso!
                  </TextBottom>
                  <LinkText>
                    Veja mais
                    <Sublime />
                  </LinkText>
                </TextsBottom>
              </Button>
            </Link>
          </BottonMain>

          <BottonMainCad>
                <Button variant="pre-cad" onClick={showToggle}>
                  <Image src={Vector} />
                  <TextsBottom>
                    <TitleBottom>
                      Pré-cadastro de associados
                    </TitleBottom>
                    <TextBottom>
                      Faça o pré-cadastro de um associado!
                    </TextBottom>
                    <LinkText onClick={showToggle}>
                      PRÉ-CADASTRAR
                      <Sublime />
                    </LinkText>
                  </TextsBottom>
                </Button>
            </BottonMainCad>
          </>}

          {toggle &&
            <>
              <ToggleCard/>
                <Card>
                  <CardPreCadastro>
                    <ContainerPreCadastro>
                      <TitlePreCadastro>PRÉ-CADASTRO DO ASSOCIADO</TitlePreCadastro>
                      <Input
                        label="Nome"
                        name="name"
                        type="text"
                        placeholder="Digite um nome"
                        onChange={(e) => dataCollected({ ...collectedData, name: e.target.value })}
                      />
                      <SpanInput span={spanError} >Digite um nome válido</SpanInput>
                      <Input
                        label="E-mail"
                        name="email"
                        type="text"
                        placeholder="Digite um e-mail válido"
                        onChange={(e) => dataCollected({ ...collectedData, email: e.target.value })}
                      />
                      <SpanInput span={spanError}>Digite um e-mail válido</SpanInput>
                      <Input
                        label="Usuário"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        onChange={(e) => dataCollected({ ...collectedData, cpf: e.target.value })}
                      />
                      <SpanInput span={spanError} >Digite o CPF do associado no campo a cima (apenas números)</SpanInput>
                      <Input
                        label="Senha"
                        name="password"
                        type="text"
                        placeholder="Digite uma senha "
                        onChange={(e) => dataCollected({ ...collectedData, password: e.target.value })}
                      />
                      <SpanInput span={spanError}>Repita o CPF inserido anteriormente</SpanInput>

                      <Button variant="default" onClick={showFinishCad}>CONCLUIR</Button>
                    </ContainerPreCadastro>
                  </CardPreCadastro>
                </Card>
            </>
          }

          {finishCad &&
            <>
              <SucessAdd showFinishCad={showFinishCad} name={collectedData.name}/>
            </>
          }

        </BottonMainContent>
      </BottomCotainer>
      <BottonDetail>
        <Image src={Pattern} height={275} width={2000} />
      </BottonDetail>
    </>
  );
};

export default Home;
