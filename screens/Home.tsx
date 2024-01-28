import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { Alert, Linking, Platform } from 'react-native';
import { useFocusEffect, useNavigation} from '@react-navigation/native';

// alert message to request the user permission
const CameraPermissionAlert = () => {
  const title:string = "Permission Required"
  const message:string = "Camera Permission is required for the app to function."
  const buttons = [
    {text: 'Cancel', onPress: () => {

    }},
    {text: 'OK', onPress: () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
    }},
  ]

  Alert.alert(title, message, buttons)
};

// if no camera device is found render this function instead
const NoCameraDeviceError = () => {
  return (
    <View style={ styles.content }>
      <Text> Camera Not Found </Text>
    </View>
  )
};

// Main home screen with camera view
const Home = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const navigation = useNavigation();
  const format = useCameraFormat(device, [
    { photoResolution: { width: 512, height: 512 } },
  ]);

  const [screenFlash, setScreenFlash]  = useState(0);

  useFocusEffect(() => {
    if(!hasPermission) {
      requestPermission()
      if(!hasPermission) {
        CameraPermissionAlert();
      }
    }
  })

  if (device == null) 
    return <NoCameraDeviceError />;

  const captureImage = async () => {
    if(camera.current != null) {
      setScreenFlash(0.5);
      const photo = await camera.current.takePhoto();
      setScreenFlash(0);
      // photo is taken and stored photo const
      // now send the picture to info screen
      navigation.navigate("Info", { image: photo });
    }
  }  

  return (
      <View style={styles.content}>        
        <Camera ref={ camera } format={format} style={styles.camera} device={device} photo={true} isActive={true} />
        <View style={ styles.optionsBar } >
          <TouchableOpacity onPress={() => {}} >
            <Icon name="images" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={ captureImage } >
            <Icon name="circle" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} >
            <Icon name="gear" size={30} color="#000" />
          </TouchableOpacity>
        </View>
         {/* flash on screen when taking a picture */}
        <View style={{ ...styles.flashScreen, opacity: screenFlash }} />
      </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  optionsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems:'center'
  },
  flashScreen: {
    position: 'absolute',
    top: 0,
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  }
});

export default Home;
