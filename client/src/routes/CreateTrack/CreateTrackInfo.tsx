import { FC } from 'react'
import { Form } from 'react-router-dom';
import Heading, { StyledHeading } from 'src/components/Heading';
import FileInput from 'src/components/Input/FileInput';
import TextInput from 'src/components/Input/TextInput';
import TextArea from 'src/components/Input/TextArea';
import Section from 'src/layout/Section.styled';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import ButtonIcon from 'src/components/Button/ButtonIcon';
import TagsInput from 'src/components/Input/TagsInput/TagsInput';
import { flexContainer } from 'src/styles/mixins';
import Logo from 'src/components/Logo';
import Paragraph from 'src/components/Paragraph.styled';
import NumberedList from 'src/components/NumberedList';
import { tutorialList } from 'src/data/trackInfo.data';

const InfoFormLabels = {
    trackName: "track_name",
    trackDesc: "track_description",
    trackThumb: "track_thumbnail",
    trackTags: "track_tags"
}

const CreateTrackInfo : FC = () => {
    const FormErrors = {
        trackName: [],
        description: [],
        thumbnail: [],
        tags: []
    }
    return (
        <StyledCreateTrackInfo>
            <Heading level='h3' withAccent $alignCenter>Informacje o trasie</Heading>
            <StyledForm method="POST">
                <TextInput label='Nazwa Trasy' name={InfoFormLabels.trackName} placeholder='Podaj nazwę trasy' errors={FormErrors.trackName} required />
                <TextArea label='Opis Trasy' name={InfoFormLabels.trackDesc} placeholder='Dodaj opis trasy' errors={FormErrors.description} required />
                <FileInput name={InfoFormLabels.trackThumb} label='Miniatura Trasy' errors={FormErrors.thumbnail} />
                <TagsInput label='Tagi' name={InfoFormLabels.trackTags} placeholder='Dodaj tagi' errors={FormErrors.tags} required />
                <ButtonIcon btnType='white' icon='create'>Następny krok</ButtonIcon>
            </StyledForm>
            <StyledTutorial>
                <Logo logoType='compact' />
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

const StyledForm = styled(Form)`
    grid-area: form;
    ${flexContainer('flex-start','center','column')}
    gap: 2rem;
    min-width: 0;
    
    @media only screen and (${BREAKPOINTS.phone}){
        & > button {
            margin-top: 5rem;
        }
    }
`
const StyledTutorial = styled.aside`
    grid-area: tutorial;
    background: ${(props) => props.theme.grey};
    border-radius: var(--radius);
    padding: 3rem;
    box-shadow: 0 0 0 .3rem var(--color-dark), 0 0 0 .8rem var(--color-grey-light);
    height: min-content;

    ${flexContainer('flex-start','center','column')}

    & > ${Paragraph} {
        margin-top: 2rem;
    }
`

export default CreateTrackInfo