import PhotoInput from "../commom/PhotoInput";
import {
  Container,
  PhotoArea,
  PhotoAreaSmaller,
  PhotoList,
  FotosContainer,
  Span,
  TextArea,
} from "./styles";
import editPen from "../../assets/edit_pen.svg";
import Image from "next/image";
import { useState } from "react";

const GridFotos = () => {
  const [Images, setImages] = useState([
    {
      id: 0,
      name: "",
      file: "",
    },
    {
      id: 1,
      name: "",
      file: "",
    },
    {
      id: 2,
      name: "",
      file: "",
    },
    {
      id: 3,
      name: "",
      file: "",
    },
    {
      id: 4,
      name: "",
      file: "",
    },
    {
      id: 5,
      name: "",
      file: "",
    },
    {
      id: 6,
      name: "",
      file: "",
    },
  ]);

  const getPhoto = ({ target: { files } }, id) => {
    var fotos = [...Images];

    fotos.map((item) => {
      if (item.id == id) {
        item.file = files[0];
        item.name = files[0].name;
      }
    });

    setImages(fotos);
  };

  return (
    <Container>
      <FotosContainer>
        <PhotoArea width={"40%"}>
          <PhotoInput id={0} getPhoto={getPhoto} File={Images[0].file} />
        </PhotoArea>
        <PhotoList>
          <PhotoAreaSmaller>
            <PhotoInput id={1} getPhoto={getPhoto} File={Images[1].file} />
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={2} getPhoto={getPhoto} File={Images[2].file} />
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={3} getPhoto={getPhoto} File={Images[3].file} />
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={4} getPhoto={getPhoto} File={Images[4].file} />
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={5} getPhoto={getPhoto} File={Images[5].file} />
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={6} getPhoto={getPhoto} File={Images[6].file} />
          </PhotoAreaSmaller>
        </PhotoList>
      </FotosContainer>
      <TextArea>
        <Span>
          *Adicione fotos do apartamento clicando no ícone “+” e escolhendo do
          seu computador até 5 imagens nos formatos .jpg, .png, .pdf ou .svg.
        </Span>
        <Span>
          **Edite as fotos do apartamento clicando no ícone “
          <Image src={editPen} alt={editPen} height={13}></Image>” e substitua a
          imagem.
        </Span>
      </TextArea>
    </Container>
  );
};

export default GridFotos;
