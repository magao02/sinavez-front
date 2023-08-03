import { Container, Input, Label,Img, Form } from "./styles";
import add from "../../../assets/add_cruz.svg";
import Image from "next/image";
import { useState } from "react";

const PhotoInput = () => {
  const [fileName, setFileName] = useState("No selected File");
  const [image, setImage] = useState(null);

  const getPhoto = ({ target: { files } }) => {
    files[0] && setFileName(files[0].name);
    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
  }

  return (
    <Container>
        {!image ? (
          <Form style={{width: "100%", height:"100%"}}> 
                <Label for="file">
                  <Image src={add}></Image>
                </Label>
                <Input
                  id="file"
                  accept="image/*"
                  onChange={({ target: { files } }) => {
                    files[0] && setFileName(files[0].name);
                    if (files) {
                      setImage(URL.createObjectURL(files[0]));
                    }
                  }}
                ></Input>
          </Form>
        ) : (
          <Img src={image} alt={fileName}></Img>
        )}
    </Container>
  );
};

export default PhotoInput;
