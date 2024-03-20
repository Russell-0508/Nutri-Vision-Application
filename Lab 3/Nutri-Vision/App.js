import * as React from 'react';
import LandingUI from './MobileApp/Screens/LandingUI';
import Login from './MobileApp/Screens/Login';
import AccountReg from './MobileApp/Screens/AccountReg';
import CreateProfile from './MobileApp/Screens/CreateProfile';
import GoalsReg from './MobileApp/Screens/GoalsReg';
import NutritionalInfoPage from './MobileApp/Screens/NutritionInfoPage2';
import ConfirmMealPage from './MobileApp/Screens/NutritionInfoPage1';
import EditProfilePage from './MobileApp/Screens/EditProfile'
import HistoryPage from './MobileApp/Screens/HistoryPage';

/*import ScannerPage from './MobileApp/Screens/ScannerPage';
import ProfilePage from './MobileApp/Screens/ProfilePage'
import NutritionalInfoPage from './MobileApp/Screens/NutritionInfoPage2';
import HomePage from './MobileApp/Screens/HomePage';

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
      <Stack.Screen name='CreateProfile' component = { CreateProfile } />
      <Stack.Screen name='GoalsReg' component={GoalsReg} />
      <Stack.Screen name='Tabs' component={Tabs} options={{headerShown: false}}/>
      <Stack.Screen name='NutritionalInfoPage' component={NutritionalInfoPage} />
      <Stack.Screen name='ConfirmMealPage' component={ConfirmMealPage} />
      <Stack.Screen name='EditProfilePage' component={EditProfilePage} />
      
      

      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
/* <Stack.Screen name='Landing' component={LandingUI} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='AccountRegistration' component={AccountReg}/>
      <Stack.Screen name='CreateProfile' component = { CreateProfile } />
      <Stack.Screen name='GoalsReg' component={GoalsReg} />
      <Stack.Screen name='Tabs' component={Tabs} options={{headerShown: false}}/>
      <Stack.Screen name='NutritionalInfoPage' component={NutritionalInfoPage} /> */  