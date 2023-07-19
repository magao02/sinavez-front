import {
    StepColor,
    StepDivider,
    StepNumber,
    Steps as BaseSteps,
} from "./styles";

const Step = ({ active, number, children }) => {
    return (
      <StepColor active={active}>
        <StepNumber active={active}>{number}</StepNumber> {children}
      </StepColor>
    );
};

const Steps = ({ values, current }) => {
    const children = [];
    values.forEach((value, i) => {
        if (i !== 0)
            children.push(<StepDivider key={-i} />);
        children.push(<Step active={current === i} number={i + 1} key={i}>{value}</Step>);
    });
    return (
        <BaseSteps>
            {children}
        </BaseSteps>
    );
};

export default Steps;