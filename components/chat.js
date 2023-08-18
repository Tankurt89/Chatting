import { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions'
import MapView from 'react-native-maps'

const Chat = ({ route, navigation, db, isConnected, storage }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([])

    let unsubMessages

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }
     
    useEffect(() => {
        navigation.setOptions({ title: name})
        if (isConnected === true){
            if (unsubMessages) unsubMessages()
            unsubMessages = null
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
            unsubMessages = onSnapshot(q, async (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach((doc) => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                })
                cachedMessages(newMessages)
                setMessages(newMessages)
            })
        } else loadCachedMessages();
        return () => {
            if (unsubMessages) unsubMessages()
        }
    }, [isConnected])

    const loadCachedMessages = async () => { 
        const cachedMessages = (await AsyncStorage.getItem('messages')) || []
        setMessages(JSON.parse(cachedMessages))
    }

    const cachedMessages = async (messagesToCache) => {
        try {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache))
    } catch (error) {
        console.log(error.message)
    }
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />
        else return null
    }

    // Used to style the text bubbles in the chat 
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right:{
                    backgroundColor: "#808080"
                },
                left:{
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    const renderCustomActions = (props) => {
        return <CustomActions userID={userID} storage={storage} {...props} />
    }

    const renderCustomView = (props) => {
        const { currentMessage } = props
        if (currentMessage.location) {
            return (
                <MapView 
                    style={{width: 150, height: 100, borderRadius: 13, margin: 3}}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421    
                    }}
                />
            )
        }
    }
    
    //returns the message that the user types and sends
    return (
    <View style={[styles.container, {backgroundColor: color}]}>
        <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderCustomActions}
            renderCustomView={renderCustomView}
            onSend={messages => onSend(messages)}
            user={{
                _id: userID,
                name
            }}
            // name={{ name: name}}
        />
        {/* Make sure that the keyboard does not obstruct any view */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null}
    </View>
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 text: {
    color: '#eee'
 }
 
});

export default Chat;