import styled from "styled-components";
import { FC } from "react";

const StopWatch : FC<{time: number[]}> = ({time}) => {
    if (time === undefined) {
        return <StyledStopWatch data-testid="timer">00:00</StyledStopWatch>;
    }
    return(
        <StyledStopWatch data-testid="timer">
          {String(time[0]).padStart(2,'0')}
          :
          {String(time[1]).padStart(2,'0')}
        </StyledStopWatch>
    ) 
}

export const StyledStopWatch = styled.div`
  font-family: 'Azeret Mono', monospace;
  color: var(--color-dark);
  font-size: 2.5rem;
  font-weight: bold;
  background-color: var(--color-grey);
  padding: 1rem;
  border-radius: 1rem;
`;

export default StopWatch;
