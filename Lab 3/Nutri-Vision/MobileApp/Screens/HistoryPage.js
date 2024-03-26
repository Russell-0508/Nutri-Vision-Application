import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    Button,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    StatusBar,
} from 'react-native';

import { useNavigation } from "@react-navigation/native"
import Collapsible from 'react-native-collapsible'
import { getMealHistoryFromFirestore } from '../../MealHistory';
import IndividualMeal from './IndividualMeal';

curveHeight = 100
screenWidth = 500


{/* This is the Entry element, which takes in title, description, and displays it all */ }
function Entry({ title, description, navigation }) {
    return (
        <View style={styles.entry}>
            <View style={styles.entryContainer}>
                <Text style={styles.entryTitle}> {title} </Text>
                <Text style={styles.entryDescription}> {description}</Text>

            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('IndividualMeal')}>
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

    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    const [selectedDate, setSelectedDate] = useState('');
    const [mealEntries, setMealEntries] = useState([]);

    useEffect(() => {
        const fetchMealEntries = async () => {
            try {
                const today = new Date().toISOString(); // Get today's date, change this to display other dates 
                setSelectedDate(today); // Update selectedDate directly
                const entries = await getMealHistoryFromFirestore(today);
                setMealEntries(entries);
            } catch (error) {
                console.error('Error fetching meal entries:', error);
            }
        };

        fetchMealEntries();
    }, []);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    //Get today's date for the header display on history page
    var dateString = new Date().toDateString();
    return (

        <View style={styles.container}>
            <StatusBar backgroundColor="#406132" barStyle="light-content" />
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.topContainer}>
                        <View style={styles.topContent}>
                            <Text style={styles.pmText}>Past Meals</Text>
                        </View>
                        <View style={styles.topIcons}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.searchlogo}
                                    source={require('../assets/magnifying-glass.png')}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("IndividualMeal")}>
                                <Image
                                    style={styles.morelogo}
                                    source={require('../assets/threedots.png')}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            {/* 1 Jan 2024 is a placeholder, should read the current date and be dynamic 
                        Work in progress JY: i set to today's date to test backend 
                    */}
                            <Text style={styles.headerText}>{dateString}</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={toggleCollapse}
                                style={styles.buttonContainer}>
                                <Text style={styles.buttonCollapse}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Collapsible collapsed={isCollapsed}>
                        {mealEntries.map((entry, index) => (
                            <View key={index}>
                                <Entry title={entry.type} description={entry.name} navigation={navigation} documentId={entry.documentId}/>
                            </View>
                        ))}
                    </Collapsible>
                    {!isCollapsed && (
                        <TouchableOpacity onPress={toggleCollapse} style={styles.viewLessButton}>
                            <Text style={styles.viewLessText}>View Less</Text>
                        </TouchableOpacity>
                    )}
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

    dateHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
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
    },

    headerContainer: {
        flex: 1
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    morelogo: {
        height: 30,
        width: 30,
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
})

export default History;


