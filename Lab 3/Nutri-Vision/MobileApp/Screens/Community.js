import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommunityScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const posts = [
      {
        id: 1,
        title: 'Pancake',
        imageUri: require('../assets/images/ChickenRice.jpg'),
        duration: '>60 mins',
        profile: {
          name: 'Russell',
          imageUri: require('../assets/images/Man1.png'),
        },
      },
      // ...more posts
    ];
  
    return (
      <ScrollView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="search" size={24} color="#000" />
        </View>
  
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Image
                source={post.profile.imageUri}
                style={styles.profileImage}
              />
              <Image
                source={post.imageUri}
                style={styles.foodImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.duration}>{post.duration}</Text>
              </View>
              <TouchableOpacity style={styles.likeButton}>
                <Icon name="heart-o" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.profileName}>{post.profile.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    searchBarContainer: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      borderRadius: 20,
      margin: 10,
    },
    searchInput: {
      flex: 1,
      padding: 10,
      fontSize: 16,
      color: '#000',
    },
    postsContainer: {
      padding: 10,
    },
    postCard: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 15,
      marginBottom: 20,
      alignItems: 'center',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    foodImage: {
      width: '100%',
      height: 200,
      borderRadius: 15,
      marginVertical: 10,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    duration: {
      fontSize: 14,
    },
    likeButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    profileName: {
      fontSize: 16,
    },
  });
  
  export default CommunityScreen;