import { Container, ModalContent, Main, TextAside, Button } from "./styles";
import x from "../../../assets/x.svg";
import { ButtonArea } from "./styles";
import { useRouter } from "next/router";
import DarkBackGround from "../DarkBackground";

export const ModalOneButton = ({ title, asideText, id, img }) => {
  const router = useRouter();

  const handlePage = () => {
    router.push("/manageReservations");
  };

  return (
    <Container>
      <DarkBackGround></DarkBackGround>
        <ModalContent id={id}>
          <h2>{title}</h2>
          <Main>
            <img src={img}></img>
            <TextAside>
              <h2>{asideText}</h2>
            </TextAside>
          </Main>
          <ButtonArea>
            <Button onClick={handlePage}>
              <img src={x.src} alt="X" />
              <span>SAIR</span>
            </Button>
          </ButtonArea>
        </ModalContent>

    </Container>
  );
};
