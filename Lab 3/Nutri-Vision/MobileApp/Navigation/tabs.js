import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../Screens/HomePage'
//import Calories from '../Screens/Calories'
import ScannerPage from '../Screens/ScannerPage'
import ProfilePage from '../Screens/ProfilePage'
import HistoryPage from '../Screens/HistoryPage'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name='HomePage' component={HomePage} />
            <Tab.Screen name='ScannerPage' component={ScannerPage} />
            <Tab.Screen name='ProfilePage' component={ProfilePage} />
            <Tab.Screen name='HistoryPage' component={HistoryPage} />
        </Tab.Navigator>
    );
}

export default Tabs;

/* <Tab.Screen name='CaloriesPage' component={CaloriesPage} /> */