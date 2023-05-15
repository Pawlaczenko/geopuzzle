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

export const createCircle = (size:string) => {
    return css`
        width: ${size};
        height: ${size};
        border-radius: 50%;
        flex-shrink: 0;  
    `
}