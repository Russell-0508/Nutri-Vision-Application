import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Community = ({ navigation }) => {


    const communityData = [
        {
            id: 1,
            name: 'Calum Lewis',
            profilePic: require('../assets/images/Man1.png'),
            // more data as needed...
        },
        {
            id: 2,
            name: 'Eliif Sonas',
            profilePic: require('../assets/images/Woman1.png'),
            // more data as needed...
        },
    ]

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search..." />
                <Icon name="search" size={24} color="#000" />
        
            </View>
        
            {/* List of community members or posts */}
            <View style={styles.communityList}>
                {communityData.map((member) => (
                    <TouchableOpacity 
                        key={member.id} 
                        style={styles.memberCard} 
                        onPress={() => navigateToProfile(member.id)}
                    >
                        <Image 
                            source={{ uri: member.profilePic }} 
                            style={styles.profilePic} 
                        />

                        <Text style={styles.memberName}>{member.name}</Text>
                    
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Adjust the background color as needed
    },
    searchContainer: {
        // Styles for the search container
    },
    searchInput: {
        // Styles for the search input
    },
    communityList: {
        // Styles for the community list container
    },
    memberCard: {
        // Styles for each community member card
    },
    profilePic: {
        // Styles for the profile picture of each community member
    },
    memberName: {
        // Styles for the name of each community member
    },
    // Add other styles as needed
});

export default Community;