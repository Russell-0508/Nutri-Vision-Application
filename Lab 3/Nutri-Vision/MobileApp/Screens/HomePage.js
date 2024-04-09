import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, Platform, Button, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Circle, Path } from 'react-native-svg';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getProfileByEmail } from '../../ProfileHistory';
import { getMealHistoryFromFirestore } from '../../MealHistory';
import { fetchUserGoalDetails } from '../../goalsDetail';
import { getStorage, ref, getDownloadURL } from "firebase/storage"


export default function HomePage({navigation}) {

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mealEntries, setMealEntries] = useState([]);

    const [carbsPercentage, setCarbsPercentage] = useState(70); // Example percentage
    const [fatsPercentage, setFatsPercentage] = useState(55); // Example percentage
    const [proteinPercentage, setProteinPercentage] = useState(25); // Example percentage    
    const [Heartpercentage, setHeartPercentage] = useState(50); // Example percentage

    const goalCalories = 2000; // Set goal calories here
    const totalCaloriesConsumed = mealEntries.reduce((total, entry) => total + entry.calories, 0);

    const [caloriesRemaining,setCaloriesRemaining] = useState(goalCalories - totalCaloriesConsumed);
    // Calculate the percentage of calories consumed
    const caloriePercantage = Math.min((totalCaloriesConsumed / goalCalories) * 100, 100);

    const [goalsDetails, setGoalsDetails] = useState([]);

    // Filter entries based on selected date

    const [caloriesConsumed, setCaloriesConsumed] = useState(0);


    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const formatDate = (date) => {
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };

    // Allows the component to interact with external system (Firestore database)
    useEffect(() => {
        fetchMealEntriesForDate(date); // Initial fetch for today's entries
    }, [date]);


    const fetchMealEntriesForDate = async (date) => {
        try {
            const dateString = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD Format
            const entries = await getMealHistoryFromFirestore(dateString);
            setMealEntries(entries);
        } catch(error) {
            console.error('Error fetching meal entries', error);
        }
    }

    const [avatarUrl, setAvatarUrl] = useState();

    useEffect(() => {
        const fetchProfileByEmail = async () => {
            try {
                const email = "PAN@GMAIL.COM"; //change this email to read from user.email or smth
                const profiles = await getProfileByEmail(email); 
                if (profiles.length > 0) {
                    const profile = profiles[0];
                    // Handling avatarUrl
                    if (profile.avatarUrl) {
                        setAvatarUrl(profile.avatarUrl); 
                    } else {
                        console.log('Profile found but no avatar URL present.');
                    }

                    // Fetch and set goals details
                    const goals = await fetchUserGoalDetails(email);
                    setGoalsDetails(goals);
                    console.log('Goal Details:', goals); //why undefined?
    
                } else {
                    console.log('No profile found for the given email:', email);
                }
            } catch (error) {
                console.error("Error fetching profile by email:", error);
            }
        };
    
        fetchProfileByEmail();
    }, []);

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

    const CalorieProgressCircle = ({ percentage, calories }) => {
        const size = 180; // Diameter of the calorie circle
        const strokeWidth = 12; // Width of the calorie circle border
        const radius = (size / 2) - (strokeWidth * 2); // Radius of the calorie circle
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <Circle
                        stroke="#eee" // Background circle color
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <Circle
                        stroke="#FFA726" // Fill circle color
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                    />
                </Svg>
                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 34, fontWeight: 'bold' }}>{calories}</Text>
                    <Text style={{ fontSize: 18, color: '#555' }}>KCAL</Text>
                </View>
            </View>
        );
    };

    const HeartRateTracker = ({ percentage, fillColor }) => {
        const size = 150; // Diameter
        const strokeWidth = 8; // Width 
        const radius = (size - strokeWidth) / 2; // Radius 
        const circumference = Math.PI * radius; 
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <View style = { {width: size, height: size/2, alignItems : 'center', justifyContent: 'center',}}>
                <Svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
                    <Path
                        d={`M ${strokeWidth / 2}, ${size / 2}
                            A ${radius},${radius} 0 0 1 ${size - (strokeWidth / 2)},${size / 2}`}
                        fill="none"
                        stroke="#ddd"
                        strokeWidth={strokeWidth}
                    />
                    <Path
                        d={`M ${strokeWidth / 2}, ${size / 2}
                            A ${radius},${radius} 0 0 1 ${size - (strokeWidth / 2)},${size / 2}`}
                        fill="none"
                        stroke={fillColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </Svg>
                <View style={{ position: 'absolute', bottom: 0, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: fillColor }}>{`${percentage}%`}</Text>
                    <Text style={{ fontSize: 14, color: '#666' }}>Heart Rate</Text>
                </View>
            </View>
        );
      };



    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.topSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: avatarUrl }}
                            //source={require('../assets/hacker.png')}
                            style={styles.avatar}
                        />
                     </View>
                    <View style={styles.titleAndDatePicker}>
                        <Text style={styles.headerText}>Home Page</Text>
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
                    </View>
                </View>


                <View style={styles.caloriesSection}>
                    <Text style={styles.caloriesTitle}>My Calories</Text>
                    <CalorieProgressCircle percentage={caloriePercantage} calories={totalCaloriesConsumed} />

                    {/* Nutritional information progress circles */}
                    <View style={styles.progressCirclesContainer}>
                        <ProgressCircle percentage={carbsPercentage} fillColor="brown" label="Carbohydrates" />
                        <ProgressCircle percentage={fatsPercentage} fillColor="yellow" label="Fats" />
                        <ProgressCircle percentage={proteinPercentage} fillColor="blue" label="Proteins" />
                    </View>
                </View>

                <View style={styles.targetSection}>
                    <Text style = {styles.targetTitle}>My Target</Text>
                    <HeartRateTracker
                        percentage = {Heartpercentage}
                        fillColor="#FF4500" 
                        label = "Heart Rate"
                    />

                </View>

  
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#36622B', 
    },
    
    container: {
        flex: 1,
        backgroundColor: '#36622B',
    },

    topSection: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, // Add padding around the section
    },
    avatarContainer: {
        marginRight: 15, // Adds space between the avatar and the text/date picker
    },
    avatar: {
        width: 50,
        height: 50, 
        borderRadius: 25, 
    },
    titleAndDatePicker: {
        flex: 1, 
    },
    headerText: {
        fontSize: 33, 
        fontWeight: 'bold',
        marginBottom: 5,
        color : 'white',
    },
    datePickerRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    datePickerText: {
        marginLeft: 10, 
        fontSize : 15,
        fontWeight : 'bold',
    },

    // -----------------------------------------------------------------
    caloriesSection: {
        padding: 16,
        backgroundColor: '#A0A0A0',
        alignItems: 'center',
    },

    caloriesTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        textAlign : 'center',
    },

    progressCirclesContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 

        width: '100%',
    },
    

    targetSection: {
        padding: 16,
        backgroundColor: '#ffff',
        textAlign : 'center',
        alignItems : 'center',
    },

    targetTitle: {
        fontSize: 21,
        fontWeight: 'bold',
    },


    mealsSection: {
        padding: 16,
    },
    mealsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mealItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mealImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
    },
});
