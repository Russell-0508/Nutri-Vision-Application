import React from 'react';
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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Login(props) {


    return (
    <View style={styles.background}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <Text style={styles.login}> Log in to</Text>
            </View>
            <View>
                <Text style={styles.email}>E-mail</Text>
            </View>
            <TextInput 
                styles={styles.textinput}
                placeholder='*******@gmail.com'
            />
            
        </ScrollView>
        </SafeAreaView> 
    </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgb(64,97,50)',
    },

    email: {
        fontSize: 20,
        colour: 'white',
        paddingLeft: 10,

    },

    login: {
        backgroundColor: 'pink',
        color: 'white',
        fontSize: 30,
        paddingTop: 50,
        alignSelf: 'flex-start',
        paddingTop: 150,
    },

    textinput: {
        flex: 0.3,
        backgroundColor: 'red',
        borderWidth: 5,
        borderColor: 'black'
    },



})

export default Login;