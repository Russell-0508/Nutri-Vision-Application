import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

<MaterialIcons name="photo-library" size={30} color="black" />

function ScannerPage({ navigation }) {
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
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log(photo.uri);
  
        // Convert the captured image to base64
        const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        console.log('Base64 image:', base64Image);
  
        // Navigate to Confirm Meal page and pass the base64 encoded image
        navigation.navigate('Confirm Meal', { base64Image });
      } catch (error) {
        console.error('Error taking picture:', error);
      }
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
  const cameraSize = windowWidth + 190; //camera size
  const topOffset = (windowHeight - cameraSize) / 2;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("ImagePicker Result:", result);

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      console.log("Image URI:", selectedImageUri);

      try {
        // Convert the captured image to base64
        const base64Image = await FileSystem.readAsStringAsync(selectedImageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // console.log("Base64 Image:", base64Image);

        // Navigate to Confirm Meal page and pass the base64 encoded image
        console.log("Navigating to Confirm Meal page...");
        navigation.navigate('Confirm Meal', { base64Image });
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={[styles.camera, { top: topOffset, height: cameraSize, width: windowWidth }]} type={type}>
        {/*camera overlay components like buttons, they can be added here */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialIcons name="camera" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      {/* Text and arrow button for the food item name and calorie count */}
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.foodItemText}>{foodItem}Hello</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Confirm Meal')} style={styles.arrowButton}>
            <MaterialIcons name="keyboard-arrow-right" size={60} color="pink" />
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
        <Text style={styles.scannerLabelText}></Text>
        <Button title="Flip Image" onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }} />
        {/* Add more buttons or information here */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 120,
  },
  camera: {
    position: 'absolute',
    left: 0,
    right: 10,
    bottom: 80,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 10,
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
    top: 0,
    left: 0,
    right: 290,
    bottom: 560,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoContainer: {
    position: 'absolute',
    alignSelf: 'center', // Center the container horizontally
    bottom: -70, // Adjust this value as needed to position the text above the gallery button
    alignItems: 'center', // Center the text vertically within the container
    right: 20,
    width: '85%',

  },
  foodItemText: {
    color: 'pink',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 0,
  },
  calorieCountText: {
    color: 'grey',
    fontSize: 16,
    marginTop: -30,
    marginRight: 80,
  },

  arrowButton: {
    padding: 20,
  },

  galleryButton: {
    position: 'absolute',
    right: 20,
    bottom: -110,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
  },
});

function handleArrowPress() {
  // Handle the arrow button press event
}

export default ScannerPage;