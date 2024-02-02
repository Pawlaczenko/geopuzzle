import { FC } from 'react'
import styled from 'styled-components'
import { StyledImage } from '../Input/FileInput'
import { BREAKPOINTS } from 'src/styles/variables'

interface ISummaryTableProps {
    summaryData: Map<string, React.ReactNode>,
    tableHeader?: string
}

const SummaryTable : FC<ISummaryTableProps> = ({summaryData,tableHeader}) => {
    const displaySummaryValues = () => {
        const data = Array.from(summaryData).map(([key, value]) => (
            <StyledRow>
                <StyledKey>{key}</StyledKey>
                <StyledTD>{value}</StyledTD>
            </StyledRow>
        ))
        return data;
    }

    return (
        <StyledSummaryTable>
            {
                tableHeader && <thead><StyledRow><StyledHeader>{tableHeader}</StyledHeader></StyledRow></thead>
            }
            <tbody>
                {displaySummaryValues()}
            </tbody>
        </StyledSummaryTable>
    )
}

const StyledSummaryTable = styled.table`
    margin-top: 5rem;
    border-radius: 1.5rem;
    width: 100%;
`;

const StyledRow = styled.tr`
    &:nth-child(odd) {
        background-color: ${({theme}) => theme.input};
    }
`

const StyledTD = styled.td`
    padding: 1.5rem;

    & > ${StyledImage} {
        width: 60%;
        
        @media only screen and (${BREAKPOINTS.phone}){
            width: 100%;
        }
    }
`

const StyledKey = styled(StyledTD)`
    font-weight: var(--fw-bold);
    width: 25%;
`

const StyledHeader = styled(StyledKey)`
    background: var(--color-primary);
    color: white;
`

export default SummaryTable