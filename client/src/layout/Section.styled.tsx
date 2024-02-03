import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const Section = styled.div`
    padding: 5rem 7.5rem 5rem 7.5rem;
    max-width: var(--website-width);
    margin: 0 auto;

    @media only screen and (${BREAKPOINTS.phone}){
        padding: 5rem 2.5rem;
    }
`;


export default Section