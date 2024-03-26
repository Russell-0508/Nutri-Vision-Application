import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking} from 'react-native';


const GoalsReg = ({navigation}) => {

    const [selectedGoal, setSelectedGoal] = useState(null);

    const goals = [
        'Gain Weight',
        'Lose Weight',
        'Get Fitter',
        'Eat Healthier',
        "I don't know yet",
    ];

    const handleGoalSelection = (goal) => {
        console.log(`Goal selected: ${goal}`);
        setSelectedGoal(goal);
    };

    const handleNextPress = () => {
        if (selectedGoal) {
            console.log('Next button pressed with goal:', selectedGoal);
            navigation.navigate('Tabs'); 
        } else {
            alert('Please select a goal to continue.');
        }
    };


 
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style = {styles.header} >What Is Your Goal?</Text>

                    {/* Goal Options */}
                    {goals.map((goal) => (
                        <TouchableOpacity
                            key={goal}
                            style={[
                                styles.option,
                                selectedGoal === goal && styles.selectedOption,
                            ]}
                             onPress={() => handleGoalSelection(goal)}
                        >
                            <Text style={styles.optionText}>{goal}</Text>
                        </TouchableOpacity>
                    ))}              
        
                    {/* Navigation Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleNextPress} style={styles.createProfileButton}>
                            <Text style={styles.createProfileText}>Create Goals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={styles.skipButton}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                    


                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4e5c2', 
    },

    container: {
        flex: 1,
        padding: 20,
        alignItems : 'center',
    },

    header: {
        fontSize: 27, 
        fontWeight: 'bold',
        alignItems : 'center',
        justifyContent: 'center',
        color : '#070f4e',
        marginBottom : 20,
    },


    option : {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#6db193',
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
    },

    selectedOption : {
        backgroundColor : '#323232',
    },

    optionText : {
        fontSize : 18,
        color : '#000',
        fontWeight : 'bold',
    },
    
 // -----------------------------------------------------------------------

    createProfileButton: {
        marginTop: 50,
        backgroundColor: '#6db193', 
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 70,
        alignItems: 'center', 
        justifyContent: 'center', 
    },

    createProfileText: {
        color: '#ffffff', 
        fontSize: 18,
        fontWeight: 'bold',
    },
    
    skipButton: {
        marginTop: 10,
        backgroundColor: '#808080', 
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 70,
        alignItems: 'center', 
        justifyContent: 'center', 
    },

    skipText: {
        color: '#ffffff', 
        fontSize: 18,
        fontWeight: 'bold',
    },

  });

  export default GoalsReg;