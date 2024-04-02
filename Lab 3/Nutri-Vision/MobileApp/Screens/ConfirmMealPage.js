import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { saveMealToFirestore, updateMealDataInFirestore } from '../../MealHistory';
import { fetchNutritionalInfo } from '../../CalorieNinjaAPI';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';


function ConfirmMealPage({ route, navigation }) {
  // State to hold the image URI
  const [imageUri, setImageUri] = useState(null); // Initial state is null


  // Placeholder image URI
  const placeholderImageUri = 'https://via.placeholder.com/150'; // Placeholder URL

  // State variables for nutritional information
  const [calories, setCalories] = useState('Loading...');
  const [carbohydrates, setCarbohydrates] = useState('Loading...');
  const [fats, setFats] = useState('Loading...');
  const [protein, setProtein] = useState('Loading...');
  const [mealName, setMealName] = useState(null);
  const [mealId, setMealId] = useState(null);

  const { ingredients } = route.params;

  useEffect(() => {
    console.log("Received ingredients:", ingredients);

    fetchNutritionalInfo(ingredients)
      .then(data => {
        let totalCalories = 0;
        let totalCarbohydrates = 0;
        let totalFats = 0;
        let totalProtein = 0;
        let ingredientNames = [];

        // Iterate through each item in the API response
        data.items.forEach(item => {
          // Sum the nutritional values 
          totalCalories += item.calories;
          totalCarbohydrates += item.carbohydrates_total_g;
          totalFats += item.fat_total_g;
          totalProtein += item.protein_g;

          ingredientNames.push(item.name);
        });

        // Round the total nutritional values to whole numbers
        totalCalories = Math.round(totalCalories);
        totalCarbohydrates = Math.round(totalCarbohydrates);
        totalFats = Math.round(totalFats);
        totalProtein = Math.round(totalProtein);

        // Set values to display
        const mealName = ingredientNames.join(' , ');
        setMealName(mealName);
        setCalories(totalCalories);
        setCarbohydrates(totalCarbohydrates);
        setFats(totalFats);
        setProtein(totalProtein);

        // Prepare the meal data
        const mealData = {
          name: mealName, // You can set a default name for the combined meal
          calories: totalCalories,
          carbohydrates: totalCarbohydrates,
          totalFat: totalFats,
          protein: totalProtein,
          createdAt: new Date(),
          favourite: false,
        };

        // Save the combined meal data to Firestore
        saveMealToFirestore(mealData)
          .then(mealId => {
            setMealId(mealId);
            console.log('Combined meal saved with ID:', mealId);
          })
          .catch(error => console.error('Error saving combined meal:', error));
      })
      .catch(error => console.error('Error fetching nutritional info:', error));
  }, [ingredients]); // Make sure to include 'ingredients' in the dependency array


  // For toggling favourites 
  const [isFavorite, setIsFavorite] = useState(false);
  // State for heart button color
  const [heartColor, setHeartColor] = useState("black");

  // Update favourites attribute in database when heart icon is pressed
  const toggleFavorite = async () => {
    try {
      // Toggle the favorite status locally
      setIsFavorite(!isFavorite);

      // Update the database to reflect the change
      updateMealDataInFirestore(mealId, { favourite: !isFavorite });
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

  const ConfirmMealButton = () => (
    <TouchableOpacity style={styles.confirmMealButton} onPress={() => navigation.navigate('Tabs')}>
      <Text style={styles.confirmMealText}>It fits your target!</Text>
    </TouchableOpacity>
  );

  const [carbsPercentage, setCarbsPercentage] = useState(70); // Example percentage
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
            color={heartColor} // Change color based on state
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nutritionalInfoContainer}>
        <Text style={styles.nutritionalInfoContainerText}>{mealName}</Text>
        {/* Mass and Calories with Icons */}
        <View style={styles.nutritionalDetailsContainer}>
          <MaterialIcons name="local-fire-department" size={20} color="rgb(127, 127, 127)" />
          <Text style={styles.nutritionalDetailsText}>{calories}</Text>
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
            <Text style={styles.labelText}>Fats:</Text>
            <Text style={styles.valueText}>{fats}</Text>
          </View>
          <View style={styles.nutritionalInfoRow}>
            <Text style={styles.labelText}>Protein:</Text>
            <Text style={styles.valueText}>{protein}</Text>
          </View>
        </View>
        {/* Nutritional information progress circles */}
        <View style={styles.progressCirclesContainer}>
          <ProgressCircle percentage={carbsPercentage} fillColor="brown" label="Carbohydrates" />
          <ProgressCircle percentage={fatsPercentage} fillColor="yellow" label="Fats" />
          <ProgressCircle percentage={proteinPercentage} fillColor="blue" label="Proteins" />
        </View>
        <ConfirmMealButton />
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
    textAlign: 'auto',
    margin: 16,
  },
  nutritionalDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'auto',
    marginTop: 8,
    marginLeft: 250,
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

  confirmMealButton: {
    backgroundColor: 'rgb(96, 190, 61)',
    borderRadius: 20,
    paddingVertical: 20,
    marginVertical: 10,
    marginRight: 70,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmMealText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

});

export default ConfirmMealPage;