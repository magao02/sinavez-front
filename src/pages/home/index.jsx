import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import userComputer from "../../assets/user_computer.svg";
import repeatTutorial from "../../assets/repeat.svg";

import Navigation from "../../components/commom/Nav";

import {
  Container, MainContent, Title, Text, Texts, Main, Button
} from "../../styles/homeStyles";

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

  return (
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
              Com o Onboarding você pode descobrir como nagegar com facilidade e tranquilidade e sem se estressar com o caminho!
            </Text>
            <Link href={"/onboarding"}>
              <Button>
                <Image src={repeatTutorial} />
                REFAZER TUTORIAL
              </Button>
            </Link>
          </Texts>
          <Image src={userComputer} />
        </MainContent>
      </Main>
    </Container>
  );
};

export default Home;
