import { FC, useRef } from 'react'
import styled, { useTheme } from 'styled-components'
import Slider from "react-slick";
import TrackItem, { ITrackItemProps } from './TrackItem/TrackItem';
import Heading from './Heading';
import ButtonIcon from './Button/ButtonIcon';
import { ICONS } from 'src/data/icons.data';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';

const TrackSwiper: FC = () => {
    const sliderRef = useRef<Slider>(null);
    var settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                  slidesToShow: 2,
                }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1.5,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1.1,
              }
            }
        ]
    };
    const trackItem : ITrackItemProps = {
        thumbnail: "siema",
        title: "Europa da się lubić - 2",
        description: "Vue has full support for web components, including passing attributes as props and listening for custom events",
        author: "Adam Driver",
        puzzleCount: 10,
        tags: ["Europa", "Parki Narodowe"]
    }
    const slides = [1,2,3,4,5,6,7];

    const PrevIcon = ICONS.get('prev');
    const NextIcon = ICONS.get('next');

    const handlePrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    
    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <StyledTrackSwiper>
            <StyledSwiperHeader>
                <Heading level='h3' $alignCenter={false}>Sprawdź również</Heading>
                <ArrowButtons>
                    <ArrowButton onClick={handlePrev}>
                        {PrevIcon && <PrevIcon />}
                    </ArrowButton>
                    <ArrowButton onClick={handleNext}>
                        {NextIcon && <NextIcon />}
                    </ArrowButton>
                </ArrowButtons>
            </StyledSwiperHeader>
            <Slider ref={sliderRef} {...settings}>
                {
                  slides.map(slide => 
                    <StyledSlide key={slide}>
                        <TrackItem {...trackItem} />
                    </StyledSlide>
                  )  
                }
            </Slider>
        </StyledTrackSwiper>
    )
}

export const StyledTrackSwiper = styled.div`
    margin: 6.4rem 0;
`;

export const StyledSwiperHeader = styled.hgroup`
    display: flex;
    ${flexContainer('space-between','center')};
    margin-bottom: 4.8rem;
`

const StyledSlide = styled.div`
    padding: 0 1rem;
`

const ArrowButtons = styled.div`
    ${flexContainer('flex-start','flex-start')};
    gap: 0.4rem;

    @media only screen and (${BREAKPOINTS.small}){
        display: none;
    }
`

const ArrowButton = styled.button`
    --btn-size: 4rem;
    width: var(--btn-size);
    height: var(--btn-size);
    ${flexContainer('center','center')};
    cursor: pointer;
    background-color: var(--color-grey);

    &:hover {
        background-color: var(--color-primary);
        svg {
            fill: white;
        }
    }

    svg {
        width: 75%;
        height: 75%;
    }
`;


export default TrackSwiper