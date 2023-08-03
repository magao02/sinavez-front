import PhotoInput from "../commom/PhotoInput"
import { Container, PhotoArea, PhotoAreaSmaller , PhotoList, FotosContainer, Span, TextArea } from "./styles"
import editPen from "../../assets/edit_pen.svg";
import Image from "next/image";
import { useState } from "react";

const GridFotos = () => {

    const[selectedImage, setSelectedImage] = useState([
        {
            id: 0,
            name: "",
            src: "https://cdn-jghdn.nitrocdn.com/WaAKrPwVavvRtmiuchNkiowpZvENVGmM/assets/images/optimized/rev-61e101a/www.homehost.com.br/blog/wp-content/uploads/2019/07/logo_homehost-Copia-100x.png"
        }
    ]);

    const getPhoto = ({ target: { files } }) => {
        var fotos = [...selectedImage];
        
        console.log(files)

        /*

        files[0] && setFileName(files[0].name);

        if (files) {
          setImage(URL.createObjectURL(files[0]));
        }*/
      }

    return (
        <Container>
            <FotosContainer>
                <PhotoArea width={"40%"} style={{marginRight:"7px"}} selectedImage={selectedImage}>
                        <PhotoInput getPhoto={getPhoto}/>    
                </PhotoArea>
                <PhotoList>
                    <PhotoAreaSmaller>
                        <PhotoInput></PhotoInput>
                    </PhotoAreaSmaller>
                    <PhotoAreaSmaller>
                        <PhotoInput></PhotoInput>
                    </PhotoAreaSmaller>
                    <PhotoAreaSmaller>
                        <PhotoInput></PhotoInput>
                    </PhotoAreaSmaller>
                    <PhotoAreaSmaller>
                        <PhotoInput></PhotoInput>
                    </PhotoAreaSmaller>
                    <PhotoAreaSmaller>
                        <PhotoInput></PhotoInput>
                    </PhotoAreaSmaller>
                    <PhotoAreaSmaller>
                        <PhotoInput></PhotoInput>
                    </PhotoAreaSmaller>
                </PhotoList>
            </FotosContainer>
            <TextArea>
                <Span>*Adicione fotos do apartamento clicando no ícone “+” e escolhendo do seu computador até 5 imagens nos formatos .jpg, .png, .pdf ou .svg.</Span>
                <Span>**Edite as fotos do apartamento clicando no ícone “<Image src={editPen} alt={editPen} height={13}></Image>” e substitua a imagem.</Span>
            </TextArea>
        </Container>
    )
}

export default GridFotos