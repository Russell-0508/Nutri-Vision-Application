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
            name: 'Jake Sonas',
            profilePic: require('../assets/images/Woman1.png'),
            // more data as needed...
        },
    ]

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
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
                            source={member.profilePic} 
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
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 10,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    communityList: {
        // Styles for the community list container
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Community;