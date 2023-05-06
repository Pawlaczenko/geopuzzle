import React, { FC } from 'react'
import styled from 'styled-components'
import { Text } from 'react-native'
import { useFonts } from 'expo-font';

interface IAppTextProps {
    children: React.ReactNode,
    weight?: 'regular' | 'bold' | 'black'
}

const AppText : FC<IAppTextProps> = ({children,weight}) => {
	const [loaded] = useFonts({
		Montserrat: require('../../../assets/fonts/Montserrat.ttf'),
		Montserrat_Bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
		Montserrat_Black: require('../../../assets/fonts/Montserrat-Black.ttf'),
	});

	if (!loaded) {
		return null;
	}

  const getFontWeight = (weight:string) : string => {
    switch(weight){
      case 'bold': return 'Montserrat_Bold';
      case 'black': return 'Montserrat_Black';
      default: return 'Montserrat';
    }
  }

  return (
    <Text style={{ fontFamily: getFontWeight(weight||"")}}>
        {children}
    </Text>
  )
}

export default AppText