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
    background: var(--color-grey);
    padding: .5rem .8rem;
    border-radius: .5rem;
    cursor: pointer;
    font-size: 1.4rem;
    color: ${({theme}) => theme.textBlue};
`;

const StyledRemoveButton = styled.span`
    margin-left: 1rem;
    color: var(--color-secondary);
`


export default TagItem