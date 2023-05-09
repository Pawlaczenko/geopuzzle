import React, { FC } from 'react'
import styled from 'styled-components'
import { Text } from 'react-native';

interface IAppTextProps {
    children: React.ReactNode,
}

const Heading : FC<IAppTextProps> = ({children}) => {
  return (
    <StyledHeading>
        {children}
    </StyledHeading>
  )
}

const StyledHeading = styled(Text)`
    font-size: 24px;
    color: ${(props) => props.theme.text};
    font-family: 'Montserrat_Bold';
    margin: 10px 0;
`

export default Heading