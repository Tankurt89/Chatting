import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore"

const Chat = ({ route, navigation, db }) => {
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([])
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }
     
    useEffect(() => {
        navigation.setOptions({ title: name})
        const q = query(collection(db, "messages"),  orderBy("createdAt", "desc"))
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages)
        })
        return () => {
            if (unsubMesssages) unsubMessages()
        }
    }, [])


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