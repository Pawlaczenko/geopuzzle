import { FC } from 'react'
import styled from 'styled-components'
import Heading from './Heading'
import MapImage from 'src/assets/map.svg';
import { flexContainer } from 'src/styles/mixins';

interface IBannerProps {
    text: string
}

const Banner : FC<IBannerProps> = ({text}) => {
    return (
        <StyledBanner>
            <BannerText>
                <Heading level='h1' $alignCenter={true}>{text}</Heading>
            </BannerText>
        </StyledBanner>
    )
} 

const StyledBanner = styled.div`
    width: 100%;
    background: 
        url(${MapImage}) center left/ cover no-repeat,
        var(--color-secondary);
    ${flexContainer('center','center')};
    padding: 3rem 0;
`;

const BannerText = styled.div`
    background: ${(props) => props.theme.header};
    padding: 1rem;
    width: min(75%, 40rem);
    border-radius: 3rem;
    box-shadow: 0 .4rem 0 0 rgba(0,0,0,.25);
    line-height: 1;
`

export default Banner 