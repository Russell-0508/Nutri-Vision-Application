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
import LandingUI from './MobileApp/Screens/LandingUI';
import ProfilePage from './MobileApp/Screens/ProfilePage'
import Login from './MobileApp/Screens/Login';

import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name='Landing'
        component={LandingUI}
      />
      <Stack.Screen
        name='Login'
        component={Login}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
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
