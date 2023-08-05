import { Container, Input, Label,Img, Form, EditButton, PhotoArea } from "./styles";
import add from "../../../assets/add_cruz.svg";
import Image from "next/image";
import edit_pen from "../../../assets/edit_pen.svg";

const PhotoInput = ({getPhoto, id, File}) => {
  

  return (
    <Container>
        {File == "" ? (
          <Form style={{width: "100%", height:"100%"}}> 
                <Label for="file">
                  <Image src={add}></Image>
                </Label>
                <Input
                  id="file"
                  accept="image/*"
                  onChange={(e) => getPhoto(e, id)}
                ></Input>
          </Form>
        ) : (
          <PhotoArea>
            <Img src={URL.createObjectURL(File)} alt={File.name} />
            <EditButton>
              <Image src={edit_pen} alt="EditPen" />
            </EditButton>
          </PhotoArea>
        )}
    </Container>
  );
};

export default PhotoInput;
