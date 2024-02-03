import React from 'react'
import { FC } from 'react';
import styled from 'styled-components';
import AccentImage from 'src/assets/heading-accent.svg';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IHeadingProps {
    level: HeadingLevel,
    children: React.ReactNode,
    $alignCenter?: boolean,
    withAccent?: boolean
}


const Heading : FC<IHeadingProps> = (props) => {
  const headingStyle = {"--heading-size": `var(--fs-${props.level})`} as React.CSSProperties;
  
  return (
    <StyledHeading as={props.level} style={headingStyle} $alignCenter={props.$alignCenter}>
        {props.withAccent && <HeadingAccentImage /> }
        {props.children}
    </StyledHeading>
  )
}

const HeadingAccentImage = styled.figure`
    background: url(${AccentImage}) center/contain no-repeat;
    height: var(--heading-size);
    margin-bottom: 0.8rem;
`

export const StyledHeading = styled.h1<{$alignCenter?:boolean}>`
    font-size: var(--heading-size);
    font-family: var(--family-primary);
    ${(props) => props.$alignCenter && "text-align: center;"};
    font-weight: bold;

    color: ${({theme}) => theme.text};
    text-shadow: 0 4px rgba(121,174,163,.25);

    ${HeadingAccentImage} {
      ${(props) => !props.$alignCenter && "background-position: left;"};
    }
`;

export default Heading