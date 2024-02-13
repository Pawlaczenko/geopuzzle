import { FC } from 'react'
import ButtonIcon from 'src/components/Button/ButtonIcon';
import Heading from 'src/components/Heading';
import PointsTable from 'src/components/SummaryTable/PointsTable';
import SummaryTable from 'src/components/SummaryTable/SummaryTable';
import TagNamesContainer from 'src/components/TagNames/TagNamesContainer';
import { useCreateTrackContext } from 'src/context/CreateTrackContext'
import { getImageFromObject } from 'src/helpers/files.helper';
import Section from 'src/layout/Section.styled';
import { flexContainer } from 'src/styles/mixins';
import styled from 'styled-components'

const CreateTrackSummary : FC = () => {
    const {formData} = useCreateTrackContext();
    const tableContent = new Map<string,React.ReactNode>([
        ['Nazwa Trasy: ',formData.trackName],
        ['Opis Trasy: ',formData.trackDescription],
        ['Nazwy Tagów: ',<TagNamesContainer tagnames={formData.trackTagNames} />],
        ['Miniatura Trasy: ',getImageFromObject(formData.trackThumbnail)]
    ]);

    return (
        <StyledCreateTrackSummary>
            <Heading level='h3' withAccent $alignCenter>Podsumowanie</Heading>
            <SummaryTable summaryData={tableContent} />
            <PointsTable pointsArray={formData.trackWaypoints} />
            <SummaryOptions>
                <ButtonIcon btnType='outline' icon='create'>Zakończ tworzenie trasy</ButtonIcon>
            </SummaryOptions>
        </StyledCreateTrackSummary>
    )
}

const StyledCreateTrackSummary = styled(Section)`
    
`;

const SummaryOptions = styled.div`
    ${flexContainer('center','center')};
    margin-top: 3rem;
`

export default CreateTrackSummary