import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getMealEntryById, updateMealDataInFirestore } from '../../MealHistory';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import { documentId } from '@firebase/firestore';


function IndividualMeal({ navigation, route }) {

  // This will read the data passed from the navigate function in the HistoryPage.js
  // const { documentId } = route.params;

  const documentId = 'N5YEHKioNBm2xUFdzIVw'; //set documentId to a random entry in firebase first
  // State to hold the image URI
  const [imageUri, setImageUri] = useState(null); // Initial state is null

  // Placeholder image URI
  const placeholderImageUri = 'https://via.placeholder.com/150'; // Placeholder URL

  {/* State variables for nutritional information 
      I think no need to be so detailed,
      some of the stuff can remove, because ultimately
      we will take this data from the API, so we will have to change
      what is displayed according to what kind of nutritional information
      is provided by the API
  */}
  
  const [servingSize, setServingSize] = useState('Loading...');
  const [calories, setCalories] = useState('Loading...');
  const [carbohydrates, setCarbohydrates] = useState('Loading...');
  const [protein, setProtein] = useState('Loading...');
  const [cholesterol, setCholesterol] = useState('Loading...');
  const [fiber, setFiber] = useState('Loading...');
  const [saturatedFat, setSaturatedFat] = useState('Loading...');
  const [sodium, setSodium] = useState('Loading...');
  const [sugar, setSugar] = useState('Loading...');
  const [totalFat, setTotalFat] = useState('Loading...');

  // For toggling favourites 
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchNutritionalInfo = async (documentId) => {
    try {
    
      if (!documentId) {
        throw new Error('Document ID is missing.');
      }

      // Extract nutritional information from the meal document data
      const mealEntry = await getMealEntryById(documentId);
      const attributesToDisplay = ['calories', 'carbohydrates', 'cholesterol', 'fiber', 'protein', 'saturatedFat', 'sodium', 'sugar', 'totalFat'];
      attributesToDisplay.forEach(attribute => {
        if (mealEntry[attribute] !== 0) {
          switch (attribute) {
            case 'calories':
              setCalories(mealEntry[attribute]);
              break;
            case 'carbohydrates':
              setCarbohydrates(mealEntry[attribute]);
              break;
            case 'cholesterol':
              setCholesterol(mealEntry[attribute]);
              break;
            case 'fiber':
              setFiber(mealEntry[attribute]);
              break;
            case 'protein':
              setProtein(mealEntry[attribute]);
              break;
            case 'saturatedFat':
              setSaturatedFat(mealEntry[attribute]);
              break;
            case 'sodium':
              setSodium(mealEntry[attribute]);
              break;
            case 'sugar':
              setSugar(mealEntry[attribute]);
              break;
            case 'totalFat':
              setTotalFat(mealEntry[attribute]);
              break;
            default:
              break;
          }
        }
      });
    } catch (error) {
      console.error('Error fetching nutritional info:', error);
      // Handle error or set default error values here
    }
  };

  // Trigger the API call on component mount and when route parameters change
  useEffect(() => {
    if (documentId) {
      fetchNutritionalInfo(documentId);
    }
  }, []); // Empty dependency array to run only on component mount

  // Update favourites attribute in database when heart icon is pressed
  const toggleFavorite = async () => {
    try {
      // Toggle the favorite status locally
      setIsFavorite(!isFavorite);

      // Update the database to reflect the change
      await updateMealDataInFirestore(documentId, { favourite: !isFavorite });
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      // Handle error
    }
  };

  // State for heart button
  const [isHeartActive, setIsHeartActive] = useState(false);

  // Toggle heart state
  const toggleHeart = () => {
    setIsHeartActive(!isHeartActive); // Toggle between true and false
  };

  // Placeholder function for button presses
  const handlePress = (action) => {
    console.log(`Pressed ${action}`);
  };

  const [carbsPercentage, setCarbsPercentage] = useState(60); // Example percentage
  const [fatsPercentage, setFatsPercentage] = useState(55); // Example percentage
  const [proteinPercentage, setProteinPercentage] = useState(25); // Example percentage


  const ProgressCircle = ({ percentage, fillColor, label }) => {
    const size = 75; // Diameter of the circle
    const strokeWidth = 5; // Width of the circle border
    const radius = (size / 2) - (strokeWidth * 2); // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={{ alignItems: 'center', margin: 10 }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            stroke="#ddd" // This is the color for the "unfilled" part of the circle
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={fillColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          />
        </Svg>
        <Text style={{ position: 'absolute', fontWeight: 'bold', top: size * 0.35 }}>{percentage}%</Text>
        <Text style={{ marginTop: 4, fontWeight: 'bold' }}>{label}</Text>
      </View>
    );
  };


  // Placeholder mass and calories 
  const foodItemMass = "250g";
  const foodItemCalories = "450 Calories";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="rgba(173, 219, 199, 1)" barStyle="light-content" />
      <View style={styles.imageContainer}>
        {/* Image placeholder */}
        <Image
          source={{ uri: imageUri || placeholderImageUri }}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        {/* Three-dot button */}
        <TouchableOpacity style={styles.threeDotButton} onPress={() => handlePress('More')}>
          <MaterialIcons name="more-horiz" size={30} color="black" />
        </TouchableOpacity>
        {/* Heart button */}
        <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"} // Change icon based on state
            size={30}
            color={isFavorite ? "red" : "black"} // Change color based on state
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nutritionalInfoContainer}>
        <Text style={styles.nutritionalInfoContainerText}>Fried Rice with Chicken</Text>
        {/* Mass and Calories with Icons */}
        <View style={styles.nutritionalDetailsContainer}>
          <MaterialIcons name="local-fire-department" size={20} color="rgb(127, 127, 127)" />
          <Text style={styles.nutritionalDetailsText}> {calories} </Text>
        </View>
        {/*Nutritional Information */}
        <Text style={styles.ingredientsHeaderText}>Nutritional Information</Text>
        <View style={styles.innerGreyContainer}>

          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Calories:</Text>
            <Text style={styles.valueText}>{calories}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Carbohydrates:</Text>
            <Text style={styles.valueText}>{carbohydrates}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Protein:</Text>
            <Text style={styles.valueText}>{protein}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Cholesterol:</Text>
            <Text style={styles.valueText}>{cholesterol}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Fiber:</Text>
            <Text style={styles.valueText}>{fiber}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Saturated Fat:</Text>
            <Text style={styles.valueText}>{saturatedFat}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Sodium:</Text>
            <Text style={styles.valueText}>{sodium}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Sugar:</Text>
            <Text style={styles.valueText}>{sugar}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Total Fat:</Text>
            <Text style={styles.valueText}>{totalFat}</Text>
          </View>
        </View>
        {/* Nutritional information progress circles */}
        <View style={styles.progressCirclesContainer}>
          <ProgressCircle percentage={carbsPercentage} fillColor="brown" label="Carbohydrates" />
          <ProgressCircle percentage={fatsPercentage} fillColor="yellow" label="Fats" />
          <ProgressCircle percentage={proteinPercentage} fillColor="blue" label="Proteins" />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(173, 219, 199, 1)',
  },
  imageContainer: {
    backgroundColor: 'rgba(173, 219, 199, 1)',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageStyle: {
    width: 150,
    height: 150,
    marginTop: 30
  },
  threeDotButton: {
    position: 'absolute',
    top: 15,
    right: 30,
  },
  heartButton: {
    position: 'absolute',
    top: 50,
    right: 30,
  },
  nutritionalInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 16,
    margin: -50,
    marginLeft: 0,
    marginTop: 10,
    flex: 1,
    justifyContent: 'flex-start',
  },
  nutritionalInfoContainerText: {
    color: 'rgb(127, 127, 127)',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'flex-start',
    margin: 16,
  },
  nutritionalDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'auto',
    marginTop: 8,
    marginLeft: 250
  },
  nutritionalDetailsText: {
    fontSize: 18,
    color: 'rgb(127, 127, 127)',
  },
  ingredientsHeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 20,
    marginBottom: 8,
  },

  innerGreyContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
    marginRight: 70,
    marginLeft: 20,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  nutritionalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'center',
  },

  // Style for the text of labels
  labelText: {
    fontSize: 20,
    color: 'rgb(0, 0 ,0)',
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
  },

  // Style for the text of values
  valueText: {
    fontSize: 18,
    color: 'rgb(0, 0 , 0)',
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },

  progressCirclesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 50,
  },

  progressCircleContainer: {
    alignItems: 'center', // Center-align the progress circle and label
  },

  progressLabel: {
    marginTop: 8, // Space between the circle and the label text
    fontSize: 14, // Adjust based on your design needs
    color: 'rgb(127, 127, 127)', // Label text color
    fontWeight: 'bold', // Make the label text bold
  },

  progressCircleCarbs: {
    // Placeholder for the progress circle component
    height: 75,
    width: 75,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleFats: {
    // Placeholder for the progress circle component
    height: 75,
    width: 75,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleProtein: {
    // Placeholder for the progress circle component
    height: 75,
    width: 75,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressValue:
  {
    fontWeight: 'bold',
  },


  confirmMealText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

});

export default IndividualMeal;