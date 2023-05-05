import React from 'react'
import styled from 'styled-components/native';
import { Button, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Home'>;

const HomeScreen = ({navigation} : HomeProps) => {
  return (
    <Container>
        <Image source={require('../../../assets/logo.png')} />
        <StyledText>GeoPuzzle</StyledText>
        <Button
          title="Stwórz własną trasę"
          onPress={() => navigation.navigate('CreateRoute')}
        />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;  
  align-items: center;
  justify-content: center;
  padding: 15px;
`

const StyledText = styled.Text`
  font-size: 50px;
  color: #4EAE4D;
  font-weight: 500;
  text-align: center;
`;

export default HomeScreen