import { FC } from 'react'
import styled from 'styled-components'
import { BannerBox } from './Banner'
import { flexContainer } from 'src/styles/mixins'
import TagNamesContainer from './TagNames/TagNamesContainer'
import Heading from './Heading'
import Paragraph from './Paragraph.styled'

const TrackInfoBox : FC = () => {
    return (
        <TrackInfo>
            <TagNamesContainer tagnames={['stolice','europa']} />
            <Heading level='h4'>Stolice Państw Europejskich</Heading>
            <Paragraph padding={false}>Can you name the words beginning with 'An-' that are missing from the titles of the given movies?</Paragraph>
            <MetaInfo>
                <InfoText>Stworzona przez <b><u>Adam Driver</u></b></InfoText>
                <InfoText>Rozegrana 123 razy</InfoText>
                <InfoText>Średnia ocen: <b>4/5</b></InfoText>
                <InfoText>8 Zagadek</InfoText>
            </MetaInfo>
        </TrackInfo>
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

const MetaInfo = styled.div`
    
`


export default TrackInfoBox