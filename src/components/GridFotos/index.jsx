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

const GridFotos = ({ images, setImages, onChange }) => {
  images = images ?? [];
  const getPhoto = ({ target: { files } }, id) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImages([...images, reader.result]);
      onChange();
    });
    reader.readAsDataURL(files[0]);

  };

  const deletePhoto = (id) => {
    setImages(images.filter((_, i) => i != id));
    onChange();
  }

  return (
    <Container>
      <FotosContainer>
        <PhotoArea width={"40%"}>
          <PhotoInput id={0} getPhoto={getPhoto} url={images[0]} deletePhoto={deletePhoto}/>
        </PhotoArea>
        <PhotoList>
          <PhotoAreaSmaller>
            <PhotoInput id={1} getPhoto={getPhoto} url={images[1]} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={2} getPhoto={getPhoto} url={images[2]} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={3} getPhoto={getPhoto} url={images[3]} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={4} getPhoto={getPhoto} url={images[4]} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={5} getPhoto={getPhoto} url={images[5]} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput id={6} getPhoto={getPhoto} url={images[6]} deletePhoto={deletePhoto}/>
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
