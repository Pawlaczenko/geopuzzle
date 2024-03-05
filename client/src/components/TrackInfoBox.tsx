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

export interface ITrackInfoBox {
    id: string,
    name: string,
    tags: string[],
    description: string,
    puzzleCount: number,
    thumbnail?: string
}

const TrackInfoBox : FC<{track: ITrackInfoBox, handleStart: ()=>void}> = ({track, handleStart}) => {
    const [showStartButton, setShowStartButton] = useState<boolean>(true);

    const handleTrackStart = () => {
        handleStart();
        setShowStartButton(false);
    }
    return (
        <TrackInfo>
            <TagNamesContainer tagnames={track.tags} />
            <Heading level='h4'>{track.name}</Heading>
            <Paragraph $padding={false}>{track.description}</Paragraph>
            <MetaInfo>
                <InfoText>Stworzona przez <b><u>Adam Driver</u></b></InfoText>
                <InfoText>{track.puzzleCount} Zagadek</InfoText>
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