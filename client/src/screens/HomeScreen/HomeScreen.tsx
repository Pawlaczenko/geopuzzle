import React from 'react'
import styled from 'styled-components/native';
import { Button, Image, ImageBackground, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { Text } from 'react-native';
import AppText from '../../components/AppText/AppText';
import AppContainer from '../../components/AppContainer/AppContainer';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Home'>;

const HomeScreen = ({navigation} : HomeProps) => {
  return (
    <HomeScreenWrapper>
      <Image source={require('../../../assets/logo.png')} />
      <WelcomeMessagePrefix>Witaj w</WelcomeMessagePrefix>
      <WelcomeMessage>
        <AppText weight='bold'>GeoPuzzle</AppText>
      </WelcomeMessage>
      <Button
        title="Stwórz własną trasę"
        onPress={() => navigation.navigate('CreateRoute')}
      />
    </HomeScreenWrapper>
  )
}

const HomeScreenWrapper = styled(AppContainer)`
  justify-content: center;
`

const WelcomeMessagePrefix = styled(Text)`
  font-size: 20px;
  color: ${(props) => props.theme.text_accent};
  text-align: center;
  margin-top: 15px;
`

const WelcomeMessage = styled(Text)`
  font-size: 36px;
  color: ${(props) => props.theme.text};
  text-align: center;
`;

export default HomeScreen