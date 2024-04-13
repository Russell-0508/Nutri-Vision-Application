import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getMealEntryById, updateMealDataInFirestore } from '../../MealHistory';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import { documentId } from '@firebase/firestore';


function IndividualMeal({ route }) {

  // This will read the data passed from the navigate function in the HistoryPage.js
  const { documentId } = route.params;

  const [mealEntry, setMealEntry] = useState(null);

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

  const [calories, setCalories] = useState('Loading...');
  const [carbohydrates, setCarbohydrates] = useState('Loading...');
  const [protein, setProtein] = useState('Loading...');
  const [totalFat, setTotalFat] = useState('Loading...');

  // For toggling favourites 
  const [isFavorite, setIsFavorite] = useState(false);
  // State for heart button color
  const [heartColor, setHeartColor] = useState("black");

  const fetchNutritionalInfo = async (documentId) => {
    try {
      if (!documentId) {
        throw new Error('Document ID is missing.');
      }

      const mealEntry = await getMealEntryById(documentId);
      console.log('Fetched meal entry:', mealEntry); // Log the fetched data

      setMealEntry(mealEntry);
      setIsFavorite(mealEntry.favourite); // Set isFavorite state based on fetched data
      setHeartColor(mealEntry.favourite ? "red" : "black"); // Set heart color based on fetched data
      const attributesToDisplay = ['calories', 'carbohydrates', 'cholesterol', 'fiber', 'protein', 'saturatedFat', 'sodium', 'sugar', 'totalFat','picture'];
      attributesToDisplay.forEach(attribute => {
        if (mealEntry[attribute] !== 0) {
          switch (attribute) {
            case 'calories':
              setCalories(mealEntry[attribute]);
              break;
            case 'carbohydrates':
              setCarbohydrates(mealEntry[attribute]);
              break;
            case 'protein':
              setProtein(mealEntry[attribute]);
              break;
            case 'totalFat':
              setTotalFat(mealEntry[attribute]);
              break;
            case 'picture':
              setImageUri(mealEntry[attribute]);
            default:
              break;
          }
        }
      });

    } catch (error) {
      console.error('Error fetching nutritional info:', error);
    }
  };

  // Trigger the API call on component mount and when route parameters change
  useEffect(() => {
    if (documentId) {
      fetchNutritionalInfo(documentId);
    }
  }, [documentId]); // Empty dependency array to run only on component mount

  // Update favourites attribute in database when heart icon is pressed
  const toggleFavorite = async () => {
    try {
      // Toggle the favorite status locally
      setIsFavorite(!isFavorite);

      // Update the database to reflect the change
      updateMealDataInFirestore(documentId, { favourite: !isFavorite });
      setHeartColor(!isFavorite ? "red" : "black");
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      // Handle error
    }
  };

  // Placeholder function for button presses
  const handlePress = (action) => {
    console.log(`Pressed ${action}`);
  };

  const [carbsPercentage, setCarbsPercentage] = useState(60); // Example percentage
  const [fatsPercentage, setFatsPercentage] = useState(55); // Example percentage
  const [proteinPercentage, setProteinPercentage] = useState(25); // Example percentage


  const ProgressCircle = ({ percentage, fillColor, label, value }) => {
    const size = 75; // Diameter of the circle
    const strokeWidth = 5; // Width of the circle border
    const radius = (size / 2) - (strokeWidth * 2); // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={{ alignItems: 'center', margin: 10, position: 'relative' }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            stroke="#ddd"
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
        {/* Percentage Text with absolute positioning */}
        <Text style={{
            position: 'absolute',
            fontWeight: 'bold',
            fontSize: 14, // Adjust the font size as needed
            left: '55%',
            top: '35%',
            transform: [{ translateX: -size * 0.2 }, { translateY: -size * 0.1 }],
        }}>
            {percentage}%
        </Text>
        {/* Label and Value Text */}
        <Text style={{ fontWeight: 'bold', marginTop: 4 }}>{label}</Text>
      </View>
    );
};



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <StatusBar backgroundColor="rgba(173, 219, 199, 1)" barStyle="light-content" />
        <View style={styles.imageContainer}>
          {/* Image placeholder */}
          <Image
          source={{ uri: `data:image/png;base64,${imageUri}` || placeholderImageUri }}
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
              color={heartColor} // Change color based on state
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nutritionalInfoContainer}>
          <Text style={styles.nutritionalInfoContainerText}>{mealEntry && mealEntry.name}</Text>
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
              <Text style={styles.labelText}>Total Fat:</Text>
              <Text style={styles.valueText}>{totalFat}</Text>
            </View>
          </View>
          {/* Nutritional information progress circles */}
          <View style={styles.progressCirclesContainer}>
            <ProgressCircle percentage={carbsPercentage} fillColor="brown" label="Carbohydrates" value={carbohydrates} />
            <ProgressCircle percentage={fatsPercentage} fillColor="yellow" label="Fats" value={totalFat} />
            <ProgressCircle percentage={proteinPercentage} fillColor="blue" label="Proteins" value={protein} />
          </View>

        </View>
      </ScrollView>
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
    padding: 10,
    paddingBottom: 160,
    marginTop: 10,
    marginBottom: 100,
    flex: 1,
    justifyContent: 'flex-start',
  },
  nutritionalInfoContainerText: {
    color: 'rgb(127, 127, 127)',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    justifyContent: 'flex-start',
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
    marginRight: 30,
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
    marginTop: 80,
    marginRight: 20,
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


  confirmMealText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

});

export default IndividualMeal;