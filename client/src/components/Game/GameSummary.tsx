import { FC } from 'react'
import styled from 'styled-components'
import { BREAKPOINTS } from 'src/styles/variables'
import { ICONS } from 'src/data/icons.data'
import ButtonIcon from '../Button/ButtonIcon'
import Heading from '../Heading'
import { flexContainer } from 'src/styles/mixins'
import { useNavigate } from "react-router-dom";

export interface IGameSummary {
    time: number,
    score: number,
}

const GameSummary : FC<{summary: IGameSummary}> = ({summary}) => {
    const navigate = useNavigate();
    return(
        <StyledGameSummary>
            <Heading level='h2' $alignCenter withAccent>Brawo! Trasa skończona!</Heading>
            <hgroup>
                <p>Twoje punkty: {summary.score}</p>
                <p>Twój czas: {new Date(summary.time).toISOString().slice(11, 19)}</p>
            </hgroup>
            <ButtonIcon btnType='outline' icon='start' onClick={()=>{navigate("/");}}>Powrót na stronę główną</ButtonIcon>
        </StyledGameSummary>
    );
}

const StyledGameSummary = styled.div`
    width: min(90vw, 75%);
    padding: 2.4rem 1.8rem;
    margin: 0 auto 1.2rem auto;
    font-size: 1.4rem;
    border-radius: 0.8rem;

    p {
        margin-bottom: 1.2rem;
    }

    b {
        color: var(--color-primary);
    }

    button {
        margin: 2.4rem auto 0 auto;
    }

    hgroup {
        ${flexContainer('center','center', 'row')};
        flex-wrap: wrap;
        gap: 2.4rem;

        p {
            font-size: 2.4rem;
            font-weight: 700;
            margin: 2.4rem 0;
        }
    }
`;

export default GameSummary