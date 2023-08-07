import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import image from '../assets/BackgroundImage.png'

const Screen1 = ({ navigation }) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.appTitle}>Chatting</Text>
            <View style={styles.optionContainer}>
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
                    onPress={() => setColor('#090C08')}>
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
                <TouchableOpacity
                    style={styles.buttonInput}
                    // on moving to the chat area check to see if a name was entered and if not return default name of User, also check to see if a background color was selected if not return default white
                    onPress={() => navigation.navigate('Screen2', { name: name ? name: "User", color: color? color: "#FFF"})}>
                    <Text style={styles.text}>Start Chatting</Text>
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
        backgroundColor: '#FFF',
        padding: '6%',
        flexBasis: 160,
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: 15,
        marginBottom: 15,
    },
    colorSelectText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100,
    },
    colorSelect: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: "row",
        margin: 10,
        padding: 10,
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

export default Screen1;