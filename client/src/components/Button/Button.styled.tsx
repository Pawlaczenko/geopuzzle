import styled, { css } from 'styled-components'

export type ButtonType = 'white' | 'blue' | 'yellow';

interface IButtonProps {
    $btnType: ButtonType
}

const getButtonStyles = (btnType: ButtonType = 'white') => {
    switch(btnType){
        case 'blue': return BlueButton;
        case 'yellow': return YellowButton;
        case 'white':
        default:
             return WhiteButton;
    }
}

const WhiteButton = css`
    --button-color: var(--color-white);
    --button-text-color: var(--color-dark);
    --button-border-color: var(--color-secondary);
`

const BlueButton = css`
    --button-color: var(--color-secondary);
    --button-text-color: var(--color-white);
    --button-border-color: var(--color-grey);
`

const YellowButton = css`
    --button-color: var(--color-primary);
    --button-text-color: var(--color-dark);
    --button-border-color: ${(props) => props.theme.text};
`

const Button = styled.button<IButtonProps>`
    ${(props) => getButtonStyles(props.$btnType)};

    font-family: var(--family-primary);
    letter-spacing: 1px;
    cursor: pointer;
    font-size: var(--fs-paragraph);
    font-weight: bold;
    
    min-width: 12rem;
    padding: 1rem 2rem;
    border-radius: 5.5rem;

    background: var(--button-color);
    border: 1px solid var(--button-border-color);
    color: var(--button-text-color);
    
    --btn-shadow-offset: .3rem;
    box-shadow: 0 var(--btn-shadow-offset) 0 0 var(--button-border-color);

    &:hover {
        transform: translateY(-.3rem);
        --btn-shadow-offset: .6rem;
    }

    &:active {
        transform: translateY(.3rem);
        box-shadow: inset 0 .3rem 1.5rem rgba(141, 141, 141, 0.75);
        border-color: var(--button-color);
    }
`;


export default Button