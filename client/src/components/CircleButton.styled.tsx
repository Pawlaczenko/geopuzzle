import { createCircle } from 'src/styles/mixins';
import styled, { css } from 'styled-components'

const activeStyle = css`
    background-color: var(--color-secondary);
    color: white;
`

const CircleButton = styled.button<{$isActive?: boolean}>`
    ${createCircle('3.5rem')};
    background: var(--color-grey);
    cursor: pointer;
    color: var(--color-black);

    &:hover { 
        ${activeStyle} 
    }

    ${({$isActive}) => $isActive && activeStyle};

    & > svg {
        fill: currentColor;
        width: 100%;
        height: 100%;
        padding: .5rem;
    }
`;


export default CircleButton