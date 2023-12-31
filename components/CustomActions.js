import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native"
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { getDownloadURL, uploadBytes, ref } from "firebase/storage"
import { Audio } from 'expo-av'
import { useEffect } from "react"

const CustomActions = ({ wrapperStyle, iconTestStyle, onSend, storage, userID }) => {
  const actionSheet = useActionSheet()
  let recordingObject = null;
  //Sets up the options for the action button on the input toolbar
  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Record a Sound', 'Cancel']
    const cancelButtonIndex = options.length - 1
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
    async (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          pickImage()
          return
        case 1:
          takePhoto()
          return
        case 2:
          getLocation()
          return
        case 3:
          startRecording()
          return
        default:
        }
    })
  }
  //Requests permission to access the users media library and then allows the user to send images as long as the access was granted. 
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync()
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri) 
      else Alert.alert("Permissions haven't been granted.") 
    }
  }
  //Requests permission to use the devices camera and allow it to be added to the chat  
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync()
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync()
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri)
      else Alert.alert ("Permissions haven't been granted.")
    }
  }
  //Requests permission to access the devices location services and then send the image to the chat 
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  }
  //Allows for the uploading of multiple by using a unique reference string each time a new file is uploaded generated here.
  const generateReference = (uri) => {
    const imageName = uri.split("/")[uri.split("/").length - 1]
    const timeStamp = new Date().getTime()
    return `${userID}-${timeStamp}-${imageName}`
  }
  //Refactored code that allows other functions to call for use. 
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI)
    const newUploadRef = ref(storage, uniqueRefString)
    const response = await fetch(imageURI)
    const blob = await response.blob()
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref)
      onSend({ image: imageURL })
    })
  }

  const startRecording = async () => {
    try {
      let permissions = await Audio.requestPermissionsAsync();
      if (permissions?.granted){
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })
        Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY).then(results => {
          return results.recording
        }).then(recording => {
          recordingObject = recording;
          Alert.alert('You are recording...', undefined, [
            { text: 'Cancel', onPress: () => { stopRecording ()}},
            { text: 'Stop and Send', onPress: () => { sendRecordedSound()}},
          ],
            { cancelable: false}
          )
        })
      }
    } catch (err){
      Alert.alert('Failed to record!')
    }
  }
 
  const stopRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false
    })
    await recordingObject.stopAndUnloadAsync()
  }

  const sendRecordedSound = async () => {
    await stopRecording()
    const uniqueRefString = generateReference(recordingObject.getURI())
    const newUploadRef = ref(storage, uniqueRefString)
    const response = await fetch(recordingObject.getURI())
    const blob = await response.blob()
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const soundURL = await getDownloadURL(snapshot.ref)
      onSend({ audio: soundURL})
    })
  }
  //Makes sure to dismount the audio recording when the app is closed/minimized
  useEffect(() => {
    return () => {
      if (recordingObject) recordingObject.stopAndUnloadAsync()
    }
  }, [])

  return (
    //Sets up the renderActions button on the input toolbar
    <TouchableOpacity 
      style={styles.container}
      onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTestStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions