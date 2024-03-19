import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { saveMealToFirestore } from '../../MealHistory';
import { useNavigation } from '@react-navigation/native';


function NutritionalInfoPage({ navigation }) {
  // State to hold the image URI
  const [imageUri, setImageUri] = useState(null); // Initial state is null

  // Placeholder image URI
  const placeholderImageUri = 'https://via.placeholder.com/150'; // Placeholder URL


  // Placeholder ingredients
  const ingredients = [
    { id: '1', name: 'Rice', portion: '200g', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Chicken', portion: '150g', imageUrl: 'https://via.placeholder.com/150' },
  ];

  // Placeholder function for button presses
  const handlePress = (action) => {
    console.log(`Pressed ${action}`);
  };

  const renderIngredientItem = ({ item }) => (
    <View>
      <View style={styles.ingredientItem}>
        <Image
          source={{ uri: item.imageUrl || placeholderImageUri }} // Fallback to the placeholder URI
          style={styles.ingredientImage}
        />
        <Text style={styles.ingredientName}>{item.name}</Text>
        <Text style={styles.ingredientPortion}>{item.portion}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );

  const AddIngredientButton = () => (
    <View>
      <TouchableOpacity style={styles.addIngredientButton} onPress={() => handlePress('Add Ingredient')}>
        <Text style={styles.addIngredientText}>Add Ingredients</Text>
        <MaterialIcons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );

  const handleConfirmMeal = async () => {
    // Prepare the meal data based on your requirements
    const mealData = {
      name: 'Fried Rice with Chicken',
      calories: 500, // Example value, replace with actual value
      carbohydrates: 50, // Example value, replace with actual value
      cholesterol: 30, // Example value, replace with actual value
      createdAt: new Date(), // Current timestamp
      fiber: 10, // Example value, replace with actual value
      protein: 30, // Example value, replace with actual value
      saturatedFat: 5, // Example value, replace with actual value
      servingSize: 1, // Example value, replace with actual value
      sodium: 20, // Example value, replace with actual value
      sugar: 15, // Example value, replace with actual value
      totalFat: 15, // Example value, replace with actual value
      type: 'lunch', // Example value, replace with actual value
    };

    try {
      // Save the meal data to Firebase
      const mealId = await saveMealToFirestore(mealData);

      // perform additional actions after the meal is saved
      console.log('Meal confirmed and saved with ID:', mealId);

    } catch (error) {
      console.error('Error confirming meal:', error);
      // Handle the error as needed
    }
  };

  const ConfirmMealButton = () => (
    <TouchableOpacity style={styles.confirmMealButton} onPress={handleButtonPress}>
      <Text style={styles.confirmMealText}>Confirm Meal</Text>
    </TouchableOpacity>
  );

  // State for heart button
  const [isHeartActive, setIsHeartActive] = useState(false);

  // Toggle heart state
  const toggleHeart = () => {
    setIsHeartActive(!isHeartActive); // Toggle between true and false
  };

  const handleButtonPress = async () => {
    await handleConfirmMeal(); // Wait for the meal to be confirmed
    navigation.navigate('ConfirmMealPage'); // Navigate after confirmation
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
        <TouchableOpacity style={styles.heartButton} onPress={toggleHeart}>
          <MaterialIcons
            name={isHeartActive ? "favorite" : "favorite-border"} // Change icon based on state
            size={30}
            color={isHeartActive ? "red" : "black"} // Change color based on state
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nutritionalInfoContainer}>
        <Text style={styles.nutritionalInfoContainerText}>Fried Rice with Chicken</Text>
        {/* Mass and Calories with Icons */}
        <View style={styles.nutritionalDetailsContainer}>
          <MaterialIcons name="fitness-center" size={20} color="rgb(127, 127, 127)" />
          <Text style={styles.nutritionalDetailsText}> 350g    </Text>
          <MaterialIcons name="local-fire-department" size={20} color="rgb(127, 127, 127)" />
          <Text style={styles.nutritionalDetailsText}> 550 kcal</Text>
        </View>
        <Text style={styles.ingredientsHeaderText}>Ingredients</Text>
        <FlatList
          data={ingredients}
          renderItem={renderIngredientItem}
          keyExtractor={item => item.id}
          ListFooterComponent={AddIngredientButton}
          style={styles.ingredientsList}
        />
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
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 150,
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
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    marginLeft: 50,
  },
  ingredientName: {
    fontSize: 16,
    color: 'rgb(127, 127, 127)',
    marginLeft: 80,
  },
  ingredientPortion: {
    fontSize: 16,
    color: 'rgb(127, 127, 127)',
    marginRight: 100,
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
    alignSelf: 'stretch',
    marginTop: 8,
    marginLeft: 40,
    marginRight: 90,
  },
  addIngredientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginLeft: 40,
  },
  addIngredientText: {
    fontSize: 16,
    color: 'black',
    marginRight: 150,
  },
  confirmMealButton: {
    backgroundColor: 'grey',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 40,
    marginRight: 90,
    marginBottom: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmMealText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },



});

export default NutritionalInfoPage;