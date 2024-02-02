import { FC } from 'react';
import Heading, { StyledHeading } from 'src/components/Heading';
import Section from 'src/layout/Section.styled';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import { flexContainer } from 'src/styles/mixins';
import Logo from 'src/components/Logo';
import Paragraph from 'src/components/Paragraph.styled';
import NumberedList from 'src/components/NumberedList';
import { tutorialList } from 'src/data/trackInfo.data';
import TrackInfoForm from '../../components/TrackInfoForm/TrackInfoForm';

const CreateTrackInfo : FC = () => {
    return (
        <StyledCreateTrackInfo>
            <Heading level='h3' withAccent $alignCenter>Informacje o trasie</Heading>
            <TrackInfoForm />
            <StyledTutorial>
                <Logo />
                <Heading level='h5'>Witaj w kreatorze tras!</Heading>
                <NumberedList items={tutorialList} />
            </StyledTutorial>
        </StyledCreateTrackInfo>
    )
}

const StyledCreateTrackInfo = styled(Section)`
    display: grid;
    grid-template-columns: 1fr .9fr;
    grid-template-areas: "heading heading" "form tutorial";
    gap: 5rem;

    & > ${StyledHeading} {
        grid-area: heading;
        margin-bottom: 5rem;
    }

    @media only screen and (${BREAKPOINTS.big}){
        grid-template-areas: "heading" "tutorial" "form";
        grid-template-columns: 1fr;
    }
`;

const StyledTutorial = styled.aside`
    grid-area: tutorial;
    background: white;
    border-radius: var(--radius);
    padding: 3rem;
    border: 1px solid var(--color-grey);
    /* box-shadow: 0 0 0 .3rem var(--color-dark), 0 0 0 .8rem var(--color-grey-light); */
    height: min-content;

    ${flexContainer('flex-start','center','column')}

    & > ${Paragraph} {
        margin-top: 2rem;
        font-size: 1.4rem;
    }
`

export default CreateTrackInfo