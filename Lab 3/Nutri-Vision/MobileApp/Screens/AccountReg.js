import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {
    const handleChoosePhoto = () => {
        // implement the functionality to choose a photo
        console.log('Choose photo button pressed!');
    };

    const handleAvatarPress = () => {
        console.log('Avatar pressed');
    };

    //navigate back or dismiss the current screen
    const handleBackPress = () => {
        console.log('Back pressed');
        
    };

    const handleCreateAccountPress = () => {
        const passwordsDoMatch = checkPasswordsMatch(); // Check if passwords match
        if (!termsAccepted) {
            alert('Please read and accept the Terms and Conditions to proceed.');
            return;
        } else if (passwordsDoMatch) {
            console.log("Creating account...");
        } else {
            // If passwords don't match, the error message is already set by checkPasswordsMatch,
            console.log("Passwords do not match.");
        }
    };

    // Defining State for Gender Selection
    const [selectedGender, setSelectedGender] = useState(null);

    // Defining state for Date Picker Method
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false); // Track if a date has been selected
    
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setIsDateSelected(true); // Optionally hide picker after selection
        setShowDatePicker(false);
    };

    // Defining state for Password Checker
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState('');
    
    /*const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };
    */

    const checkPasswordsMatch = () => {
        if (password !== confirmPassword) {
            setPasswordMismatchError("Passwords do not match");
            return false;
        }
        setPasswordMismatchError(""); // Clear any existing error message
        return true;
    };

    const handlePressTerms = () => {
        // URL
        const url = 'https://www.google.com.sg/';
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    // Defining state for T&C Checker
    const [termsAccepted, setTermsAccepted] = useState(false);


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style = {styles.headerContainer}>
                        {/* Left Segment for the Back Button */}
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                                <Icon name="arrow-left" size={40} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Center Segment for the Title */}
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text 
                                style={styles.header} 
                                numberOfLines={1} // Correct placement of the prop
                            >
                                 Create Account
                            </Text>
                        </View>

                    </View>

                    <Text style = {styles.chooseAvatar}>Choose Your Photo</Text>

                    <View style={styles.photoContainer}>
                        <View style = {styles.avatarContainer}>
                            <TouchableOpacity onPress={handleAvatarPress}>
                                <Image
                                    source={require('../assets/hacker.png')} 
                                    style={styles.avatar}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


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

                    {/* Name Input */}
                    <Text style={styles.label}>Your Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Name"
                    />

                    {/* DOB Selection */}
                    <Text style = {styles.label} >Date of Birth</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerToggle}>
                        <Text style={styles.datePickerText}>
                            {isDateSelected ? date.toLocaleDateString() : "DD/MM/YYYY"}
                        </Text>
                    </TouchableOpacity>

                    {/* Email Input */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style = {styles.input}
                        placeholder='Enter Your Email'
                        keyboardType="email-address"
                    />

                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                    {/* Password Input */}
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style = {styles.input}
                            placeholder='Enter Your Password'
                            secureTextEntry={!passwordVisible} // Hide password by default
                            value={password} // Make sure to define and update this state
                            onChangeText={setPassword} // Update password state
                        />
                        {/* Toggle Password Visibility Button for Password */}
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Icon name={passwordVisible ? 'visibility-off' : 'visibility'} size={24} color="grey" />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password Input */}
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style = {styles.inputWrapper} >
                        <TextInput
                            style = {styles.input}
                            placeholder='Re-Enter Your Password'
                            secureTextEntry={!confirmPasswordVisible} // Hide confirm password by default
                            value={confirmPassword} // Make sure to define and update this state
                            onChangeText={setConfirmPassword} // Update confirm password state
                        />

                        {/* Toggle Password Visibility Button for Confirm Password */}
                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Icon name={confirmPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="grey" />
                        </TouchableOpacity>
                    </View>

                    {/* Terms & Conditions */}
                    <View style={styles.termsRow}>
                        <TouchableOpacity
                            style={[styles.checkboxBase, termsAccepted && styles.checkboxChecked]}
                            onPress={() => setTermsAccepted(!termsAccepted)}
                        >
                        {termsAccepted && <Icon name="check" size={24} color="#fff" />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePressTerms}>
                            <Text style={styles.linkText}>Terms and Conditions**</Text>
                        </TouchableOpacity>
                    </View>

            
                    <TouchableOpacity onPress={handleCreateAccountPress} style={styles.createAccountButton}>
                        <Text style={styles.createAccountButtonText}>Create Account</Text>
                    </TouchableOpacity>
                

                    {/* Display password mismatch error */}
                    {passwordMismatchError ? <Text style={styles.error}>{passwordMismatchError}</Text> : null}
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

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position : 'relative',
        justifyContent: 'space-between', // Ensures alignment
        padding: 10,
    },
    
    header: {
        fontSize: 30, 
        fontWeight: 'bold',
        marginLeft : -98,
        marginBottom : -12,
    },
    
    backButton: {
        position: 'absolute',
        left: -20, 
        flexDirection: 'row',
    },
    
    chooseAvatar : {
        fontSize : 15,
        marginTop : 17,
        marginBottom : -22,
        fontWeight : 'bold',
        textAlign : 'center',
    },

    container: {
        flex: 1,
        padding: 20,
    },

    label: {
        fontSize: 14, 
        color: '#000', 
        fontWeight: 'bold', // Make the label text stand out
        marginBottom: 3, // Space between label and input field
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
      height: 120, // Adjust the size
      width: 120, // Ensure width and height are equal for a circle
      borderRadius: 60, // Half the size of width/height to make it circular
      borderWidth: 3, // Adjust the border thickness
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

    inputContainer: {
        
    },
    input: {
      flex: 1,
      paddingVertical: 10,
      paddingLeft : 10,
      backgroundColor: '#FFF',
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

    linkText: {
        color: 'blue',
        textDecorationLine : 'underline',
    },

    termsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'grey',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#007bff',
    },

    //--------------------------------------------------------------------------------

    createAccountButton: {
        marginTop: 20,
        backgroundColor: '#007bff', // Button background color
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center', // Center the text inside the button
        justifyContent: 'center', 
    },
    
    createAccountButtonText: {
        color: '#ffffff', 
        fontSize: 18,
        fontWeight: 'bold',
    },


  });
