import { FC } from 'react'
import { StyledBanner } from 'src/components/Banner';
import Page from 'src/layout/Page.styled';
import BackgroundImage from 'src/assets/dev/7cDoyzS.jpg'
import TrackInfoBox from 'src/components/TrackInfoBox';
import { styled } from 'styled-components';
import { flexContainer } from 'src/styles/mixins';
import TrackPointNavigation from 'src/components/TrackPointNavigation';

const DisplayTrack : FC = () => {
    return (
        <Page>
            <TrackBanner background={BackgroundImage}>
                <TrackInfoBox />
            </TrackBanner>
            <InteractiveBar>
                <TrackPointNavigation />
            </InteractiveBar>
        </Page>
    )
}

const TrackBanner = styled(StyledBanner)`
    justify-content: flex-start;
`

const InteractiveBar = styled.div`
    ${flexContainer('space-between','center')};
    padding: 2rem 3.5rem;
`;

export default DisplayTrack