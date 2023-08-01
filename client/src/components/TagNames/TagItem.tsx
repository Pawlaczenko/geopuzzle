import { FC } from 'react'
import styled from 'styled-components'

interface ITagItemProps {
    tag: string,
    id: number,
    handleClick: (tag:string)=>void
}

const TagItem : FC<ITagItemProps> = (props) => {
    return (
        <StyledTagItem onClick={()=>{props.handleClick(props.tag)}}>
            {props.tag}
            <StyledRemoveButton>x</StyledRemoveButton>
        </StyledTagItem>
    )
}

export const StyledTagItem = styled.span`
    background: ${({theme}) => theme.decoration};
    padding: .5rem .8rem;
    border-radius: .5rem;
    cursor: pointer;
    font-size: var(--fs-paragraph);
    color: ${({theme}) => theme.textBlue};
`;

const StyledRemoveButton = styled.span`
    margin-left: 1rem;
    color: var(--color-secondary);
`


export default TagItem