import React, { FC } from 'react'
import { Text,Image, ImageSourcePropType,View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { setFontWeight } from '../../styles/typography'

interface IChoiceButtonProps {
    title: string,
    message: string,
    picture: ImageSourcePropType,
    onClick: ()=>void
}

const ChoiceButton : FC<IChoiceButtonProps> = (props) => (
    <StyledChoiceButton onPress={props.onClick}>
        <ButtonImage source={props.picture} />
        <ButtonText>
            <ButtonTitle>{props.title}</ButtonTitle>
            <ButtonMessage>({props.message})</ButtonMessage>
        </ButtonText>
    </StyledChoiceButton>
)

const StyledChoiceButton = styled(TouchableOpacity)`
    width: 100%;
    min-height: 170px;
    align-items: center;
    border: 1px solid ${({theme}) => theme.text_light};
    border-radius: 8px;
    padding: 15px 0px;
    background: ${(props) => props.theme.input};
`

const ButtonText = styled(View)`
    align-items: center;
    justify-self: end;
`

const ButtonTitle = styled(Text)`
    ${setFontWeight('bold')}
    font-size: 16px;
    line-height: 16px;
`

const ButtonMessage = styled(Text)`
    font-size: 11px;
    color: ${({theme}) => theme.primary};
`;

const ButtonImage = styled(Image)`
    flex: 1;
    object-fit: contain;
`

export default ChoiceButton