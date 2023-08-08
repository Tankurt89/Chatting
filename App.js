import Screen1 from './components/start'
import Screen2 from './components/chat'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Home"
          component={Screen1}
        />
        <Stack.Screen
          name="Chat"
          component={Screen2}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;