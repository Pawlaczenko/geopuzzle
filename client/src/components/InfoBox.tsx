import { FC } from 'react'
import { createCircle } from 'src/styles/mixins'
import styled from 'styled-components'

interface IInfoBoxProps {
    children: React.ReactNode,
    symbol?: '?' | '!'
}

const InfoBox : FC<IInfoBoxProps> = (props) => {
    return (
        <StyledInfoBox>
            <InfoBoxSymbol>{props.symbol || '?'}</InfoBoxSymbol>
            <p>{props.children}</p>
        </StyledInfoBox>
    )
}

const StyledInfoBox = styled.div`
    background-color: var(--color-secondary);
    border-radius: 1.5rem;
    padding: 3.5rem;
    margin: 1rem 0;

    font-size: 1.4rem;
    font-weight: var(--fw-bold);
    color: black;

    position: relative;

    & > p {
        width: 75%;
        font-family: var(--family-primary);
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
`

export default InfoBox