import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    StyleSheet, 
    StatusBar,
    Platform,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function Calories({navigation}) {

    const goalCalories = 2000; // Set goal calories here
    const [entries, setEntries] = useState([]); // State variable for meal entries
    //const totalCalories = entries.reduce((total, entry) => total + entry.calories, 0);

    const [caloriesConsumed, setCaloriesConsumed] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [caloriesRemaining,setCaloriesRemaining] = useState(goalCalories - caloriesConsumed);
    const progress = caloriesConsumed / goalCalories;
    
    // Function to update calories count
    const updateCalories = (amount) => {
        const newCalories = caloriesConsumed + amount;
        setCaloriesConsumed(newCalories > 0 ? newCalories : 0); // Ensure calories consumed is not negative
    }

    // Function to update remaining calories in each entry

    // Function to add meal entries
    const addFood = (food, calories) => {
        const newEntries = [...entries, {name: food, calories, date}];
        updateCalories(calories);
        setEntries(newEntries);
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };
     
    const formatDate = (date) => {
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };  
    

    // Filter entries based on selected date
    const filteredEntries = entries.filter(entry => entry.date.toDateString() === date.toDateString());

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#406132' barStyle='light-content'/>
            <SafeAreaView>
                <ScrollView style={styles.background}>
                    <View style={styles.topContainer}>
                        <View style={styles.topContent}>
                            <Text style={styles.calorieText}> Calories </Text>
                        </View>
                        <View style={styles.topIcons}>
                            <TouchableOpacity>
                                <MaterialIcons name="fastfood" size={24} color='black' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* Date selection */}
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerRow}>
                            <FontAwesomeIcon name="calendar" size={24} color="#000" />
                            <Text style={styles.datePickerText}>{formatDate(date)}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                        )}

                    <View style={styles.numberContainer}>
                        <Text style={styles.label}>Calories Remaining</Text>
                        <Text style={styles.number}>{caloriesRemaining}</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progress, { width: `${progress * 100}%` }]} />
                        </View>
                    </View>
                    
                    {/* Display meals for selected date */}
                    {filteredEntries.map((entry, index) => (
                        <View key={index} style={styles.header}>
                            <View style={styles.mealContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.entryTitle}>{entry.name}</Text>
                                    <Text style={styles.calories}>{entry.calories} cal</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Add food button */}
                    <View style={styles.addEntry}>
                        <Text style={styles.entryNew} onPress={() => addFood(' New Food \n more details', 200)}> ADD FOOD </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    addEntry: {
        backgroundColor: '#ffffff',
        marginTop: 10,
        padding: 15,
    },

    background: {
        backgroundColor: '#f2f2f2',
    },

    calories: {
        fontSize: 16,
    },
    
    calorieText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    container: {
        flex: 1,
    },

    datePickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },

    datePickerText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },

    entryNew: {
        fontSize: 16,
        color: '#406132',
        textAlign: 'center',
    },

    entryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    header: {
        backgroundColor: '#ffffff',
        marginTop: 10,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        paddingBottom: 10,
    },
   
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    
    mealContainer: {
        padding: 15,
    },

    numberContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginTop: 10,
    },
   
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    progressBar: {
        height: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
        marginBottom: 10,
    },

    progress: {
        height: '100%',
        backgroundColor: '#406132',
        borderRadius: 5,
    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
    },

    topIcons: {
        flexDirection: 'row',
    },
});

export default Calories;
