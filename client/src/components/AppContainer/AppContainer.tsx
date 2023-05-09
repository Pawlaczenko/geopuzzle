import React, { FC } from 'react';
import { View, Image } from 'react-native';
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

const ContentContainer = styled(View)`
  flex: 1;
  padding-top: 75px;
  padding-left: 25px;
`;

const StyledImageBackground = styled(Image)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  object-fit: contain;
`;

export default AppContainer;
