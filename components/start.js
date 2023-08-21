import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from "react-native";
import image from '../assets/BackgroundImage.png'
import { getAuth, signInAnonymously } from "firebase/auth"

const Home = ({ navigation }) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
            .then((result) => {
                navigation.navigate("Chat", { userID: result.user.uid, name: name, color: color ? color: '#ddd'})
                Alert.alert("Signed in Successfully!")
                console.log(result)
            })
            .catch(error => {
                Alert.alert("Unable to sign in, try again later.")
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.appTitle}>Chatting</Text>
            {/* second part of style will change the backgroundColor of the container to whatever the user selected, if no color is selected a default color is given */}
            <View style={[styles.optionContainer, {backgroundColor: color ? color: '#ddd'}]}>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                />
                {/* Start of the options area, where you will enter username, select bg color, and start chatting */}
                <Text style={styles.colorSelectText}>Choose Background Color:</Text>
                <View style={styles.colorSelect}>
                    {/* Each individual background color choice is mapped out here */}
                    <TouchableOpacity 
                    style={[styles.circle, {backgroundColor: '#090C08'}]}
                    onPress={() => {setColor('#090C08')}}>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.circle, {backgroundColor: '#474056'}]}
                    onPress={() => setColor('#474056')}>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.circle, {backgroundColor: '#8A95A5'}]}
                    onPress={() => setColor('#8A95A5')}>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.circle, {backgroundColor: '#B9C6AE'}]}
                    onPress={() => setColor('#B9C6AE')}>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.circle, {backgroundColor: '#aaa'}]}
                    onPress={() => setColor('#aaa')}>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonInput}>
                    {/* // on moving to the chat area check to see if a name was entered and if not return default name of User, also check to see if a background color was selected if not return default white
                    onPress={() => navigation.navigate('Chat', { name: name ? name: "User", color: color? color: "#FFF"})}> */}
                    <Text onPress={signInUser} style={styles.text}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "space-between",
        padding: "6%"
    },
    appTitle: {
        flex: 2,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFF',
        alignSelf: 'center'
    },
    optionContainer: {
        flex: 1,
        padding: '6%',
        flexBasis: 130,
        borderRadius: 25,
        background: '#73AD21',
        opacity: 0.9,
    },
    textInput: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: 15,
        marginBottom: 15,
    },
    colorSelectText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        opacity: 100,
    },
    colorSelect: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: "row",
        margin: 10,
        padding: 10,
        opacity: 0.9,
    },
    circle: {
        height: 50,
        width: 50, 
        borderRadius: 25,
    },
    buttonInput: {
        alignContent: 'center',
        backgroundColor: '#757083',
        padding: 10,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    text: {
        alignSelf: 'center',
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default Home;