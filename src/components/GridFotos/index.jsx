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

const GridFotos = ( {Images, setImages }) => {

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

  const deletePhoto = (event) => {
    var itemId = event.target.parentNode.parentNode.id;

    var Fotos = [...Images]; 
    
      Fotos.forEach((data) => {
      if(data.id == itemId){
        data.name = "";
        data.file = "";
      }
    })

    setImages(Fotos)
  }

  return (
    <Container>
      <FotosContainer>
        <PhotoArea width={"40%"}>
          <PhotoInput  id={0} getPhoto={getPhoto} File={Images.length > 0 ? Images[0].file : ""} deletePhoto={deletePhoto}/>
        </PhotoArea>
        <PhotoList>
          <PhotoAreaSmaller>
            <PhotoInput  id={1} getPhoto={getPhoto} File={Images.length > 0 ? Images[1].file : ""} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput  id={2} getPhoto={getPhoto} File={Images.length > 0 ? Images[2].file : ""} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput  id={3} getPhoto={getPhoto} File={Images.length > 0 ? Images[3].file : ""} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput  id={4} getPhoto={getPhoto} File={Images.length > 0 ? Images[4].file : ""} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput  id={5} getPhoto={getPhoto} File={Images.length > 0 ? Images[5].file : ""} deletePhoto={deletePhoto}/>
          </PhotoAreaSmaller>
          <PhotoAreaSmaller>
            <PhotoInput  id={6} getPhoto={getPhoto} File={Images.length > 0 ? Images[6].file : ""} deletePhoto={deletePhoto}/>
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
