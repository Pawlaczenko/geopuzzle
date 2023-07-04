import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { useCreateTrackContext } from 'src/context/CreateTrackContext';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const Stepper : FC = () => {
    const {activeStepIndex} = useCreateTrackContext();
    const FORM_STEPS = [
        {
            id: 1,
            label: "Informacje o Trasie"
        },
        {
            id: 2,
            label: "Dodaj Punkt"
        },
        {
            id: 3,
            label: "Podsumowanie"
        },
    ];

    return (
        <StyledStepper>
            {
                FORM_STEPS.map((step,index) => {
                    return(
                        <StyledStepperItem key={`${step.label}-${index}`} $isVisited={activeStepIndex >= step.id}>
                                {step.label}
                        </StyledStepperItem>
                    )
                } )
            }
        </StyledStepper>
    )
}

const StyledStepper = styled.ul`
    background: var(--color-grey);
    padding: 2rem;
    ${flexContainer('center','center')};
    gap: 4rem;
    list-style-type: none;

    @media only screen and (${BREAKPOINTS.phone}){
        gap: 1.5rem;
    }
`;

const StyledStepperItem = styled.li<{$isVisited: boolean}>`
    font-family: var(--family-primary);
    color: var(--color-dark);
    ${(props) => props.$isVisited ? "font-weight: bold" : "pointer-events: none"};
    @media only screen and (${BREAKPOINTS.phone}){
        font-size: 1.2rem;
    }
`

export default Stepper