import { FC } from 'react'
import styled from 'styled-components'
import { StyledTagItem } from './TagItem';
import { flexContainer } from 'src/styles/mixins';

const TagNamesContainer : FC<{tagnames: string[]}> = ({tagnames}) => {
    return (
        <StyledTagNamesContainer>
            {
                tagnames.map((item)=><StyledTagItem>{item}</StyledTagItem>)
            }
        </StyledTagNamesContainer>
    )
}

const StyledTagNamesContainer = styled.div`
    ${flexContainer('flex-start','center')};
    gap: 1rem;
`;


export default TagNamesContainer