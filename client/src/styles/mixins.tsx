import { flex_position } from "src/types/css.types";
import { css } from "styled-components";

export const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const flexSpaceBetween = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const flexStart = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const flexContainer = (justifyContent?: flex_position, alignItems?: flex_position, direction?: 'row' | 'column') => {
    return css`
        display: flex;
        align-items: ${alignItems || 'flex-start'};
        justify-content: ${justifyContent || 'flex-start'};
        flex-direction: ${direction || 'row'};
    `
}

export const createCircle = (size:string) => {
    return css`
        width: ${size};
        height: ${size};
        border-radius: 50%;
        flex-shrink: 0;
        aspect-ratio: 1/1;
    `
}

export const myScrollBar = css`
    &::-webkit-scrollbar {
        width: 1rem;
    }

    &::-webkit-scrollbar-track {
        background: var(--color-grey);
        border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--color-secondary);
        border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: var(--color-grey-dark);
    }
`