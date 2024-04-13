import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Platform } from 'react-native';
import { saveMealToFirestore, getFavouriteMealEntries } from '../../MealHistory';

import { useNavigation } from '@react-navigation/native';
import SearchBar from '../Components/SearchBar';

function FavouritesPage() {
  const navigation = useNavigation();
  // Placeholder image URI
  const headerImageUri = 'https://via.placeholder.com/150'; // Update this to your desired image URL

  // Simulate a dynamic list of images
  const images = new Array(8).fill(headerImageUri); // Example: 8 images. Adjust the number as needed.

  const [favoriteMealEntries, setFavoriteMealEntries] = useState([]);
  const [filteredEntires, setFilteredEntries] = useState([]);

  // Determine if the number of entries is odd
  const isOddNumberOfEntries = favoriteMealEntries.length % 2 !== 0;

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    console.log('Current favorites:', favoriteMealEntries);
    console.log('Current filtered entries:', filteredEntires);
  }, [favoriteMealEntries, filteredEntires]);

    // Fetch favorite meal entries
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavouriteMealEntries(); // Fetch favorite meal entries
        setFavoriteMealEntries(favorites); // Update state with the fetched entries
        setFilteredEntries(favorites);
      } catch (error) {
        console.error('Error fetching favorite meal entries:', error);
      }
    };

  const handlePress = (documentId) => {
    navigation.navigate('IndividualMeal', { documentId });
    console.log('Navigating to documentId:', documentId);
  };

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
    flexWrap: 'wrap', // Allows items to wrap to the next line
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 2 - 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%', // Use the full width of the container
    height: 150, // Set a fixed height for the images
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