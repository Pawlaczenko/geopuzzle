import { FC } from 'react'
import { createCircle } from 'src/styles/mixins'
import { BREAKPOINTS } from 'src/styles/variables';
import styled, { css } from 'styled-components'

type InfoBoxType = 'primary' | 'secondary' | 'danger';

interface IInfoBoxProps {
    children: React.ReactNode,
    symbol?: '?' | '!',
    variant?: InfoBoxType
}

const InfoBox : FC<IInfoBoxProps> = ({children,symbol='?',variant='primary'}) => {
    return (
        <StyledInfoBox variant={variant}>
            <InfoBoxSymbol>{symbol}</InfoBoxSymbol>
            <p>{children}</p>
        </StyledInfoBox>
    )
}

const getInfoBoxStyles = (boxType: InfoBoxType = 'primary') => {
    switch(boxType){
        case 'primary':
        default:
            return YellowBoxStyle;
        case 'danger': return DangerBoxStyle;
        case 'secondary': return BlueBoxStyle;
    }
}

const YellowBoxStyle = css`
    --box-background: var(--color-primary);
    --box-color: white;
`

const DangerBoxStyle = css`
    --box-background: #ff787888;
    --box-color: black;
`

const BlueBoxStyle = css`
    --box-background: var(--color-secondary);
    --box-color: white;
`

export const StyledInfoBox = styled.div<{variant: InfoBoxType}>`
    ${(props) => getInfoBoxStyles(props.variant)};
    background-color: var(--box-background);
    color: var(--box-color);

    border-radius: 1.5rem;
    padding: 3.5rem;
    margin: 1rem 0;
    position: relative;

    & > p {
        width: 75%;
        font-family: var(--family-primary);
        font-size: 1.6rem;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        & > p {
            width: 95%;
        }
    }
`;

const InfoBoxSymbol = styled.span`
    ${createCircle('4rem')};
    text-align: center;
    line-height: 1.3;
    display: block;
    background: rgba(255,255,255,.5);
    box-shadow: 0 0 0 .5rem rgba(255,255,255,.75);

    position: absolute;
    top: 1.5rem;
    right: 1.5rem;

    font-weight: 700;
    font-size: 3rem;

    @media only screen and (${BREAKPOINTS.big}){
        box-shadow: none;
        width: 2rem;
        height: 2rem;
        font-size: 1.4rem;
    }
`

export default InfoBox