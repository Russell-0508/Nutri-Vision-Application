import React, { useRef, useState } from 'react';
import { 
    View, 
    ImageBackground, 
    StyleSheet, 
    Image, 
    Text, 
    Dimensions, 
    Button,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    StatusBar,
} from 'react-native';

import { useNavigation } from "@react-navigation/native"
import Collapsible from 'react-native-collapsible'


curveHeight = 100
screenWidth = 500

function Entry({title, date, navgiation}){
    return(
        <View style={styles.entry}>
            <View style={styles.entryContainer}> 
                <Text style={styles.entryTitle}> {title} </Text> 
                <Text style={styles.entryDate}> {date} </Text>
            </View>
            <View> 
                <TouchableOpacity 
                onPress={()=>navigation.navigate("IndiMeal")}>
                <Image
                    style={styles.arrowlogo}
                    source={require('../assets/right_pointing_arrow.png')}
                    resizeMode='contain'
                />
                </TouchableOpacity>
            </View>
            
            
        </View>
    );
}

function History({navigation}) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#406132" barStyle="light-content" />
        <SafeAreaView>
        <ScrollView>
            <View style={styles.topContainer}> 
                <View style={styles.topContent}>
                    <Text style={styles.pmText}>Past Meals</Text>
                    <Text style={styles.dateText}>Date1 - Date2</Text>
                </View>
                <View style={styles.topIcons}>
                    <TouchableOpacity>
                        <Image
                            style={styles.searchlogo}
                            source={require('../assets/magnifying-glass.png')}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={styles.morelogo}
                            source={require('../assets/threedots.png')}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}> 1 JAN 2024</Text>
                </View>
                <View>
                    <TouchableOpacity 
                    onPress={toggleCollapse}
                    style={styles.buttonContainer}>
                        <Text style={styles.buttonCollapse}>View All</Text>
                    </TouchableOpacity>                                             
                </View> 
                
            </View>
            
            <Collapsible collapsed={isCollapsed}>
                <Entry title='Breakfast' date='Toast with egg'/>
                <Entry title='Lunch' date='Chicken rice'/>
            </Collapsible>
            {!isCollapsed && (
                        <TouchableOpacity onPress={toggleCollapse} style={styles.viewLessButton}>
                            <Text style={styles.viewLessText}>View Less</Text>
                        </TouchableOpacity>
                    )}
        </ScrollView>
        </SafeAreaView>
    </View>
    );
}

const styles = StyleSheet.create({
    arrowlogo: {
        height: 30,
        width: 30,
    },

    buttonCollapse: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'black',
        fontWeight: '600'
    },

    buttonContainer: {
        width: 100,
        height: 50,
        paddingTop: 13,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#f0f0f0'
    },

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    dateHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
    },

    dateText: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 10
    },

    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    entryContainer: {
        flex: 1
    },

    entryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    entryDate: {
        fontSize: 14,
        color: '#666',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    headerContainer: {
        flex: 1
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    morelogo: {
        height: 30,
        width: 30,
    },
    
    pmText: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    searchlogo: {
        height: 30,
        width: 30,        
    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ddf0dd',
    },

    topContent: {
        flex: 1,
        marginLeft: 18,
        marginTop: 10
    },

    topIcons: {
        flexDirection: 'row',
    },

    viewLessButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    viewLessText: {
        fontSize: 16,
        color: 'blue',
    },
})

export default History;
