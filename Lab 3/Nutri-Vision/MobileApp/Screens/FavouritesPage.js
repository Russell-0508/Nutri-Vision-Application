import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar, FlatList, ScrollView, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { saveMealToFirestore, getFavouriteMealEntries } from '../../MealHistory';

import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';




function FavouritesPage({ navigation }) {
  // Placeholder image URI
  const headerImageUri = 'https://via.placeholder.com/150'; // Update this to your desired image URL

  // Simulate a dynamic list of images
  const images = new Array(8).fill(headerImageUri); // Example: 8 images. Adjust the number as needed.

  const handlePress = () => {
    console.log("Placeholder image and text button pressed!");
    navigation.navigate('IndividualMeal');
    // You can navigate to another screen or execute any action here


  };

  const [favoriteMealEntries, setFavoriteMealEntries] = useState([]);

  // Determine if the number of entries is odd
  const isOddNumberOfEntries = favoriteMealEntries.length % 2 !== 0;

  useEffect(() => {
    // Fetch favorite meal entries when the component mounts
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavouriteMealEntries(); // Fetch favorite meal entries
        setFavoriteMealEntries(favorites); // Update state with the fetched entries
      } catch (error) {
        console.error('Error fetching favorite meal entries:', error);
      }
    };

    fetchFavorites();
  }, []); // Empty dependency array ensures this effect runs only once on mount


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(173, 219, 199, 1)' }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.gridContainer}>
          {favoriteMealEntries.map((entry, index) => (
            <TouchableOpacity
              key={`meal-${index}`}
              style={styles.imageContainer}
              onPress={() => handlePress(entry.name)}
            >
              <Image source={{ uri: entry.imageUri }} style={styles.image} resizeMode="contain" />
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