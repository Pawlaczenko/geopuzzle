import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { registerRootComponent } from 'expo';
import { RootStackParamList } from './src/types/navigation.types';
import CreateRouteScreen from './src/screens/CreateRoute/CreateRouteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name='CreateRoute' component={CreateRouteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 