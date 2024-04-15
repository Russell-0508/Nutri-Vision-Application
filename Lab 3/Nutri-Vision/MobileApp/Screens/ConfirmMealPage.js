import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Modal, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { saveMealToFirestore } from '../../MealHistory';
import { useNavigation } from '@react-navigation/native';


function ConfirmMealPage({ navigation, route }) {
  const { content } = route.params;
  const { base64Image } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientMass, setIngredientMass] = useState('');

  const [selectedIngredient, setSelectedIngredient] = useState(null);

  //parse ingredient string and return array of ingredient objects
  const parseIngredients = (ingredientString) => {
    // Split the string into individual ingredients based on " and "
    const ingredientParts = ingredientString.split(', ');

    // Map over each part, extracting the portion and name, and return an array of objects
    return ingredientParts.map((part, index) => {
      const [portion, ...nameParts] = part.split(' ');
      const name = nameParts.join(' ');
      return { id: String(index + 1), name, portion };
    });
  };

  const [ingredients, setIngredients] = useState(parseIngredients(content));
  console.log(content);

  const IngredientSeparator = () => (
    <View style={{
      height: 1,
      backgroundColor: 'grey',
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 60, // Adjust this value to control the starting point
      marginRight: 100, // Adjust this value to control the ending point
    }} />
  );


  //Function to add ingredient  name and mass to the existing ingredients list 
  const handleAddIngredient = () => {
    console.log("Add button pressed with ingredient name:", ingredientName, "and mass:", ingredientMass);
    const newIngredient = {
      id: new Date().getTime().toString(),
      name: ingredientName,
      portion: ingredientMass + 'g',
    };
    setIngredients(currentIngredients => [...currentIngredients, newIngredient]);
    setIngredientName('');
    setIngredientMass('');
    setIsModalVisible(false);
  };

  //Function to handle the update and deletion of ingredient list entries 
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

  //Function to handle the updating of ingredient's name and mass 
  const handleUpdateIngredient = () => {
    const updatedIngredients = ingredients.map(ing => {
      if (ing.id === selectedIngredient.id) {
        return { ...ing, name: ingredientName, portion: ingredientMass + 'g' };
      }
      return ing;
    });
    setIngredients(updatedIngredients);
    console.log("Update button pressed with ingredient name:", ingredientName, "and mass:", ingredientMass);
    setSelectedIngredient(null);
  };

  //Function to delete the ingredient entry from ingredients list 
  const handleDeleteIngredient = () => {
    const filteredIngredients = ingredients.filter(ing => ing.id !== selectedIngredient.id);
    setIngredients(filteredIngredients);
    setSelectedIngredient(null);
  };


  const renderIngredientItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.ingredientItem}>
        <Text style={styles.ingredientName}>{item.name}</Text>
        <Text style={styles.ingredientPortion}>{item.portion}</Text>
      </View>
    </TouchableOpacity >
  );


  const AddIngredientButton = () => (
    <View>
      {/* Add a separator view at the top of the footer component */}
      <IngredientSeparator />
      <TouchableOpacity style={styles.addIngredientButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addIngredientText}>Add Ingredients</Text>
        <MaterialIcons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <IngredientSeparator />
    </View>
  );

  //When 'Confirm Meal' button is pressed, it navigates to Nutritional Info Page and passes the ingredients list entries and the image of the food as base64Image
  const handleConfirmMeal = () => {
    const query = ingredients.map(ingredient => `${ingredient.portion} ${ingredient.name}`).join(' , ');
    navigation.navigate('Nutritional Info', { ingredients: query, base64Image });
  };

  const ConfirmMealButton = () => (
    <TouchableOpacity style={styles.confirmMealButton} onPress={handleConfirmMeal}>
      <Text style={styles.confirmMealText}>Confirm Meal</Text>
    </TouchableOpacity>
  );

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
      <View style={styles.nutritionalInfoContainer}>
        <Text style={styles.ingredientsHeaderText}>Ingredients</Text>
        <FlatList
          data={ingredients}
          renderItem={renderIngredientItem}
          keyExtractor={item => item.id}
          ListFooterComponent={AddIngredientButton}
          ItemSeparatorComponent={IngredientSeparator} // Add this line
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
    marginLeft: 0,
    marginRight: 50,
  },
  addIngredientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginLeft: 65,
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

export default ConfirmMealPage;