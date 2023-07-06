import { useEffect, useState } from "react";

import { Buttons } from "./styles";

import Button from "../Button";

import Left from "../../../assets/caret_left.svg";
import Right from "../../../assets/caret_right.svg";

import Image from "next/image";

const Paginator = ({ previousDisabled, nextDisabled, previousBlue, nextBlue, totalQuantity, currentIndex, paginate }) => {
  const [numbers, setNumbers] = useState([]);

  const prepareNumber = () => {
    const newNumbers = [];
    for (let i = 1; i < 8; i++) {
      if ((currentIndex + ((i) * 20)) > totalQuantity) break;
      const num = Math.ceil((currentIndex + ((i) * 20)) / 20);
      newNumbers.push(<Button variant={"squared"} blue={i == 1} onClick={() => paginate((num - 1) * 20 - currentIndex)} >{num}</Button>);
    }
    setNumbers(newNumbers);
  };

  useEffect(() => {
    prepareNumber();
  }, [currentIndex]);

  return (
    <Buttons>
      <Button variant={"squared"} disabledButton={previousDisabled} onClick={() => !previousDisabled ? paginate(-20) : undefined} blue={previousBlue}>
        <Image src={Left} />
      </Button>
      {numbers}
      <Button variant={"squared"} disabledButton={nextDisabled} onClick={() => !nextDisabled ? paginate(20) : undefined} blue={nextBlue}>
        <Image src={Right} />
      </Button>
    </Buttons>
  )
}

export default Paginator;