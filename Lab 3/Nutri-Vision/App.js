import * as React from 'react';

import LandingUI from './MobileApp/Screens/LandingUI';
import Login from './MobileApp/Screens/Login';
import AccountReg from './MobileApp/Screens/AccountReg';


/*import ScannerPage from './MobileApp/Screens/ScannerPage';
import ProfilePage from './MobileApp/Screens/ProfilePage'
import NutritionalInfoPage from './MobileApp/Screens/NutritionInfoPage2';
import HomePage from './MobileApp/Screens/HomePage';
import History from './MobileApp/Screens/History';
import IndividualMeal from './MobileApp/Screens/IndividualMeal'*/

import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native'; 
import Tabs from './MobileApp/Navigation/tabs';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name='Landing' component={LandingUI} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='AccountRegistration' component={AccountReg}/>
      <Stack.Screen name='Tabs' component={Tabs} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
/*  <Stack.Screen name='Profile' component={ProfilePage} />
      <Stack.Screen name="ScannerPage" component={ScannerPage} />
      <Stack.Screen name='NutritionalInformationpage' component={NutritionalInfoPage} />
      <Stack.Screen name='IndividualMeal' component={IndividualMeal} />
      <Stack.Screen name='History' component={History}/>*/  