import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addDoc, collection } from 'firebase/firestore';
import firestore from '../../firebase/config';
import { format } from 'date-fns';
import { differenceInYears } from 'date-fns';

const CreateProfile = ({ navigation }) => {
    const profileCollection = collection(firestore, 'profile');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');


    // State for date picker
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleCreateProfile = async () => {
        const age = differenceInYears(new Date(), dateOfBirth);
        const profileData = {
            name,
            email,
            gender: selectedGender,
            height: parseFloat(height),
            weight: parseFloat(weight),
            phoneNumber: parseInt(phoneNumber, 8),
            dateOfBirth: dateOfBirth,
            age: age,
            avatarUrl: avatarUrls[selectedAvatarIndex],
        };
      
        try {
            const docRef = await addDoc(profileCollection, profileData);
            console.log('Profile created with ID:', docRef.id);
            navigation.navigate('GoalsReg'); // Navigate to the next screen after profile creation
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false);
        setDateOfBirth(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const [showAvatarSelection, setShowAvatarSelection] = useState(false);

    const avatarUrls = [
        'https://firebasestorage.googleapis.com/v0/b/nutri-vision-78db7.appspot.com/o/Man1.png?alt=media&token=36480a3b-e065-4629-8703-771f5c7c1831',
        'https://firebasestorage.googleapis.com/v0/b/nutri-vision-78db7.appspot.com/o/Man2.png?alt=media&token=65310e0d-131f-4179-9e8a-d267b641d1e4',
        'https://firebasestorage.googleapis.com/v0/b/nutri-vision-78db7.appspot.com/o/hacker.png?alt=media&token=8691a89d-74d6-452b-ad90-6686e9806c72',
        'https://firebasestorage.googleapis.com/v0/b/nutri-vision-78db7.appspot.com/o/Woman1.png?alt=media&token=7ecd59d7-3335-4ad0-ad5d-3438ee1c13ff',
        'https://firebasestorage.googleapis.com/v0/b/nutri-vision-78db7.appspot.com/o/Woman2.png?alt=media&token=5920e6ee-0341-492c-a116-cd5450dfa15b',
        'https://firebasestorage.googleapis.com/v0/b/nutri-vision-78db7.appspot.com/o/Woman3.png?alt=media&token=2470a34c-1c9b-44b7-ba9a-5422f7a61873',
        
      ];


    // Preloaded Avatar Icons
    const avatarImages = [
        require('../assets/images/Man1.png'),
        require('../assets/images/Man2.png'),
        require('../assets/images/hacker.png'),
        require('../assets/images/Woman1.png'),
        require('../assets/images/Woman2.png'),
        require('../assets/images/Woman3.png'),

    ];

    const handleAvatarSelect = (index) => {
        setSelectedAvatarIndex(index);
        setShowAvatarSelection(false);
        console.log('Avatar pressed'); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style = {styles.chooseAvatar}>Choose Your Avatar</Text>

                    <TouchableOpacity onPress={() => setShowAvatarSelection(!showAvatarSelection)} style={styles.avatarSelectButton}>
                        <Image source={avatarImages[selectedAvatarIndex]} style={styles.avatar} />
                    </TouchableOpacity>

                    {showAvatarSelection && (
                        <View style={styles.avatarPicker}>
                            {avatarImages.map((avatar, index) => (
                                <TouchableOpacity key={index} onPress={() => handleAvatarSelect(index)} style={styles.avatarOption}>
                                    <Image source={avatar} style={styles.avatar} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}


                    {/* Gender Selection */}
                    <Text style={styles.genderLabel}>Gender: </Text>
                    <View style={styles.genderContainer}>
                        {['Male', 'Female', 'Prefer Not to Say'].map((gender) => (
                            <TouchableOpacity
                                key={gender}
                                style={[
                                    styles.genderButton,
                                    selectedGender === gender && styles.genderButtonSelected
                                ]}
                                onPress={() => setSelectedGender(gender)}
                            >
                                <Text style={[
                                    styles.genderButtonText,
                                    selectedGender === gender && styles.genderButtonTextSelected
                                ]}>
                                    {gender}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Name input */}
                    <Text style={styles.label}>Your Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* DOB Selection */}
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity onPress={showDatepicker} style={styles.datePickerToggle}>
                        <Text style={styles.datePickerText}>
                            {format(dateOfBirth, 'dd/MM/yyyy')}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                            //maximumDate={new Date()} // Optional: to prevent future dates
                        />
                    )}

                    {/* Height input */}
                    <Text style={styles.label}>Height (cm)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your height"
                        keyboardType="numeric"
                        value={height}
                        onChangeText={setHeight}
                    />

                    {/* Weight input */}
                    <Text style={styles.label}>Weight (kg)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your weight"
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                    />
         
                    <TouchableOpacity onPress={handleCreateProfile} style={styles.createAccountButton}>
                        <Text style={styles.createAccountButtonText}>Create Profile</Text>
                    </TouchableOpacity>
                
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    //Safe Area for IOS devices
    safeArea: {
        flex: 1,
        backgroundColor: '#36622B', 
    },

    chooseAvatar : {
        fontSize : 22,
        marginBottom : 20,
        fontWeight : 'bold',
        textAlign : 'center',
    },
    avatarSelectButton: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarPicker: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    avatarOption: {
        marginHorizontal: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    
    container: {
        flex: 1,
        padding: 20,
    },

    label: {
        fontSize: 14, 
        color: '#000', 
        fontWeight: 'bold', 
        marginBottom: 3, 
        marginTop: 8,
    },

    //--------------------------------------------------------------------------------
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
    genderButton: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 17,
        backgroundColor: '#fff',
    },
    genderButtonSelected: {
        backgroundColor: '#007bff', 
    },
    genderButtonText: {
        textAlign: 'center',
        color: '#000',
        fontWeight : 'bold',
    },
    genderButtonTextSelected: {
        color: '#fff', 
    },

    //--------------------------------------------------------------------------------

    photoContainer: {
        alignItems: 'center',
        marginVertical: 20, 
    },

    avatarContainer: {
      marginVertical: 20,
      height: 120, 
      width: 120, 
      borderRadius: 60, 
      borderWidth: 3, 
      borderColor: '#ffffff', // Adjust the border color
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Ensures the image doesn't bleed outside the border
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
    },
    //--------------------------------------------------------------------------------


    input: {
      flex: 1,
      paddingVertical: 10,
      paddingLeft : 10,
      backgroundColor: '#FFF',
      borderRadius : 10,
    },

    inputWrapper: {
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center', // Center items vertically
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#FFF',
        borderRadius : 10,
    },

    //--------------------------------------------------------------------------------

    datePickerToggle: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5, // Match input styles for consistency
        backgroundColor: '#FFF', // Keeping it white to resemble an input field
        alignItems: 'center', // Center the text horizontally
    },

    // Additional styling for the date display text
    datePickerText: {
        fontSize: 17,
        color: '#000', 
    },

    //--------------------------------------------------------------------------------

  
    createAccountButton: {
        marginTop: 20,
        backgroundColor: '#007bff', // Button background color
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    
    createAccountButtonText: {
        color: '#ffffff', 
        fontSize: 18,
        fontWeight: 'bold',
    },

  });

export default CreateProfile;
