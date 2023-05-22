import { BREAKPOINTS } from "src/styles/variables";
import { styled } from "styled-components";

export const StyledInput = styled.input`
    font-size: var(--fs-h6);
    font-family: var(--family-primary);
    
    background: var(--color-grey-light);
    box-shadow: 0 .3rem var(--color-secondary);
    border: none;
    border-radius: var(--radius);

    --input-height: 5.2rem;

    width: 100%;
    padding: 0 3rem;

    &:focus,
    &:active,
    &:has(input:focus) {
        outline: .2rem solid var(--color-secondary);
    }
`

export const StyledLabel = styled.label`
    --input-width: 55rem;
    width: min(var(--input-width),100%);
    margin-bottom: 2rem;

    @media only screen and (${BREAKPOINTS.phone}){
        width: 100%
    }
`

export const StyledLabelText = styled.span`
    display: block;

    font-weight: bold;
    text-align: center;
    font-family: var(--family-primary);
    margin-bottom: 1.5rem;
`