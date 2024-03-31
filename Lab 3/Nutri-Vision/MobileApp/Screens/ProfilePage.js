import React, { useState, useEffect }from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Switch } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { getProfileByEmail } from '../../ProfileHistory'; // Adjust the path as necessary


function ProfileScreen({navigation}){

  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const [profileData, setProfileData] = useState({
    name: 'Loading...', // Default value while loading
    // You can add other fields here if needed
  });
  


  // Placeholder for profile data
  {/*const profileData = {
    name: 'Russell Tan',
    weight: '64 kg',
    height: '176 cm',
    age: '23',
  };*/}

  // Fetch profile data from Firestore
  useEffect(() => {
    const fetchProfileByEmail = async () => {
      try {
        const profiles = await getProfileByEmail("PAN@GMAIL.COM"); // Adjust the email case as needed
        if (profiles.length > 0) {
          // Assuming the first profile is the one you're interested in
          setProfileData(profiles[0]);
        } else {
          setProfileData({ name: 'No profile found' });
        }
      } catch (error) {
        console.error("Error fetching profile by email:", error);
        setProfileData({ name: 'Error fetching profile' });
      }
    };
  
    fetchProfileByEmail();
  }, []);
  
  

  
  

  // Placeholder function for button presses
  const handlePress = (action) => {
    console.log(`Pressed ${action}`);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgb(64, 97, 50)'}}>
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}>
          <MaterialIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
        <View style={styles.profileHeader}>
        {/* Profile Information Display */}
          <Image
            source={require('../assets/profile_image.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{profileData.name}</Text>
          {/* Additional profile details can be displayed here */}

        {/* Display other profile details as needed */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Weight</Text>
              <Text style={styles.statValue}>64 kg</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Height</Text>
              <Text style={styles.statValue}>176 cm</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>23</Text>
            </View>
          </View>
        </View>
        <Text style={styles.headerText}>Account</Text>
        <View style={styles.actionsContainer}>

          <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')} style={styles.actionItem}>
            <MaterialIcons name="edit" size={20} color="#4CAF50" style={styles.iconStyle}/>
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowNotificationsModal(true)} style={styles.actionItem}>
            <MaterialIcons name="notifications" size={20} color="#4CAF50" style={styles.iconStyle} />
            <Text style={styles.actionText}>Notification</Text>
          </TouchableOpacity>
          <Modal
              animationType="slide"
              transparent={true}
              visible={showNotificationsModal}
              onRequestClose={() => {
                setShowNotificationsModal(false);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Notifications</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifications}
                    value={notificationsEnabled}
                  />
                  <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      setShowNotificationsModal(false);
                    }}>
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          <TouchableOpacity onPress={() => navigation.navigate('Favourites')} style={styles.actionItem}>
            <MaterialIcons name="favorite" size={20} color="#4CAF50" style={styles.iconStyle} />
            <Text style={styles.actionText}>Favourites</Text>
            </TouchableOpacity>
          {/* More action items */}
        </View>
        <Text style={styles.headerText}>Statistics</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => handlePress('Edit Plan')} style={styles.actionItem}>
            <MaterialIcons name="edit-note" size={20} color="#4CAF50" style={styles.iconStyle} />
            <Text style={styles.actionText}>Edit Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('My Progress')} style={styles.actionItem}>
            <MaterialIcons name="show-chart" size={20} color="#4CAF50" style={styles.iconStyle} />
            <Text style={styles.actionText}>My Progress</Text>
          </TouchableOpacity>
        </View>
        {/* Add more sections as needed */}
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(64, 97, 50)',
  },
  bottomContainer: {
    position: 'absolute',  // Positioning it over the bottom SafeAreaView
    bottom: 5,             // Aligns it to the bottom
    left: 0,
    right: 0,
    backgroundColor: 'white', // This is the background color of the bottom platform
    paddingVertical: 20, // Adjust the padding as needed
    paddingHorizontal: 10, // Adjust the padding as needed
    // Add a large border radius for rounded corners
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Shadows can be adjusted as per your design to give depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  safeArea: {
    backgroundColor: 'white', // The SafeAreaView background color also needs to be white
    flexGrow: 0, // Ensure it doesn't take more space than necessary
  },

  logoutButton: {
    position: 'absolute',
    top: 20, // Adjust based on your SafeAreaView or header's height
    right: 20, // Adjust the right position as needed
    zIndex: 10, // Ensure it's above other elements
  },

  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // Add more styling
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // Add more styling
  },
  profileName: {
    fontSize: 24,
    fontWeight: '300', // This makes the font thinner; use 'normal' if '300' is not supported
    color: 'white', // This sets the text color to white
    marginBottom: 8, // Adds some space below the name
    // Add more styling
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10, // adjust as needed
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center', // This ensures content is centered vertically within the statItem
    marginHorizontal: 15, // increased the space between attributes
  },
  statLabel: {
    textAlign: 'center', // Ensures the label is centered within its container
    fontSize: 14, // adjust as needed
    color: 'white', // adjust as needed
    marginBottom: 4,
  },
  statValue: {
    textAlign: 'center', // Ensures the value is centered within its container
    fontSize: 18, // adjust as needed
    fontWeight: '300',
    color: 'white', // adjust as needed
  },
  separator: {
    height: '80%', // adjust as needed
    width: 1,
    backgroundColor: '#ccc', // adjust as needed for the color of the separator
    marginHorizontal: 10, // adds horizontal spacing around the separator
  },
  statItem: {
    marginHorizontal: 15,
    // Add more styling
  },
  headerText: {
    fontSize: 22, // Adjust the size as needed
    fontWeight: 'bold', // Adjust weight as needed
    color: 'white', // Adjust color as needed
    marginTop: 20, // Space above the header
    marginBottom: 10, // Space below the header
    marginLeft: '5%', // Aligns text to match the buttons' margin
  },
  actionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  actionItem: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'flex-start', // Align items to the start
    backgroundColor: 'white', // White background for the buttons
    borderRadius: 5, // If you want rounded corners
    paddingVertical: 15, // Vertical padding for the content
    paddingHorizontal: 25, // Horizontal padding for the content
    borderRadius: 10, // Rounded corners for the button
    marginTop: 10, // Margin at the top to separate the buttons
    marginHorizontal: '5%', // Side margins to reduce the width of the button
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center', // Center the text/icon vertically
    marginVertical: 10, // Space between each button
    width: '90%', // Adjust as needed
    alignSelf: 'center', // Center the button itself
    // Add shadow or border styles
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconStyle: {
    marginRight: 10, // This is your base spacing for icons other than the Edit Profile
  },
  actionText: {
    color: 'black', // Text color
    fontSize: 18, // Size of the text inside the button
    fontWeight: 'normal', // Weight of the text
    // Add font weight or other styling as needed
  },

  scrollViewContent: {
    paddingBottom: 40, // Adjust this value as needed to accommodate your bottom tab/navigation
  },
//--------------
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 200, // Set the height to your desired value
    width: 300, // Set the width to your desired value
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

});

export default ProfileScreen;