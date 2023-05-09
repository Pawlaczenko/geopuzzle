import React from 'react'
import styled from 'styled-components/native';
import {View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';
import { Text } from 'react-native';
import AppContainer from '../../components/AppContainer/AppContainer';
import Heading from '../../components/Heading/Heading';
import { setFontWeight } from '../../styles/typography';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Home'>;

const HomeScreen = ({navigation} : HomeProps) => {
  return (
    <AppContainer>
      <HomeScreenWrapper>
        <WelcomeMessagePrefix>Cześć</WelcomeMessagePrefix>
        <Name>Adam</Name>
        <Heading>Co chcesz dzisiaj robić?</Heading>
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

export default HomeScreen