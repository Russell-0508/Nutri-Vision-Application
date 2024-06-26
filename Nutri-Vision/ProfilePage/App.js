import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ProfileScreen = () => {
  // Placeholder for profile data
  const profileData = {
    name: 'Russell Tan',
    weight: '64 kg',
    height: '176 cm',
    age: '23',
  };

  // Placeholder function for button presses
  const handlePress = (action) => {
    console.log(`Pressed ${action}`);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgb(64, 97, 50)'}}>
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={require('./assets/profile_image.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{profileData.name}</Text>
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
          <TouchableOpacity onPress={() => handlePress('Edit Profile')} style={styles.actionItem}>
            <MaterialIcons name="edit" size={20} color="#4CAF50" style={styles.iconStyle}/>
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Notification')} style={styles.actionItem}>
            <MaterialIcons name="notifications" size={20} color="#4CAF50" style={styles.iconStyle} />
            <Text style={styles.actionText}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Favourites')} style={styles.actionItem}>
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
      {/* Bottom White Platform */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.bottomContainer}>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => handlePress('Home')}>
            <MaterialIcons name="home" size={24} color="#4CAF50" />
            <Text style={styles.tabTitle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItemCalories} onPress={() => handlePress('Calories')}>
            <MaterialIcons name="fastfood" size={24} color="#4CAF50" />
            <Text style={styles.tabTitle}>Calories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scannerButton} onPress={() => handlePress('Scanner')}>
            <MaterialIcons name="center-focus-strong" size={40} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItemProfile} onPress={() => handlePress('Profile')}>
            <MaterialIcons name="person" size={24} color="#4CAF50" />
            <Text style={styles.tabTitle}>Profile</Text>
          </TouchableOpacity>   
          <TouchableOpacity style={styles.tabItem} onPress={() => handlePress('History')}>
            <MaterialIcons name="manage-search" size={24} color="#4CAF50" />
            <Text style={styles.tabTitle}>History</Text>
          </TouchableOpacity>
            {/* Repeat for other tab items: Calories, Profile, More */}
            {/* ... */}
          </View>
        </View>
        {/* Bottom SafeAreaView with minimal height to cover the unsafe area */}
        <SafeAreaView style={{ backgroundColor: 'white', height: 'auto' }} />
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

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around', // This spaces out the icons evenly
    alignItems: 'center', // This centers the icons vertically
    height: 50, // Adjust as needed
  },
  tabItemCalories: {
    alignItems: 'center',
    marginRight: 20, // Adjust this value as needed to push away from the scanner button
  },
  
  tabItemProfile: {
    alignItems: 'center',
    marginLeft: 20, // Adjust this value as needed to push away from the scanner button
  },
  tabItem: {
    alignItems: 'center', // This centers the icon and label
  },
  scannerButton: {
    backgroundColor: '#ccc', // Grey background
    height: 75, // Set height for the circle
    width: 75, // Set width for the circle
    borderRadius: 37.5, // Half the size of width to make it a circle
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -37.5,
    marginRight: -27.5,
    top: -10, // Half the size of the button to move it up above the tab bar
    elevation: 4, // Optional: adds shadow on Android
    shadowColor: '#000', // Optional: adds shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // Optional: adds shadow on iOS
    shadowOpacity: 0.25, // Optional: adds shadow on iOS
    shadowRadius: 3.84, // Optional: adds shadow on iOS
  },
  tabTitle: {
    color: '#4CAF50', // This sets the label color
    fontSize: 15, // Adjust the size as needed
    marginTop: 4, // This adds space between the icon and label
  },

  // ... (rest of your styles)
});

export default ProfileScreen;