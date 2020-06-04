import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component{

    render(){
        return (
            <View
                style={DemoStyle.container}>
                <Text
                    style={DemoStyle.text}>Working</Text>
            </View>
        )
    }
};

const DemoStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    text: {
        position: "relative",
        top: "50%",
        fontSize: 20,
        textAlign: "center"
    }
})