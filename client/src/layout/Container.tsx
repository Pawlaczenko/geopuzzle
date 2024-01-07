import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr var(--website-width) 1fr;
    & > * {
        grid-column: 2;
    }
`;


export default Container