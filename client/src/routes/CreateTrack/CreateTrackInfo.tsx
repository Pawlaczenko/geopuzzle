import { FC } from 'react'
import { Form } from 'react-router-dom';
import Heading from 'src/components/Heading';
import FileInput from 'src/components/Input/FileInput';
import TextInput from 'src/components/Input/TextInput';
import TextArea from 'src/components/Input/TextArea';
import Section from 'src/layout/Section.styled';
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import ButtonIcon from 'src/components/Button/ButtonIcon';

const InfoFormLabels = {
    trackName: "track_name",
    trackDesc: "track_description",
    trackThumb: "track_thumbnail",
    trackTags: "track_tags"
}

const CreateTrackInfo : FC = () => {
    return (
        <StyledCreateTrackInfo>
            <Heading level='h3' withAccent $alignCenter>Informacje o trasie</Heading>
            <StyledForm method="POST">
                <TextInput label='Nazwa Trasy' name={InfoFormLabels.trackName} placeholder='Podaj nazwę trasy' required />
                <TextArea label='Opis Trasy' name={InfoFormLabels.trackDesc} placeholder='Dodaj opis trasy' required />
                <FileInput name={InfoFormLabels.trackThumb} label='Dodaj miniaturę trasy' />
                <TextInput label='Tagi' name={InfoFormLabels.trackTags} placeholder='Dodaj tagi' required />
                <ButtonIcon btnType='white' icon='create'>Następny krok</ButtonIcon>
            </StyledForm>
        </StyledCreateTrackInfo>
    )
}

const StyledCreateTrackInfo = styled(Section)`
    
`;

const StyledForm = styled(Form)`
    width: 100%;
    margin-top: 8rem;

    display: grid;
    grid-template-columns: 1.15fr 1fr;
    align-items: center;
    justify-items: center;
    grid-template-areas: 
        "name thumb" 
        "desc thumb"
        "tags thumb"
        "button button";
    gap: 2rem 3rem;
    
    label[for=${InfoFormLabels.trackName}]{grid-area: name;}
    label[for=${InfoFormLabels.trackDesc}]{grid-area: desc;}
    label[for=${InfoFormLabels.trackThumb}]{grid-area: thumb;}
    label[for=${InfoFormLabels.trackTags}]{grid-area: tags;}
    button{grid-area: button;}

    @media only screen and (${BREAKPOINTS.phone}){
        grid-template-columns: 1fr;
        grid-template-areas: "name" "desc" "tags" "thumb" "button";

        & > button {
            margin-top: 5rem;
        }
    }
`


export default CreateTrackInfo