import { Input, CounterInputContainer, CounterInputButton, Label, Select } from "./styles";

import Image from "next/image";

import MinusCircle from "../../assets/minus-circle.svg";
import PlusCircle from "../../assets/plus-circle.svg";

import { useState } from "react";

export const CounterInput = ({ label, min, max, value }) => {
  const [counterValue, setCounterValue] = useState(value ?? 0);

  const realMin = min ?? -Infinity;
  const realMax = max ?? Infinity;

  const decrease = () => {
    setCounterValue(Math.max(counterValue - 1, realMin));
  };

  const increase = () => {
    setCounterValue(Math.min(counterValue + 1, realMax));
  };
  
  return (
    <Label>
      {label}
      <div>
        <CounterInputContainer>
          <CounterInputButton onClick={decrease}>
            <Image src={MinusCircle} />
          </CounterInputButton>

          {counterValue}
          
          <CounterInputButton onClick={increase}>
            <Image src={PlusCircle} />
          </CounterInputButton>
        </CounterInputContainer>
      </div>
    </Label>
  );
};
  
export const DropdownInput = ({ label, options }) => {
  return (
    <Label>
      {label}
      <Select>
        {
          options.map(opt => 
            <option value={opt} key={opt}>{opt}</option>
          )
        }
      </Select>
    </Label>
  );
};

export const SearchInput = ({ label, innerLabel, type, placeholder }) => {
  const onClick = (event) => {
    if (type === 'date' || type === 'time') {
      event.target.showPicker();
      event.preventDefault();
    }
  };
  return (
    <Label>
      {label}
      <div className="container">
        { innerLabel && <p className="innerLabel">{innerLabel}</p> }
        <Input type={type} placeholder={placeholder} onClick={onClick} />
      </div>
    </Label>
  );
};
  