import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


<MaterialIcons name="photo-library" size={30} color="black" />

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraRef = useRef(null); // Reference to the camera

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
      
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  // Dummy data for the food item name and calorie count
  const foodItem = "Fried Rice with Chicken";
  const calorieCount = "120 Calories 10 Min";

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
      // You can do something with the photo taken here, like setting it to state or saving it
    }
  };

  if (hasPermission === null || galleryPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (galleryPermission === false) {
    return <Text>No access to gallery</Text>;
  }

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const cameraSize = windowWidth + 70; //camera size
  const topOffset = (windowHeight - cameraSize) / 2;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={[styles.camera, { top: topOffset, height: cameraSize, width: windowWidth }]} type={type}>
        {/*camera overlay components like buttons, they can be added here */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialIcons name="camera" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      {/* Text and arrow button for the food item name and calorie count */}
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.foodItemText}>{foodItem}</Text>
          <TouchableOpacity onPress={() => {/* handle the press event */}}>
            <MaterialIcons name="keyboard-arrow-right" size={60} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.calorieCountText}>{calorieCount}</Text>
      </View>

      {/* Gallery button*/}
      <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
        <MaterialIcons name="photo-library" size={40} color="white" />
      </TouchableOpacity>

      {/* Overlay view, add scanner label, close button, and other UI components here */}
      <View style={styles.overlay}>
        <Text style={styles.scannerLabelText}>Scanner</Text>
        <Button title="Flip Image" onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }} />
        {/* Add more buttons or information here */}
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    left: 0,
    right: 10,
    bottom: 40,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  captureButton: {
    alignSelf: 'center', // Center the button horizontally in the container
    backgroundColor: '#424242', //grey
    borderRadius: 50,
    padding: 15,
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 225,
    bottom: 670,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scannerLabelText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },

  infoContainer: {
    position: 'absolute',
    alignSelf: 'center', // Center the container horizontally
    bottom: 120, // Adjust this value as needed to position the text above the gallery button
    alignItems: 'center', // Center the text vertically within the container
  },
  foodItemText: {
    color: 'black',
    fontSize: 20, 
    fontWeight: 'bold',
    marginTop:-15,
  },
  calorieCountText: {
    color: 'grey',
    fontSize: 16, 
    marginTop: -20, 
    marginRight:50,
  },

  arrowButton: {
    padding: 8,
  },

  galleryButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
  },
});

function handleArrowPress() {
  // Handle the arrow button press event
}