import { Input, CounterInputContainer, CounterInputButton, Label, Select, RangeInput, RangeValues } from "./styles";

import Image from "next/image";

import MinusCircle from "../../assets/minus-circle.svg";
import PlusCircle from "../../assets/plus-circle.svg";

import { useState } from "react";
import { Body3, Subtitle2 } from "../../styles/commonStyles";

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
  
export const DropdownInput = ({ label, options, variant, disabled }) => {
  return (
    <Label>
      {label}
      <Select disabled={!!disabled} variant={variant}>
        {
          options.map(opt => 
            <option value={opt} key={opt}>{opt}</option>
          )
        }
      </Select>
    </Label>
  );
};

export const SearchInput = ({ label, innerLabel, type, placeholder, variant, disabled }) => {
  const onClick = (event) => {
    if (disabled) {
      event.preventDefault();
    } else if (type === 'date' || type === 'time') {
      event.target.showPicker();
      event.preventDefault();
    }
  };
  return (
    <Label variant={variant}>
      <Subtitle2>{label}</Subtitle2>
      <div className="container">
        { innerLabel && <Body3 className="innerLabel">{innerLabel}</Body3> }
        <Input type={type} placeholder={placeholder} onClick={onClick} disabled={!!disabled} />
      </div>
    </Label>
  );
};

export const SliderInput = ({ label, min, max, value }) => {
  return (
    <Label>
      {label}
      <RangeInput type="range" min={min} max={max} value={value} />
      <RangeValues>
        <span>{min}</span>
        <span>{max}</span>
      </RangeValues>
    </Label>
  );
}