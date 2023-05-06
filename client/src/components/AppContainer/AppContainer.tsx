import React, { FC } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import styled from 'styled-components/native';

interface IAppContainer {
  children: React.ReactNode;
}

const AppContainer: FC<IAppContainer> = ({ children }) => {
  const background_image = require('../../../assets/background-waves.png');
  return (
    <ContentContainer>
        <StyledImageBackground source={background_image} />
        {children}
    </ContentContainer>
  );
};

const StyledImageBackground = styled(Image)`
    width: 100%;
    position: absolute;
    bottom: 0;
`;

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default AppContainer;
