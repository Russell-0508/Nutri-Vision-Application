import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, 
    TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import { getMealHistoryFromFirestore } from '../../MealHistory';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle } from 'react-native-svg';

/**
 * Calories component that displays and manages calorie tracking, including adding meals
 * and visualizing calorie consumption as percentages of macronutrients and overall calorie goals.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function} props.navigation - Navigation function provided by React Navigation for navigating between screens.
 */
function Calories({navigation}) {

    const [carbsPercentage, setCarbsPercentage] = useState(70); 
    const [fatsPercentage, setFatsPercentage] = useState(55); 
    const [proteinPercentage, setProteinPercentage] = useState(25); 

    const goalCalories = 2000; // Set goal calories here
    const [entries, setEntries] = useState([]); // State variable for meal entries
    
    const [caloriesConsumed, setCaloriesConsumed] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [caloriesRemaining,setCaloriesRemaining] = useState(goalCalories - caloriesConsumed);
    const [mealEntries, setMealEntries] = useState([]);
    const progress = caloriesConsumed / goalCalories;
    
    /**
     * Updates the total calories consumed based on the amount provided. Prevents the total from going negative.
     *
     * @function updateCalories
     * @param {number} amount - The amount of calories to add to the current total.
     */
    const updateCalories = (amount) => {
        const newCalories = caloriesConsumed + amount;
        setCaloriesConsumed(newCalories > 0 ? newCalories : 0); // Ensure calories consumed is not negative
    }

    /**
     * Adds a new food item to the meal entries and updates total calories.
     *
     * @function addFood
     * @param {string} food - The name of the food item.
     * @param {number} calories - The calorie count of the food item.
     */
    const addFood = (food, calories) => {
        const newEntries = [...entries, {name: food, calories, date}];
        updateCalories(calories);
        setMealEntries(newEntries);
    }

    /**
     * Handles date change from the date picker and fetches meal entries for the selected date.
     *
     * @function onChange
     * @param {Event} event - The event triggered by date change.
     * @param {Date} selectedDate - The new date selected by the user.
     */
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        fetchMealEntriesForDate(currentDate)
    };
     
    const formatDate = (date) => {
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };  
    

    // Filter entries based on selected date
    const filteredEntries = entries.filter(entry => entry.date.toDateString() === date.toDateString());

    // Allows the component to interact with external system (Firestore database)
    useEffect(() => {
        fetchMealEntriesForDate(date); // Initial fetch for today's entries
    }, [date]);

    /**
     * Fetches meal entries from the Firestore database for a given date.
     *
     * @async
     * @function fetchMealEntriesForDate
     * @param {Date} date - The date for which to fetch meal entries.
     */
    const fetchMealEntriesForDate = async (date) => {
        try {
            const dateString = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD Format
            const entries = await getMealHistoryFromFirestore(dateString);
            setMealEntries(entries);
        } catch(error) {
            console.error('Error fetching meal entries', error);
        }
    }

    /**
     * Displays a progress circle showing the percentage of a goal achieved.
     *
     * @component
     * @param {Object} props - Component props.
     * @param {number} props.percentage - The percentage of the goal achieved.
     * @param {string} props.fillColor - The color of the progress indicator.
     * @param {string} props.label - Label for the progress circle.
     */
    const ProgressCircle = ({ percentage, fillColor, label }) => {
        const size = 75; // Diameter of the circle
        const strokeWidth = 5; // Width of the circle border
        const radius = (size / 2) - (strokeWidth * 2); // Radius of the circle
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
        return (
          <View style={{ alignItems: 'center', margin: 10 }}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <Circle
                stroke="#ddd" // This is the color for the "unfilled" part of the circle
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <Circle
                stroke={fillColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90, ${size / 2}, ${size / 2})`}
              />
            </Svg>
            <Text style={{ position: 'absolute', fontWeight: 'bold', top: size * 0.35 }}>{percentage}%</Text>
            <Text style={{ marginTop: 4, fontWeight: 'bold' }}>{label}</Text>
          </View>
        );
      };



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='light-content'/>
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

                        <View style={styles.progressCirclesContainer}>
                            <ProgressCircle percentage={carbsPercentage} fillColor="brown" label="Carbohydrates" />
                            <ProgressCircle percentage={fatsPercentage} fillColor="yellow" label="Fats" />
                            <ProgressCircle percentage={proteinPercentage} fillColor="blue" label="Proteins" />
                        </View>

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

    progress: {
        height: '100%',
        backgroundColor: '#406132',
        borderRadius: 5,
    },

    progressBar: {
        height: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
        marginBottom: 10,
    },

    progressCirclesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
