import { FC } from 'react'
import styled from 'styled-components'
import Paragraph from './Paragraph.styled'
import { addStrongTags } from 'src/helpers/typography.helper'

export interface NumberedListItem {
    label: string,
    description: string
}

const NumberedList : FC<{items: NumberedListItem[]}> = ({items}) => {
    return (
        <StyledNumberedList>
            {
                items.map((item,index) => (
                    <ListItem key={'numberedlist-'+index}>
                        <ListItemLabel>{index+1}. {item.label}</ListItemLabel>
                        <Paragraph dangerouslySetInnerHTML={{ __html: addStrongTags(item.description) }} />
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
    margin-bottom: 1.6rem;

    p {
        font-size: 1.4rem;
    }
`

const ListItemLabel = styled.span`
    font-weight: bold;
    font-family: var(--family-primary);
    display: inline-block;
    margin-bottom: .3rem;
    font-size: 1.6rem;
    color: ${(props) => props.theme.primary};
`


export default NumberedList