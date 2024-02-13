import { FC } from 'react'
import styled from 'styled-components'
import MapImage from 'src/assets/dev/7cDoyzS.jpg';
import { flexContainer } from 'src/styles/mixins';
import TagNamesContainer from '../TagNames/TagNamesContainer';
import Heading from '../Heading';
import ButtonIcon from '../Button/ButtonIcon';

export interface ITrackItemProps {
    thumbnail: String,
    title: String,
    description: String,
    author: String,
    puzzleCount: number,
    tags: string[]
}

const TrackItem : FC<ITrackItemProps> = (props) => {
    return (
        <StyledTrackItem>
            <figure>
                <img src={MapImage} />
            </figure>
            <hgroup>
                <TagNamesContainer tagnames={props.tags} />
                <Heading level='h6' $alignCenter={false}>{props.title}</Heading>
                <p>{props.description}</p>
                <TrackItemMeta>
                    <li>Autor: {props.author}</li>
                    <li>Ilość zagadek: {props.puzzleCount}</li>
                </TrackItemMeta>
                <ButtonIcon btnType='regular' icon='start'>Rozpocznij trasę</ButtonIcon>
            </hgroup>
        </StyledTrackItem>
    )
}

const StyledTrackItem = styled.article`
    figure {
        border-radius: 0.8rem;
        overflow: hidden;
        aspect-ratio: 16/9;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    hgroup {
        padding: 0.8rem;
    }

    h6 {
        margin: 0.8rem 0;
    }

    p {
        font-size: 1.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-height: 1.5;        /* fallback */
        max-height: 3;       /* fallback */
    }
`

const TrackItemMeta = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8rem;
    margin: 1.2rem 0;
    padding: 0;

    li {
        font-size: 1.2rem;
        color: var(--color-grey-dark);
        display: flex;
        align-items: center;
        gap: 0.8rem;
        &:not(:last-child) {
            &::after {
                content: "";
                display: block;
                width: 0.5rem;
                height: 0.5rem;
                background-color: var(--color-grey-dark);
                border-radius: 50%;
            }
        }
    }
`

export default TrackItem 