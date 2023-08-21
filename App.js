import Home from './components/start'
import Chat from './components/chat'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { initializeApp } from "firebase/app"
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore"
import { useNetInfo } from '@react-native-community/netinfo'
import { Alert } from 'react-native'
import { useEffect } from 'react'
import { getStorage } from 'firebase/storage'


const Stack = createNativeStackNavigator();

const App = () => {
  //set up for the google firebase storage
  const connectionStatus = useNetInfo()
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
  const storage = getStorage(app)
  
  useEffect(() => {
    if (connectionStatus.isConnected === false){
      Alert.alert('No Internet Connection!')
      disableNetwork(db)
    }else if (connectionStatus.isConnected === true){
      enableNetwork(db)
    }
  }, [connectionStatus.isConnected])

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
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;