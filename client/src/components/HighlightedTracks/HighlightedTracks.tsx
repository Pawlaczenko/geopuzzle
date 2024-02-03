import { FC } from 'react'
import Container from 'src/layout/Container'
import styled from 'styled-components'
import Heading from '../Heading'
import { BREAKPOINTS } from 'src/styles/variables'
import BackgroundImage from 'src/assets/dev/7cDoyzS.jpg'
import TrackInfoBox, { TrackInfo } from '../TrackInfoBox'
import { ICONS } from 'src/data/icons.data'

const HighlightedTracks : FC = () => {
    const PlayIcon = ICONS.get('start')!;
    return (
        <Container>
            <StyledHighligtedTracks>
                <Heading level='h3'>Wyróżniona trasa</Heading>
                <HighlightedBox>
                    <TrackThumbnail>
                        <PlayIcon />
                        <img src={BackgroundImage} />
                    </TrackThumbnail>
                    <TrackInfoBox handleStart={function (): void {
                        throw new Error('Function not implemented.')
                    } } />
                </HighlightedBox>
            </StyledHighligtedTracks>
        </Container>
    )
}

const TrackThumbnail = styled.figure`
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 0.8rem;

    svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 8rem;
        height: 8rem;
        color: white;
        opacity: 0;
    }

    &::before {
        opacity: 0;
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    &:hover {
        &::before {
            opacity: 1;
        }

        svg {
            opacity: 1;
        }
    }
`

const StyledHighligtedTracks = styled.section`
    margin: 4.8rem 0;

    h3 {
        margin-bottom: 2.4rem;
    }
`;

const HighlightedBox = styled.div`
    display: grid;
    grid-template-columns: 0.7fr 1fr;
    gap: 2rem;

    @media only screen and (${BREAKPOINTS.md}){
        grid-template-columns: 1fr;

        ${TrackThumbnail} {
            aspect-ratio: 3/1.2;
        }

        ${TrackInfo} {
            width: 100%;
        }
    }
`

export default HighlightedTracks