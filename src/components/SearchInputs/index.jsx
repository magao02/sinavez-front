import { Input, CounterInputContainer, CounterInputButton, Label, Select, RangeInput, RangeValues, SliderTooltipContainer, SliderTooltip } from "./styles";

import Image from "next/image";

import MinusCircle from "../../assets/minus-circle.svg";
import PlusCircle from "../../assets/plus-circle.svg";

import { useMemo, useState } from "react";
import { Body3, Subtitle2 } from "../../styles/commonStyles";
import { dateToYMD } from "../../utils/date";

export const CounterInput = ({ label, min, max, value, onChange }) => {
  const [counterValue, setCounterValue] = useState(value ?? 0);

  const realMin = min ?? -Infinity;
  const realMax = max ?? Infinity;

  const decrease = () => {
    const newValue = Math.max(counterValue - 1, realMin);
    setCounterValue(newValue);
    onChange(newValue);
  };

  const increase = () => {
    const newValue = Math.min(counterValue + 1, realMax);
    setCounterValue(newValue);
    onChange(newValue);
  };
  
  return (
    <Label>
      <Subtitle2>{label}</Subtitle2>
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
  
export const DropdownInput = ({ label, options, variant, disabled, onChange }) => {
  const handleChange = (ev) => {
    if (onChange)
      onChange(ev.target.options[ev.target.options.selectedIndex].value);
  }
  return (
    <Label>
      <Subtitle2>{label}</Subtitle2>
      <Select disabled={!!disabled} variant={variant} onChange={handleChange}>
        {
          options.map(opt => 
            <option value={opt} key={opt}>{opt}</option>
          )
        }
      </Select>
    </Label>
  );
};

export const SearchInput = ({ label, innerLabel, type, placeholder, variant, disabled, initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const onClick = (event) => {
    if (disabled) {
      event.preventDefault();
    } else if (type === 'date' || type === 'time') {
      event.target.showPicker();
      event.preventDefault();
    }
  };
  const processValue = (value) => {
    if (type === 'date' && value instanceof Date) {
      return dateToYMD(value);
    }
    return value;
  }
  const update = (ev) => {
    setValue(ev.target.value);
    if (onChange)
      onChange(ev);
  }
  return (
    <Label variant={variant}>
      <Subtitle2>{label}</Subtitle2>
      <div className="container">
        { innerLabel && <Body3 className="innerLabel">{innerLabel}</Body3> }
        <Input type={type} placeholder={placeholder} onClick={onClick} disabled={!!disabled} value={processValue(value)} onChange={update} required />
      </div>
    </Label>
  );
};

export const SliderInput = ({ label, min, max, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const handleChange = (ev) => {
    if (onChange)
      onChange(parseInt(ev.target.value));
    setLocalValue(parseInt(ev.target.value));
  };
  const percent = useMemo(() => {
    return (localValue - min) / (max - min) * 100;
  }, [localValue]);
  return (
    <Label>
      <Subtitle2>{label}</Subtitle2>
      <SliderTooltipContainer>
        <SliderTooltip percent={`${percent}%`}>{localValue}</SliderTooltip>
      </SliderTooltipContainer>
      <RangeInput type="range" min={min} max={max} value={value} onChange={handleChange} />
      <RangeValues>
        <span>{min}</span>
        <span>{max}</span>
      </RangeValues>
    </Label>
  );
}