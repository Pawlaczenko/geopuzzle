import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const Page = styled.section`
    height: 100vh;
    overflow-y: scroll;
    @media only screen and (${BREAKPOINTS.phone}){
        padding: var(--mobile-topbar-size) 0;
    }
`;


export default Page