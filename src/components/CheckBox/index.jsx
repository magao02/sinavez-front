import { Container, CheckArea } from "./styles";
import CheckBoxInput from "../commom/CheckBoxInput";

const CheckBox = ({ showTrash, options, setChecked, deleteItem }) => {
  const splitArrayEqually = (array, parts) => {
    const totalLength = array.length;
    const partSize = Math.floor(totalLength / parts);
    const remainder = totalLength % parts;

    const result = [];
    let startIndex = 0;

    for (let i = 0; i < parts; i++) {
      const size = partSize + (i < remainder ? 1 : 0);
      const part = array.slice(startIndex, startIndex + size);
      result.push(part);
      startIndex += size;
    }

    return result;
  };

  return (
    <Container>
      {splitArrayEqually(options, 3).map((data, key) => {
        return (
          <CheckArea id={key}>
            {data.map((item) => {
              return (
                <CheckBoxInput
                  showTrash={showTrash}
                  label={item.name}
                  setChecked={setChecked}
                  deleteItem={deleteItem}
                  checked={item.checked}
                />
              );
            })}
          </CheckArea>
        );
      })}
    </Container>
  );
};

export default CheckBox;
