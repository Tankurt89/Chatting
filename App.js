import Home from './components/start'
import Chat from './components/chat'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"



const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCQYfS0P1SLwM9vYUyZSvK73vYGpfAemDw",
    authDomain: "chatting-b59de.firebaseapp.com",
    projectId: "chatting-b59de",
    storageBucket: "chatting-b59de.appspot.com",
    messagingSenderId: "968170673176",
    appId: "1:968170673176:web:1e092f0f063ecf1e091f6d",
    measurementId: "G-QTDJL9JX38"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;