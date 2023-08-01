import { FC, Fragment } from 'react'
import { useCreateTrackContext } from 'src/context/CreateTrackContext';
import { createCircle, flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';
import styled, { css } from 'styled-components'

const Stepper : FC = () => {
    const {activeStepIndex, setActiveStepIndex} = useCreateTrackContext();
    const FORM_STEPS = [
        {
            id: 1,
            label: "Informacje o Trasie"
        },
        {
            id: 2,
            label: "Dodaj Punkty"
        },
        {
            id: 3,
            label: "Podsumowanie"
        },
    ];

    const handleOnClick = (isVisited: boolean,index: number) => {
        if(isVisited){
            setActiveStepIndex(index);
        }
    }

    return (
        <StyledStepper>
            {
                FORM_STEPS.map((step,index) => {
                    const isVisited = activeStepIndex >= step.id;
                    return(
                        <Fragment key={`stepper-step-${index}`}>
                            {index !== 0 && <StyledLine $isVisited={isVisited} />}
                            <StyledStepperItem key={`${step.label}-${index}`} $isVisited={isVisited} onClick={()=>{handleOnClick(isVisited,index+1)}}>
                                <StepperNumber>{index+1}</StepperNumber>
                                {step.label}
                            </StyledStepperItem>
                        </Fragment>
                    )
                } )
            }
        </StyledStepper>
    )
}

const StyledStepper = styled.ul`
    background: ${({theme}) => theme.header};
    padding: 2rem 15%;
    ${flexContainer('space-between','center')};
    gap: 3rem;
    list-style-type: none;

    @media only screen and (${BREAKPOINTS.phone}){
        gap: 1.5rem;
        padding: 2rem;
    }
`;

const ActiveStepperStyle = css`
    --step-background: var(--color-secondary);
    --step-color: var(--color-secondary);
    font-weight: bold;
`

const StyledStepperItem = styled.li<{$isVisited: boolean}>`
    --step-background: ${({theme}) => theme.decoration};
    --step-color: var(--color-grey-dark);
    font-family: var(--family-primary);
    ${(props) => props.$isVisited && ActiveStepperStyle};

    color: var(--step-color);    
    ${flexContainer('center','center')};
    gap: .6rem;

    cursor: ${(props) => props.$isVisited ? "pointer" : "unset"};

    @media only screen and (${BREAKPOINTS.phone}){
        font-size: 1.3rem;
        flex-direction: column;
    }
`

const StepperNumber = styled.figure`
    ${createCircle('4rem')};
    ${flexContainer('center','center')};
    font-size: 2rem;
    
    background: var(--step-background);
    color: white;
`

const StyledLine = styled.hr<{$isVisited: boolean}>`
    --hr-color: ${(props) => props.$isVisited ? 'var(--color-secondary)' : props.theme.decoration};
    flex: 1;
    border: 1px solid var(--hr-color);
`

export default Stepper