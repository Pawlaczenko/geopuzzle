import { Image } from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  return (
    <Container>
      <Image source={require('./assets/logo.png')} />
      <StyledText>GeoPuzzle</StyledText>
    </Container>
  );
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