import { FC } from 'react'
import Banner, { BannerBox, StyledBanner } from 'src/components/Banner';
import Page from 'src/layout/Page.styled';
import BackgroundImage from 'src/assets/dev/7cDoyzS.jpg'
import Heading from 'src/components/Heading';
import Paragraph from 'src/components/Paragraph.styled';
import { styled } from 'styled-components';
import TagNamesContainer from 'src/components/TagNames/TagNamesContainer';
import { flexContainer } from 'src/styles/mixins';

const DisplayTrack : FC = () => {
    return (
        <Page>
            <StyledBanner background={BackgroundImage}>
                <TrackInfo>
                    <TagNamesContainer tagnames={['stolice','europa']} />
                    <Heading level='h4'>Stolice Państw Europejskich</Heading>
                    <Paragraph padding={false}>Can you name the words beginning with 'An-' that are missing from the titles of the given movies?</Paragraph>
                    <div>
                        <InfoText>Stworzona przez <b><u>Adam Driver</u></b></InfoText>
                        <InfoText>Rozegrana 123 razy</InfoText>
                        <InfoText>Średnia ocen: <b>4/5</b></InfoText>
                        <InfoText>8 Zagadek</InfoText>
                    </div>
                </TrackInfo>
            </StyledBanner>
            DisplayTrack
        </Page>
    )
}

const TrackInfo = styled(BannerBox)`
    width: auto;
    padding: 3rem;

    ${flexContainer()};
    flex-direction: column;
    gap: 2rem;

    & > p {
        max-inline-size: 50ch;
        text-wrap: balance;
    }
`
const InfoText = styled.span`
    display: inline-block;
    margin-right: 1rem;
    
    &:not(:last-child):after {
        content: "";
        display: inline-block;
        width: .8rem;
        height: .8rem;
        background: var(--color-secondary);
        border-radius: 50%;
        margin-left: 1rem;
    }
`

export default DisplayTrack