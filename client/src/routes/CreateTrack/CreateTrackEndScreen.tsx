import { FC, useEffect } from 'react'
import ButtonIcon from 'src/components/Button/ButtonIcon';
import Heading from 'src/components/Heading';
import { useCreateTrackContext } from 'src/context/CreateTrackContext'
import Section from 'src/layout/Section.styled';
import Container from "src/layout/Container";
import { flexContainer } from 'src/styles/mixins';
import styled from 'styled-components'
import TrackSwiper from 'src/components/TrackSwiper';

const CreateTrackEndScreen : FC = () => {
    const {formData, trackId} = useCreateTrackContext();
    
    useEffect(() => {
        console.log(formData);
    },[]);

    return (
        <>
            <StyledCreateTrackEndScreen>
                <Heading level='h3' withAccent $alignCenter>Twoja trasa "{formData.trackName}" <br />dodana pomyślnie</Heading>
                <ButtonIcon btnType='regular' icon='start'>
                    Zagraj
                </ButtonIcon>
            </StyledCreateTrackEndScreen>
            <Container>
                <TrackSwiper />
            </Container>
        </>
    )
}

const StyledCreateTrackEndScreen = styled(Section)`
    ${flexContainer('center','center','column')};
    gap: 1.8rem;
`;

export default CreateTrackEndScreen