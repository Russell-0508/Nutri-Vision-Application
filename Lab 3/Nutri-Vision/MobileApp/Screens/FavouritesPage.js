import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Platform } from 'react-native';
import { saveMealToFirestore, getFavouriteMealEntries } from '../../MealHistory';

import { useNavigation } from '@react-navigation/native';
import SearchBar from '../Components/SearchBar';

function FavouritesPage() {
  const navigation = useNavigation();
  // Placeholder image URI
  const headerImageUri = 'https://via.placeholder.com/150'; 

  //Function to simulate a dynamic list of images
  const images = new Array(8).fill(headerImageUri); 

  //Function to set favourite and filtered entries
  const [favoriteMealEntries, setFavoriteMealEntries] = useState([]);
  const [filteredEntires, setFilteredEntries] = useState([]);

  //Function to determine if the number of entries is odd
  const isOddNumberOfEntries = favoriteMealEntries.length % 2 !== 0;

  useEffect(() => {
    fetchFavorites();
  }, []);

//Function to log favourites and filtered entries
  useEffect(() => {
    console.log('Current favorites:', favoriteMealEntries);
    console.log('Current filtered entries:', filteredEntires);
  }, [favoriteMealEntries, filteredEntires]);

    // Fetch favorite meal entries from Firebase  
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavouriteMealEntries(); 
        setFavoriteMealEntries(favorites); // Update state with the fetched entries
        setFilteredEntries(favorites);
      } catch (error) {
        console.error('Error fetching favorite meal entries:', error);
      }
    };

  //Clicking on feach favourite meal entry leads to Individual Meal page which displays the macro nutrients of the specific meal by its documentId
  const handlePress = (documentId) => {
    navigation.navigate('IndividualMeal', { documentId });
    console.log('Navigating to documentId:', documentId);
  };

  //Function to handle search
  const handleSearch = (query) => {
    const filtered = favoriteMealEntries.filter(entry => entry.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredEntries(filtered);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(173, 219, 199, 1)' }}>
      <SearchBar onSearch={handleSearch} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.gridContainer}>
          {filteredEntires.map((entry, index) => (
            <TouchableOpacity
              key={`meal-${index}`}
              style={styles.imageContainer}
              onPress={() => handlePress(entry.id)}
            >
              <Image source={{ uri: `data:image/png;base64,${entry.picture}` }} style={styles.image} resizeMode="contain" />
              <Text style={styles.imageText}>{entry.name}</Text>
            </TouchableOpacity>
          ))}
          {/* Conditionally render an invisible view to align the last item to the left if odd number of entries */}
          {isOddNumberOfEntries && <View style={styles.imageContainer} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}






const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(173, 219, 199, 1)',
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 2 - 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%', 
    height: 150, 
  },
  imageText: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default FavouritesPage;