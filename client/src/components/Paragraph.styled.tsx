import styled from 'styled-components'

interface IParagraphProps {
    align?: 'center' | 'left' | 'right' | 'justify',
    padding?: boolean
}

const Paragraph = styled.p<IParagraphProps>`
    font-size: var(--fs-paragraph);
    font-family: var(--family-primary);
    color: ${(props) => props.theme.textBlue};
    text-align: ${(props) => props.align || 'left'};
    line-height: 1.5;
    ${(props) => (props.padding === undefined || props.padding) && 'padding: 1rem 1.5rem'};
`;


export default Paragraph