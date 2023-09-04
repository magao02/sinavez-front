import styled from "styled-components";
import theme from "../../styles/theme";

export function getColorsForVariant(variant) {
    switch (variant) {
        default: return {
            activeText: '#043F79',
            text: theme.colors.gray.default,
            divider: '#808080',
            activeBackground: theme.colors.blue.border,
            background: theme.colors.gray.menu,
        };
        case 'contrast': return {
            ...getColorsForVariant(),
            divider: '#404040',
            text: '#404040',
        }
    }
}

export const Steps = styled.div`
    display: flex;
    align-items: center;
`;

export const StepDivider = styled.span`
    border-bottom: 1px solid ${props => props.colors.divider};
    flex-grow: 1;
    margin: 0 10px;
`;

export const StepColor = styled.span`
    color: ${props => props.active ? props.colors.activeText : props.colors.text};
`;

export const StepNumber = styled.span`
    background: ${props => props.active ? props.colors.activeBackground : props.colors.background};
    
    width: 1.5em;
    height: 1.5em;
    border-radius: 100px;
    padding: 8px;
    
    color: #faffff;
    
    display: inline-flex;
    align-items: center;
    justify-items: center;
    justify-content: center;

    user-select: none;

    margin-right: 2px;
`;