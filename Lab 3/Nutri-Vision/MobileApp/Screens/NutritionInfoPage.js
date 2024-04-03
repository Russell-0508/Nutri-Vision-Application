import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Modal, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { saveMealToFirestore } from '../../MealHistory';
import { useNavigation } from '@react-navigation/native';


function NutritionalInfoPage({ navigation }) {
  // State to hold the image URI
  const [imageUri, setImageUri] = useState(null); // Initial state is null

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientMass, setIngredientMass] = useState('');

  const [selectedIngredient, setSelectedIngredient] = useState(null);


  // Placeholder image URI
  const placeholderImageUri = 'https://via.placeholder.com/150'; // Placeholder URL



  // Placeholder ingredients
  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Rice', portion: '200g', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Chicken', portion: '150g', imageUrl: 'https://via.placeholder.com/150' },
  ]);



  const handleAddIngredient = () => {
    console.log("Add button pressed with ingredient name:", ingredientName, "and mass:", ingredientMass);
    const newIngredient = {
      id: new Date().getTime().toString(),
      name: ingredientName,
      portion: ingredientMass + 'g',
      imageUrl: 'https://via.placeholder.com/150',
    };
    setIngredients(currentIngredients => [...currentIngredients, newIngredient]);
    setIngredientName('');
    setIngredientMass('');
    setIsModalVisible(false);
  };


  const EditIngredientModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selectedIngredient !== null}
      onRequestClose={() => setSelectedIngredient(null)}
    >
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setSelectedIngredient(null)}
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Ingredient Name"
          style={styles.textInput}
          onChangeText={(text) => setIngredientName(text)}
          value={ingredientName}
        />
        <TextInput
          placeholder="Mass (g)"
          style={styles.textInput}
          onChangeText={(text) => setIngredientMass(text)}
          value={ingredientMass}
          keyboardType="numeric"
        />
        <Button title="Update" onPress={handleUpdateIngredient} />
        <Button title="Delete" onPress={handleDeleteIngredient} color="red" />
      </View>
    </Modal>
  );


  // Placeholder function for button presses
  const handlePress = (item) => {
    setSelectedIngredient(item);
    setIngredientName(item.name);
    setIngredientMass(item.portion.replace('g', '')); // Assuming 'portion' is always in grams
  };

  const handleUpdateIngredient = () => {
    const updatedIngredients = ingredients.map(ing => {
      if (ing.id === selectedIngredient.id) {
        return { ...ing, name: ingredientName, portion: ingredientMass + 'g' };
      }
      return ing;
    });
    setIngredients(updatedIngredients);
    setSelectedIngredient(null);
  };

  const handleDeleteIngredient = () => {
    const filteredIngredients = ingredients.filter(ing => ing.id !== selectedIngredient.id);
    setIngredients(filteredIngredients);
    setSelectedIngredient(null);
  };


  const renderIngredientItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.ingredientItem}>
        <Image
          source={{ uri: item.imageUrl || placeholderImageUri }}
          style={styles.ingredientImage}
        />
        <Text style={styles.ingredientName}>{item.name}</Text>
        <Text style={styles.ingredientPortion}>{item.portion}</Text>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );


  const AddIngredientButton = () => (
    <View>
      <TouchableOpacity style={styles.addIngredientButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addIngredientText}>Add Ingredients</Text>
        <MaterialIcons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );

  const handleConfirmMeal = () => {
    const query = ingredients.map(ingredient => `${ingredient.portion} ${ingredient.name}`).join(' , ');
    navigation.navigate('Confirm Meal', { ingredients: query });
  };

  const ConfirmMealButton = () => (
    <TouchableOpacity style={styles.confirmMealButton} onPress={handleConfirmMeal}>
      <Text style={styles.confirmMealText}>Confirm Meal</Text>
    </TouchableOpacity>
  );

  // State for heart button
  const [isHeartActive, setIsHeartActive] = useState(false);

  // Toggle heart state
  const toggleHeart = () => {
    setIsHeartActive(!isHeartActive); // Toggle between true and false
  };

  // Placeholder mass and calories 
  const foodItemMass = "250g";
  const foodItemCalories = "450 Calories";

  return (
    <SafeAreaView style={styles.safeArea}>
      <EditIngredientModal />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Ingredient Name"
            style={styles.textInput}
            onChangeText={setIngredientName}
            value={ingredientName}
          />
          <TextInput
            placeholder="Mass (g)"
            style={styles.textInput}
            onChangeText={setIngredientMass}
            keyboardType="numeric"
            value={ingredientMass}
          />
          <Button title="Add" onPress={handleAddIngredient} />
        </View>
      </Modal>
      <StatusBar backgroundColor="rgba(173, 219, 199, 1)" barStyle="light-content" />
      <View style={styles.imageContainer}>
        {/* Image placeholder */}
        <Image
          source={{ uri: imageUri || placeholderImageUri }}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.nutritionalInfoContainer}>
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
  modalView: {
    marginTop: 200,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
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
    textAlign: 'auto',
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