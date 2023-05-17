import { FC } from 'react'
import { BREAKPOINTS } from 'src/styles/variables';
import styled from 'styled-components'

const Page = styled.section`
    @media only screen and (${BREAKPOINTS.phone}){
        padding-top: var(--mobile-topbar-size);
    }
`;


export default Page