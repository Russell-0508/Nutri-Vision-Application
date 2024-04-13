import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    StatusBar,
} from 'react-native';

import { useNavigation } from "@react-navigation/native"
import { getMealHistoryFromFirestore } from '../../MealHistory';

import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

curveHeight = 100
screenWidth = 500


{/* This is the Entry element, which takes in title, description, and displays it all */ }
function Entry({ title, description, navigation, documentId}) {
    const handleNextEntryPress = () => {
        navigation.navigate('IndividualMeal', { documentId: documentId })
        console.log('Navigatiing to documentId: ', { documentId: documentId })
    }
    return (
        <View style={styles.entry}>
            <View style={styles.entryContainer}>
                <Text style={styles.entryTitle}> {title} </Text>
                <Text style={styles.entryDescription}> {description}</Text>

            </View>
            <View>
                <TouchableOpacity onPress={handleNextEntryPress}>
                    <Image
                        style={styles.arrowlogo}
                        source={require('../assets/right_pointing_arrow.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}


function History({ navigation }) {

    // Defining state for date picker method
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mealEntries, setMealEntries] = useState([]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        fetchMealEntriesForDate(currentDate);
    };

    // Function to format date
    const formatDate = (date) => {
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };

    useEffect(() => {
        fetchMealEntriesForDate(date); // Initial fetch for today's entries
    }, [date]);

    const fetchMealEntriesForDate = async (date) => {
        try {
            const dateString = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
            const entries = await getMealHistoryFromFirestore(dateString);
            setMealEntries(entries);
        } catch (error) {
            console.error('Error fetching meal entries:', error);
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#406132" barStyle="light-content" />
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.topContainer}>
                        <View style={styles.topContent}>
                            <Text style={styles.pmText}>Past Meals</Text>
                        </View>
                    </View>

                    {/* Container to display datetimepicker */}
                    <View style={styles.dateContainer}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerRow}>
                            <FontAwesomeIcon name="calendar" size={24} color="#000" />
                            <Text style={styles.datePickerText}>{formatDate(date)}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                key={date.toString()}
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>

                    {/* Displays entries according to date */}
                    <View>
                        {mealEntries.length === 0 ? ( // Check if there are no meal entries
                            <Text style={styles.noMealsText}>No meals logged yet</Text>
                        ) : (
                            mealEntries.map((entry, index) => (
                                <View key={index}>
                                    <Entry title={entry.name} navigation={navigation} documentId={entry.id} />
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View >
    );
}

const styles = StyleSheet.create({
    arrowlogo: {
        height: 30,
        width: 30,
    },

    buttonCollapse: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'black',
        fontWeight: '600'
    },

    buttonContainer: {
        width: 100,
        height: 50,
        paddingTop: 13,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#f0f0f0'
    },

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    dateContainer: {
        paddingTop: 10,

    },

    dateHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
    },

    datepicker: {
        backgroundColor: 'pink'
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


    dateText: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 10
    },

    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    entryContainer: {
        flex: 1
    },

    entryDescription: {
        fontSize: 14,
        color: '#666',
    },

    entryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'pink'
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    morelogo: {
        height: 30,
        width: 30,
        marginRight: 10,
    },

    pmText: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    searchlogo: {
        height: 30,
        width: 30,
    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ddf0dd',
    },

    topContent: {
        flex: 1,
        marginLeft: 18,
        marginTop: 10,
        paddingBottom: 20,
    },

    topIcons: {
        flexDirection: 'row',
    },

    viewLessButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    viewLessText: {
        fontSize: 16,
        color: 'blue',
    },
    noMealsText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30, 
        color: 'gray', 
    },
})

export default History;


