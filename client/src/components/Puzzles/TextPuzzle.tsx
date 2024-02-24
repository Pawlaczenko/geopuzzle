import { FC } from 'react'
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const TextPuzzle : FC<{content: string}> = ({content}) => {
    return (
        <StyledTextPuzzle>
            {content}
        </StyledTextPuzzle>
    )
}

const StyledTextPuzzle = styled.p`
    text-align: center;
    font-size: 1.6rem;
    max-inline-size: 50ch;
    text-wrap: balance;
    margin: 0 auto;
    line-height: 1.5;

    @media only screen and (${BREAKPOINTS.phone}){
        font-size: var(--fs-paragraph);
    }
`;


export default TextPuzzle