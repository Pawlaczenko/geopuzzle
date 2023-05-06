import React from 'react'
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation.types';

type CreateRouteProps = NativeStackScreenProps<RootStackParamList,'CreateRoute'>;

const CreateRouteScreen = ({navigation} : CreateRouteProps) => {
  return (
    <Container>
        <StyledText>Create Route</StyledText>
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

export default CreateRouteScreen