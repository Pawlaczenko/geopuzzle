import { FC } from 'react'
import styled from 'styled-components'
import Paragraph from './Paragraph.styled'

export interface NumberedListItem {
    label: string,
    description: string
}

const NumberedList : FC<{items: NumberedListItem[]}> = ({items}) => {
    return (
        <StyledNumberedList>
            {
                items.map((item,index) => (
                    <ListItem>
                        <ListItemLabel>{index+1}. {item.label}</ListItemLabel>
                        <Paragraph>{item.description}</Paragraph>
                    </ListItem>
                ))
            }
        </StyledNumberedList>
    )
}

const StyledNumberedList = styled.ol`
    list-style-type: none;
    margin: 3.5rem 0;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 2rem;
`

const ListItemLabel = styled.span`
    font-weight: bold;
    font-family: var(--family-primary);
    display: inline-block;
    margin-bottom: .5rem;
    font-size: 1.8rem;
    color: var(--color-secondary);
`


export default NumberedList