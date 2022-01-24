import { useRouter } from "next/router";

import { useState, useEffect, useCallback } from "react";

import {
  Container,
  MainContent,
  Title,
  SubTitle,
  GreetingsContainer,
} from "./styles";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";

import PdfForm from "../../components/PdfForm";

const PDF = () => {
  return (
    <Container>
      <Navigation variant="logged" />
      <MainContent>
        <GreetingsContainer>
          <Title>Imposto de Renda</Title>
          <SubTitle>P</SubTitle>
        </GreetingsContainer>
        <PdfForm />
      </MainContent>
    </Container>
  );
};

export default PDF;
