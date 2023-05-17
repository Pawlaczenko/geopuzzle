import React from 'react'
import { FC } from 'react';
import styled from 'styled-components';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IHeadingProps {
    level: HeadingLevel,
    children: React.ReactNode,
    alignCenter?: boolean
}


const Heading : FC<IHeadingProps> = (props) => {
  const headingStyle = {"--heading-size": `var(--fs-${props.level})`} as React.CSSProperties;
  
  return (
    <StyledHeading as={props.level} style={headingStyle} alignCenter={props.alignCenter}>
        {props.children}
    </StyledHeading>
  )
}

export const StyledHeading = styled.h1<{alignCenter?:boolean}>`
    font-size: var(--heading-size);
    font-family: var(--family-primary);
    color: ${({theme}) => theme.text};
    ${(props) => props.alignCenter && "text-align: center;"};
    font-weight: bold;
`;

export default Heading