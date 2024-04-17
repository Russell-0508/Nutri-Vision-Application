import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

/**
 * A search bar component that allows users to input search queries.
 * 
 * @component
 * @param {function} onSearch - The callback function to invoke with the search query when a search is triggered.
 * @example
 * // Example of how to use the SearchBar component with a search handler
 * const handleSearch = query => console.log(query);
 * <SearchBar onSearch={handleSearch} />
 */
const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    /**
     * Handles the search action triggered by the user.
     * Invokes the onSearch callback with the current search query.
     * 
     * @function handleSearch
     * @param {SyntheticEvent} event - The react `SyntheticEvent` triggered upon form submission.
     */                                                             
    const handleSearch = () => {
        onSearch(searchQuery); 
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
                <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        borderRadius: 100,
        marginTop: 10,
        width: '93%',
        alignSelf: 'center',
        borderWidth: 1
    },

    input: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        fontSize: 16,
    },
    iconButton: {
        padding: 5,
    },
});

export default SearchBar;
