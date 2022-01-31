import { useRouter } from "next/router";

import { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import * as service from "../../services/accounts";

import Navigation from "../../components/commom/Nav";
import RedefinirForm from "../../components/RedefinirForm";

import { Container, ContentContainer } from "../../styles/redefinirStyles";

const Redefinir = () => {
  const [globalMessage, setGlobalMessage] = useState();

  const authContext = useAuth();
  const router = useRouter();

  const setPassword = useCallback(
    async (passwordData) => {
      const responseData = await service.setPassword(
        passwordData,
        authContext.token
      );
      setGlobalMessage(responseData.data.message);
    },
    [authContext]
  );

  const handleValidFormSubmit = useCallback(
    async ({ cpf, password }) => {
      try {
        await setPassword({ cpf, password });
      } catch (error) {
        setGlobalMessage(error.response.data.message);
      }
    },
    [setPassword]
  );

  useEffect(() => {
    if (!authContext.auth) {
      router.push("/login");
      return;
    }
  })

  return (
    <Container>
      <Navigation variant="logged" />
      <ContentContainer>
        <h1>Redefina Sua Senha</h1>
        <RedefinirForm
          globalMessage={globalMessage}
          onValidSubmit={handleValidFormSubmit}
        />
      </ContentContainer>
    </Container>
  );
};

export default Redefinir;
