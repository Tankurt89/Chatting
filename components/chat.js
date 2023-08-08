import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';

const Screen2 = ({ route, navigation }) => {
    const { name, color } = route.params;
    const [messages, setMessages] = useState([])
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
    //displays a default message letting you know you joined the chat and an example message saying hello. 
    useEffect(() => {
        navigation.setOptions({ title: name })
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: 'You have joined the chat',
                createdAt: new Date(),
                system: true,
            }
        ])
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
                _id:1
            }}
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

export default Screen2;