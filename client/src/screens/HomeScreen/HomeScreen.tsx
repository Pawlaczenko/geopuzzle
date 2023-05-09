import React from 'react'
import styled from 'styled-components/native';
import {View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { Text } from 'react-native';
import AppContainer from '../../components/AppContainer/AppContainer';
import Heading from '../../components/Heading/Heading';
import { setFontWeight } from '../../styles/typography';
import ChoiceButton from '../../components/ChoiceButton/ChoiceButton';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Home'>;

const HomeScreen = ({navigation} : HomeProps) => {
  return (
    <AppContainer>
      <HomeScreenWrapper>
        <WelcomeMessagePrefix>Cześć</WelcomeMessagePrefix>
        <Name>Adam</Name>
        <Heading>Co chcesz dzisiaj robić?</Heading>
        <ButtonsWrapper>
          <ChoiceButton 
            title='Zagraj w podchody' 
            message='miej załadowany telefon' 
            picture={require('../../../assets/icons/icon-shoe.png')}
            onClick={()=>{navigation.navigate('CreateRoute')}}/>
          <ChoiceButton 
            title='Stwórz własną trasę' 
            message='gdzie poniesie cię wiatr' 
            picture={require('../../../assets/icons/icon-pencil.png')} 
            onClick={()=>{navigation.navigate('CreateRoute')}}/>
        </ButtonsWrapper>
      </HomeScreenWrapper>
    </AppContainer>
  )
}

const HomeScreenWrapper = styled(View)`
  flex: 1;
`

const WelcomeMessagePrefix = styled(Text)`
  font-size: 20px;
  color: ${(props) => props.theme.text_accent};
`

const Name = styled(Text)`
  font-size: 48px;
  line-height: 48px;
  color: ${(props) => props.theme.text_light};
  ${setFontWeight('bold')};
`;

const ButtonsWrapper = styled(View)`
  margin-top: 35px;
  gap: 15px;
`

export default HomeScreen