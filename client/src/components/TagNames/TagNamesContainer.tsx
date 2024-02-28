import { FC } from 'react'
import styled from 'styled-components'
import { StyledTagItem } from './TagItem';
import { flexContainer } from 'src/styles/mixins';
import { useNavigate } from 'react-router-dom';

const TagNamesContainer : FC<{tagnames: string[]}> = ({tagnames}) => {

    const navigate = useNavigate();

    function handleTagClick(name:string) {
        navigate(`/track?search=${encodeURIComponent(name)}`);
    }

    return (
        <StyledTagNamesContainer>
            {
                tagnames.map((item)=><StyledTagItem key={item} onClick={() => {handleTagClick(item)}}>{item}</StyledTagItem>)
            }
        </StyledTagNamesContainer>
    )
}

const StyledTagNamesContainer = styled.div`
    ${flexContainer('flex-start','center')};
    flex-wrap: wrap;
    gap: 1rem;
`;


export default TagNamesContainer