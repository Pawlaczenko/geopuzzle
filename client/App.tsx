import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { RootStackParamList } from './src/types/navigation.types';
import CreateRouteScreen from './src/screens/CreateRoute/CreateRouteScreen';
import { ITheme, lightTheme } from './src/styles/theme';
import { ThemeProvider } from 'styled-components';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const currentTheme : ITheme = lightTheme;
  const [loaded] = useFonts({
		Montserrat: require('./assets/fonts/Montserrat.ttf'),
		Montserrat_Bold: require('./assets/fonts/Montserrat-Bold.ttf'),
		Montserrat_Black: require('./assets/fonts/Montserrat-Black.ttf'),
	});

  if (!loaded) {
		return null;
	}

  return (
    <ThemeProvider theme={currentTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name='CreateRoute' component={CreateRouteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;