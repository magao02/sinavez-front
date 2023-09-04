import { Container, Label, CheckBox, Button } from "./styles";
import Image from "next/image";
import trash from "../../../assets/trash.svg";

const CheckBoxInput = ({
  label,
  showTrash,
  setChecked,
  deleteItem,
  checked,
}) => {
  if (showTrash) {
    return (
      <Container>
        <Button
          id={label}
          variant={trash}
          onClick={(e) => deleteItem(e.target.parentNode.parentNode)}
        >
          <Image src={trash} alt={"trashIcon"} style={{ width: "100%" }} />
        </Button>
        <Label>{label}</Label>
      </Container>
    );
  } else {
    return (
      <Container>
        <CheckBox
          name="Itens"
          id={label}
          value={label}
          onClick={(e) => setChecked(e.target)}
          checked={checked}
        ></CheckBox>
        <Label>{label}</Label>
      </Container>
    );
  }
};

export default CheckBoxInput;
