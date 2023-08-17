import { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { addDoc, collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected }) => {
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
            const q = query(collection(db, "messages"), where("uid", "==", userID), orderBy("createdAt", "desc"))
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
        const cachedMessages = await AsyncStorage.getItem('messages') || []
        setMessages(JSON.parse(cachedMessages))
    }

    const cachedMessages = async (messagesToCache) => {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache))
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
    //returns the message that the user types and sends
    return (
    <View style={[styles.container, {backgroundColor: color}]}>
        <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
                _id: userID
            }}
            name={{ name: name}}
            renderInputToolbar={renderInputToolbar}
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