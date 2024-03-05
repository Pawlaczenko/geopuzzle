import { FC } from 'react'
import styled from 'styled-components'
import { BREAKPOINTS } from 'src/styles/variables'
import { ICONS } from 'src/data/icons.data'
import ButtonIcon from '../Button/ButtonIcon'

export interface IWaypointSummary {
    points: number,
    answer: string,
    explanation?: string,
    handleNext: () => void
}

const WaypointSummary : FC<{summary: IWaypointSummary}> = ({summary}) => {
    return(
        <StyledWaypointSummary>
            <p>Zdobyte punkty: <b>{summary.points}</b></p>
            <p>Poprawna odpowiedź: <b>{summary.answer}</b></p>
            {
                summary.explanation && <p>Objaśnienie zagadki:<br/><br/> {summary.explanation}</p>
            }
            <ButtonIcon btnType='outline' icon='start' onClick={summary.handleNext} >Następne pytanie</ButtonIcon>
        </StyledWaypointSummary>
    );
}

const StyledWaypointSummary = styled.div`
    border: 2px solid var(--color-primary);
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
`;

export default WaypointSummary