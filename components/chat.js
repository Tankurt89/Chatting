import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Screen2 = ({ route, navigation }) => {

    const { name, color } = route.params;
    
    useEffect(() => {
        navigation.setOptions({ title: name })
    }, [])
    
    return (
    <View style={[styles.container, {backgroundColor: color}]}>
        <Text style={styles.text}>Hello Screen2!</Text>
    </View>
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 text: {
    color: '#eee'
 }
 
});

export default Screen2;