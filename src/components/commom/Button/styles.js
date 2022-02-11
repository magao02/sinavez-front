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

                margin-top: 1.0rem;

                font-size: 1.4rem;
                color: ${theme.colors.white};
                background-color: ${theme.colors.blue.default};
                font-weight: bold;

                &:hover {
                    filter: brightness(80%);
                }
            `;   
        }

        case 'password': {
            return css`
                width: 100%;
                border: none;
                border-radius: 2.4rem;
        
                display: flex;
                align-items: center;
                justify-content: center;

                padding: 1.2rem;

                margin-top: 5.6rem;
                margin-bottom: 2.4rem;

                font-size: 1.4rem;
                color: ${theme.colors.white};
                background-color: ${theme.colors.red};

                &:hover {
                    filter: brightness(80%);
                }
            `;
        }
        case 'image': {
            return css`
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;

            background: transparent;
            `;
        }
        case 'nav': {
            return css`
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;

            background: transparent;

            text-decoration: none;
            font-size: 1.6rem;
            font-weight: bold;
            color: ${theme.colors.white};

            text-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0 , 0.25);
            `;
        }
        case 'associado': {
            return css`
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;

            background: transparent;

            text-decoration: none;
            font-size: 1.6rem;
            font-weight: bold;
            color: ${theme.colors.red};
            `;
        }
    }
};
