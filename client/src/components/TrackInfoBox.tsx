import { FC, useState } from 'react'
import styled from 'styled-components'
import { BannerBox } from './Banner'
import { flexContainer } from 'src/styles/mixins'
import TagNamesContainer from './TagNames/TagNamesContainer'
import Heading from './Heading'
import Paragraph from './Paragraph.styled'
import React from 'react'
import ButtonIcon from './Button/ButtonIcon'
import { BREAKPOINTS } from 'src/styles/variables'

const TrackInfoBox : FC<{handleStart: ()=>void}> = ({handleStart}) => {
    const [showStartButton, setShopwStartButton] = useState<boolean>(true);

    const handleTrackStart = () => {
        handleStart();
        setShopwStartButton(false);
    }
    return (
        <TrackInfo>
            <TagNamesContainer tagnames={['stolice','europa']} />
            <Heading level='h4'>Stolice Państw Europejskich</Heading>
            <Paragraph $padding={false}>Can you name the words beginning with 'An-' that are missing from the titles of the given movies?</Paragraph>
            <MetaInfo>
                <InfoText>Stworzona przez <b><u>Adam Driver</u></b></InfoText>
                <InfoText>Rozegrana 123 razy</InfoText>
                <InfoText>Średnia ocen: <b>4/5</b></InfoText>
                <InfoText>10 Zagadek</InfoText>
            </MetaInfo>
            {
                showStartButton && <ButtonIcon onClick={handleTrackStart} btnType='regular' icon='start'>Rozpocznij trasę</ButtonIcon>
            }
        </TrackInfo>
    )
}

export const TrackInfo = styled(BannerBox)`
    width: fit-content;
    padding: 3rem;

    ${flexContainer()};
    flex-direction: column;
    gap: 2rem;

    & > p {
        max-inline-size: 50ch;
        text-wrap: balance;
    }
    
    @media only screen and (${BREAKPOINTS.phone}){
        padding: 0;
        border-radius: 0;
        box-shadow: none;
        background-color: white;
    }
`
const InfoText = styled.span`
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 1rem;

    &:not(:last-child):after {
        content: "";
        display: inline-block;
        width: .8rem;
        height: .8rem;
        background: var(--color-primary);
        border-radius: 50%;
        margin-left: 1rem;
    }
`

const MetaInfo = styled.div`
    
`


export default React.memo(TrackInfoBox);