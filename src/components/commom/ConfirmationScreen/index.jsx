import { Container, TextField, MainContent, ButtonField, CancelButton } from "./styles";
import Button from "../Button";
import DarkBackground from "../DarkBackground";
import { useCallback } from "react";

import * as service from "../../../services/accounts";
import { useAuth } from "../../../contexts/AuthContext";
import { useAdmin } from "../../../contexts/AdminContext";
import { useRouter } from "next/router";

const ConfirmationScreen = (props) => {
  const router = useRouter();

  switch (props.variant) {
    case "setAdm":
      const authContext = useAuth();

      const userPromote = useCallback(
        async (userUrl) => {
          try {
            const userPromoteResponse = await service.setAdmin(
              userUrl,
              authContext.token
            );
            alert(userPromoteResponse.data.message);
          } catch (error) {
            console.log(error);
          }
        },
        [authContext.token]
      );

      return (
        <Container>
          <MainContent>
            <Button variant={"close"} onClick={props.showUserPromote} >
              &#10005;
            </Button>
            <TextField>
              {props.children}
            </TextField>
            <Button variant={"default"} onClick={() => userPromote(localStorage.getItem("urlUser"))} >
              {props.buttonText}
            </Button>
          </MainContent>
        </Container>
      )

    case "cancelOnBoarding":
      return (
        <>
          <DarkBackground />
          <Container>
            <TextField>
              {props.children}
            </TextField>
            <ButtonField>
              <CancelButton onClick={props.continue}>
                Cancelar
              </CancelButton>
              <Button variant={"default"} onClick={() => router.push("./home")}>
                {props.buttonText}
              </Button>
            </ButtonField>
          </Container>
        </>
      )
  }
}

export default ConfirmationScreen;