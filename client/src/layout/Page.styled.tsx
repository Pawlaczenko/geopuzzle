import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'
import backgroundImage from 'src/assets/back-track.svg';

const Page = styled.section`
    height: 100vh;
    overflow-y: scroll;
    /* background: url(${backgroundImage}) right/contain no-repeat; */
    @media only screen and (${BREAKPOINTS.phone}){
        padding: var(--mobile-topbar-size) 0;
    }
`;


export default Page