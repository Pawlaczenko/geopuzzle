import { BREAKPOINTS } from 'src/styles/variables';
import styled, { css } from 'styled-components'

export type ButtonType = 'outline' | 'regular' | 'danger';

interface IButtonProps {
    variant: ButtonType,
    pop?: Boolean
}

const getButtonStyles = ({variant='regular'} : IButtonProps) => {
    switch(variant){
        case 'danger': return DangerButton;
        case 'regular':
        default:
             return OutlineButton;
    }
}

const OutlineButton = css`
    --button-color: var(--color-white);
    --button-text-color: var(--color-dark);
    --button-border-color: var(--color-secondary);
`

const BlueButton = css`
    --button-color: var(--color-secondary);
    --button-text-color: var(--color-white);
    --button-border-color: var(--color-black);
`

const YellowButton = css`
    --button-color: var(--color-primary);
    --button-text-color: var(--color-black);
    --button-border-color: var(--color-black);
`

const DangerButton = css`
    --button-color: var(--color-error);
    --button-text-color: var(--color-white);
    --button-border-color: var(--color-grey-dark);
`

const Button = styled.button<IButtonProps>`
    ${(props) => getButtonStyles({variant: props.variant})};

    font-family: var(--family-primary);
    letter-spacing: 1px;
    cursor: pointer;
    font-size: 1.4rem;
    
    width: fit-content;
    padding: 0.8rem 1.6rem;
    border-radius: 0.8rem;

    background: var(--button-color);
    border: 1px solid var(--button-border-color);
    color: var(--button-text-color);
    
    --btn-shadow-offset: .2rem;
    box-shadow: 0 var(--btn-shadow-offset) 0 0 var(--button-border-color);

    &:hover {
        transform: translateY(-.2rem);
        --btn-shadow-offset: .4rem;
    }

    &:active {
        transform: translateY(.3rem);
        box-shadow: inset 0 .3rem 1.5rem rgba(141, 141, 141, 0.75);
        border-color: var(--button-color);
    }

    @media only screen and (${BREAKPOINTS.md}) {
        font-size: 1.6rem;
    }
`;


export default Button