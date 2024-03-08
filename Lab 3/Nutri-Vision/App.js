import { StatusBar } from 'expo-status-bar';
import {  Platform, 
          StyleSheet, 
          Text, 
          View, 
          Image, 
          Button, 
          TouchableHighlight, 
          SafeAreaView, 
          Alert,
          Dimensions, } from 'react-native';
//import LandingUI from './MobileApp/Screens/LandingUI';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingUI from './MobileApp/Screens/LandingUI';
import ProfilePage from './MobileApp/Screens/ProfilePage';
import ScannerPage from './MobileApp/Screens/ScannerPage';


const Stack = createNativeStackNavigator();

/*export default function App() {
  return <LandingUI/>;
}*/

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingUI">
        <Stack.Screen name="LandingUI" component={LandingUI} options={{ title: 'Welcome' }}/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="ScannerPage" component={ScannerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

  /*const handlePress = () => console.log("Text pressed");
  //console.log(useImageDimensions());

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress} >
        Is this a cute cat?
        </Text>
        <TouchableHighlight 
        onPress={() => Alert.alert("My button", "My message",[
          {text: 'Yes', onPress: () => console.log('Yes pressed')},
          {text: 'No', onPress: () => console.log('No pressed')}
        ])
      }
        >

        <Image 
        source = {require('./assets/kitty.png')}
        style = {styles.button}
        />

        </TouchableHighlight>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    width: 200,
    height: 200,
  },
});*/
