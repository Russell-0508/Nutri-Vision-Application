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
} from 'react-native';

import Svg, { Path } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native"


curveHeight = 100
screenWidth = 500

function History({navigation}) {
    return (
    <View>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.topContainer}> 
                <View style={styles.topContent}>
                    <Text style={styles.topText}>Past Meals</Text>
                    <Text style={styles.topText}>Date1 - Date2</Text>
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
        </ScrollView>
        </SafeAreaView>
    </View>
    );
}

const styles = StyleSheet.create({
    morelogo: {
        height: 30,
        width: 30,
    },
    
    searchlogo: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        backgroundColor: 'pink',
        position: 'absolute',
    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'pink',
    },

    topContent: {
        flex: 1,
    },

    topText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    topIcons: {
        flexDirection: 'row',
    },
})

export default History;
