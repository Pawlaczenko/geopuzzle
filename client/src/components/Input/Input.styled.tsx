import { BREAKPOINTS } from "src/styles/variables";
import { styled } from "styled-components";

export const StyledInput = styled.input<{$error?: boolean}>`
    font-size: 1.4rem;
    font-family: var(--family-primary);
    
    color: ${({theme}) => theme.textBlue};
    border: 1px solid ${({theme}) => theme.input};
    border-radius: var(--radius);

    --input-height: 3.6rem;
    @media only screen and (max-width: 768px) {
        --input-height: 4.8rem;
    }

    width: 100%;
    padding: 0 2.4rem;

    &:focus,
    &:active,
    &:has(input:focus) {
        outline: .1rem solid var(--color-secondary);
    }

    &::placeholder {
        color: grey;
    }
`

export const StyledLabel = styled.label`
    --input-width: 55rem;
    width: 100%;
    position: relative;

    @media only screen and (${BREAKPOINTS.phone}){
        width: 100%
    }
`

export const StyledLabelText = styled.span`
    display: block;
    position: relative;

    text-align: left;
    font-family: var(--family-primary);
    margin-bottom: 0.8rem;
    padding-left: 1.6rem;
    font-size: 1.4rem;
`