import { FC } from 'react'
import styled from 'styled-components'
import Heading from './Heading'
import MapImage from 'src/assets/map.svg';
import { flexContainer } from 'src/styles/mixins';
import { BREAKPOINTS } from 'src/styles/variables';

interface IBannerProps {
    text: string
}

const Banner : FC<IBannerProps> = ({text}) => {
    return (
        <StyledBanner>
            <BannerBox>
                <Heading level='h1' $alignCenter={true}>{text}</Heading>
            </BannerBox>
        </StyledBanner>
    )
} 

export const StyledBanner = styled.div<{background?: string}>`
    width: 100%;
    background: 
        url(${(props)=>props.background ? props.background : MapImage}) center / cover no-repeat,
        var(--color-primary);
    ${flexContainer('center','center')};
    padding: 3rem;
`;

export const BannerBox = styled.div`
    background: ${(props) => props.theme.header};
    padding: 1rem 5rem;
    width: min-content;
    border-radius: 3rem;
    box-shadow: 0 .4rem 0 0 rgba(0,0,0,.25);
    line-height: 1;
    max-width: 90vw;

    @media only screen and (${BREAKPOINTS.phone}){
        h1 {
            font-size: 3.4rem;
        }
    }
`

export default Banner 