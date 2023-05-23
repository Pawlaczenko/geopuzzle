import { BREAKPOINTS } from "src/styles/variables";
import { styled } from "styled-components";

export const StyledInput = styled.input<{$error?: boolean}>`
    font-size: var(--fs-paragraph);
    font-family: var(--family-primary);
    
    background: var(--color-grey-light);
    box-shadow: 0 .3rem ${(props) => props.$error ? 'var(--color-error)' : 'var(--color-secondary)'};
    border: none;
    border-radius: var(--radius);

    --input-height: 4.5rem;

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
    width: 100%;
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