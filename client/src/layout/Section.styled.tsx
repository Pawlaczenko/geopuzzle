import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const Section = styled.div`
    padding: 5rem 15rem 5rem 7.5rem;

    @media only screen and (${BREAKPOINTS.phone}){
        padding: 5rem 3.5rem;
    }
`;


export default Section