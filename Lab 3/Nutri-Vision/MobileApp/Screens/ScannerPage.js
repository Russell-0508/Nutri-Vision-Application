import React, { useState, useEffect, useRef } from 'react';
import Alert from 'react-native';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

//API orchestration imports
import { sendImageToAPI } from '../../GPT4API';
import { fetchNutritionalInfo } from '../../CalorieNinjaAPI';

<MaterialIcons name="photo-library" size={30} color="black" />

//extract content from JSON, json traversal doesnt work for some reason
function extractContent(inputString) {
  // Define a regex to search for "content":" followed by any text until the next quote
  const regex = /"content":"(.*?)"/;

  // Use the regex to search the input string
  const match = inputString.match(regex);

  // Check if a match was found
  if (match && match[1]) {
    // Return the matched group, which is the content text
    return match[1];
  } else {
    // Return a message or null if no match was found
    return 'Content not found';
  }
}

function containsKeywords(content) {
  //regex keywords
  const pattern = /\b(blur.*|obsfucat.*|cannot|unable|image|contain)\b/i;

  //Test the content
  return pattern.test(content);
}

function ScannerPage({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraRef = useRef(null); // Reference to the camera
  const isFocused = useIsFocused(); // Check if screen is focused

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);


  const takePicture = async () => {
    console.log("Taking picture...");
    // console.log("cameraRef.current:", cameraRef.current);
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();
        console.log("Photo captured: ", photo.uri);

        const resizedImage = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 640, height: 640 } }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );

        console.log('Resized and compressed image:', resizedImage);

        // Convert the captured image to base64
        const base64Image = await FileSystem.readAsStringAsync(resizedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (base64Image) {
          const apiResponse = await sendImageToAPI(base64Image);
          console.log(apiResponse);
          const content = extractContent(apiResponse);
          console.log(content);

          if (containsKeywords(content)) {
            Alert.Alert.alert("Image is blur or has errors. Please rescan.");
          } else {
            //Check if content is blur or needs to be retaken

            // Navigate to Confirm Meal page and pass the ingredients of the API response content
            console.log("Navigating to Confirm Meal page...");
            navigation.navigate('Confirm Meal', { base64Image, content });
            //const ingredientList = await fetchNutritionalInfo(content);
            //console.log(ingredientList);
          }

        } else {
          console.log('No image selected or captured');
        }
        // console.log('Base64 image:', base64Image);



      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
    else {
      console.log("cameraRef is null or undefined");
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
      {isFocused && (
        <Camera ref={ref => {
          cameraRef.current = ref;
        }} style={[styles.camera, { top: topOffset, height: cameraSize, width: windowWidth }]} type={type}>
          {/*camera overlay components like buttons, they can be added here */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <MaterialIcons name="camera" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}

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