import {
    StepColor,
    StepDivider,
    StepNumber,
    Steps as BaseSteps,
    getColorsForVariant,
} from "./styles";

const Step = ({ active, number, children, colors }) => {
    return (
      <StepColor active={active} colors={colors}>
        <StepNumber active={active} colors={colors}>{number}</StepNumber> {children}
      </StepColor>
    );
};

const Steps = ({ values, current, variant }) => {
    const children = [];
    const colors = getColorsForVariant(variant);
    values.forEach((value, i) => {
        if (i !== 0)
            children.push(<StepDivider colors={colors} key={-i} />);
        children.push(<Step colors={colors} active={current === i} number={i + 1} key={i}>{value}</Step>);
    });
    return (
        <BaseSteps colors={colors}>
            {children}
        </BaseSteps>
    );
};

export default Steps;