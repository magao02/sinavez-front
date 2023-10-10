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
import registration_img from "../../assets/registration.svg"
import right_arrow from "../../assets/right_arrow.svg"

import Navigation from "../../components/commom/Nav";
import Button from "../../components/commom/Button";
import RegistrationModal from "../../components/RegistrationModal";

import {
  Container, BottomCotainer, MainContent, Title, Text, Texts, Main, BottonTitle, BottonMainContent, BottonMain, BottonDetail, TitleBottom, TextBottom, TextsBottom, BottomDivider, LinkText, Sublime, InfoToolTip, RegistrationContainer, CompleteRegistrationContainer, MainRegistrationContent, ImageRegistrationWrapper, TitleRegistration, TextRegistration, ButtonRegistrationContainer, ButtonRegistraion, BorderRegistration
} from "../../styles/homeStyles";

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

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

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

   
          <RegistrationContainer>
              <MainRegistrationContent>
                <ImageRegistrationWrapper>
                  <img src={registration_img.src}></img>
                </ImageRegistrationWrapper>
                <CompleteRegistrationContainer>
                  <TitleRegistration>
                    <h1>Complete seu cadastro</h1>
                    <BorderRegistration></BorderRegistration>
                  </TitleRegistration>
                  <TextRegistration>
                    Manter seus dados atualizados no novo site do Sinavez é essencial para mantermos nossa comunicação eficaz e continuarmos a oferecer benefícios para você.
                    <br></br>
                    <br></br>
                    <br></br>
                    Dedique apenas alguns minutos para completar seu cadastro. Contamos com sua participação para fortalecer nossa comunidade.
                  </TextRegistration>
                  <ButtonRegistrationContainer>
                    <ButtonRegistraion onClick={() => setShowRegistrationModal(!showRegistrationModal)}>COMPLETAR MEU CADASTRO <Image style={{marginLeft: "0px"}} src={right_arrow}></Image></ButtonRegistraion>
                  </ButtonRegistrationContainer>
                </CompleteRegistrationContainer>
              </MainRegistrationContent>
          </RegistrationContainer>
      
      {
        showRegistrationModal && 
          <RegistrationModal></RegistrationModal>
      }


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
          </>}

        </BottonMainContent>
      </BottomCotainer>
      <BottonDetail>
        <Image src={Pattern} height={275} width={2000} />
      </BottonDetail>
    </>
  );
};

export default Home;
