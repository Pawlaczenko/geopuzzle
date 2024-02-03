import { FC } from 'react'
import Container from 'src/layout/Container'
import { flexContainer } from 'src/styles/mixins'
import styled from 'styled-components'
import Heading from '../Heading'
import Paragraph from '../Paragraph.styled'
import ButtonIcon from '../Button/ButtonIcon'
import { BREAKPOINTS } from 'src/styles/variables'

export interface ITextWithPhoto {
    photo: string,
    heading: string,
    paragraph: string,
    button: string
}

const TextWithPhoto : FC<ITextWithPhoto> = ({heading,photo,paragraph,button}) => {

    return (
        <Container>
            <StyledTextWithPhoto>
                <div>
                    <Heading level='h4' withAccent>{heading}</Heading>
                    <Paragraph>{paragraph}</Paragraph>
                    <ButtonIcon btnType='outline' icon='explore'>{button}</ButtonIcon>
                </div>
                <div>
                    <StyledImage>
                        <img src={photo} />
                    </StyledImage>
                </div>
            </StyledTextWithPhoto>
        </Container>
    )
}

const StyledTextWithPhoto = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4.8rem;
    margin: 6.4rem 0 3.2rem 0;

    & > div {
        &:first-child {
            flex: 1;
        }
        &:last-child {
            flex: 1;
        }
    }

    ${Paragraph} {
        padding: 0;
        margin: 1.8rem 0;
        width: 80%;
        font-size: 1.4rem;
    }

    
    @media only screen and (${BREAKPOINTS.big}){
        flex-direction: column-reverse;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        ${Paragraph} {
            width: 100%;
        }
    }
`;

const StyledImage = styled.figure`
    width: 100%;
    aspect-ratio: 3/2;
    border-radius: 0.8rem;
    overflow: hidden;

    @media only screen and (${BREAKPOINTS.big}){
        aspect-ratio: 4/2;
    }

    @media only screen and (${BREAKPOINTS.phone}){
        aspect-ratio: 3/2;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default TextWithPhoto