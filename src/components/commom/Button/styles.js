import styled, {css} from 'styled-components';

import theme from '../../../styles/theme';

export const Container = styled.button`
    ${(props) => getStyleByVariant(props.variant)};
`;


function getStyleByVariant(variant) {
    switch(variant) {
        case 'default': {
            return css`
                width: 100%;
                border: none;
                border-radius: 2.4rem;
        
                display: flex;
                align-items: center;
                justify-content: center;

                padding: 1.2rem;

                margin-top: 9.6rem;
                margin-bottom: 2.4rem;

                font-size: 1.4rem;
                color: ${theme.colors.white};
                background-color: ${theme.colors.blue.default};

                &:hover {
                    filter: brightness(80%);
                }
            `;
          
        };

        case 'signup': {
            return css`
                width: 100%;
                border: none;
                border-radius: 2.4rem;

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 1.2rem;

                margin-top: 8.0rem;

                font-size: 1.4rem;
                color: ${theme.colors.white};
                background-color: ${theme.colors.blue.default};
                font-weight: bold;

                &:hover {
                    filter: brightness(80%);
                }
            `;
        }
    }
}