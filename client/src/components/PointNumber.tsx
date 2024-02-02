import { flexContainer } from "src/styles/mixins";
import { css, styled } from "styled-components";

export type pointNumberVariant = 'active' | 'disabled' | 'correct' | 'incorrect';

interface IPointNumberProps {
    variant: pointNumberVariant,
    size?: 'small' | 'big',
    lifted?: boolean
}

const pickPointNumberVariant = (variant: pointNumberVariant) => {
    switch(variant){
        case 'active':
        default:
            return ActiveVariant;
        case 'disabled':
            return DisabledVariant;
        case 'correct':
            return CorrectVariant;
        case 'incorrect':
            return IncorrectVariant;
    }
}

const ActiveVariant = css`
    --background: var(--color-primary);
    --color: white;
    box-shadow: var(--shadow-primary);
`

const DisabledVariant = css`
    --background: var(--color-grey);
    --color: var(--color-grey-dark);
`

const CorrectVariant = css`
    --background: var(--color-correct);
    --color: black;
`

const IncorrectVariant = css`
    --background: var(--color-incorrect);
    --color: black;
`

const PointNumber = styled.figure<IPointNumberProps>`
    box-shadow: var(--shadow-inset);
    ${(props) => pickPointNumberVariant(props.variant)};

    background: var(--background);
    color: var(--color);

    font-weight: var(--fw-bold);
    font-size: ${(props) => props.size==='small' ? '2rem' : '3rem'};
    font-family: var(--family-primary);
    line-height: 1;

    ${flexContainer('center','center')};
    flex-shrink: 0;
    border-radius: .5rem;
    width: ${(props) => props.size==='small' ? '4rem' : '6rem'};
    aspect-ratio: 1/1;

    ${props => props.lifted && 'margin-bottom: 1.5rem'};
`

export default PointNumber