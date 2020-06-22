import React from "react";
import {View, Text, Button, TouchableOpacity, StyleSheet} from "react-native";

export default class ContactsNotification extends React.Component{

    handleView = () => {
        this.props.navigation.navigate("Contact Main", {
            screen: "Contact item",
            params: {
                contact: this.props.route.params.contact
            }
        });
    }
    
    render(){
        return (
            <View
                style={style.container}>
                <Text
                    style={style.text}>You have recieved a new contact.</Text>

                <TouchableOpacity
                    onPress={this.handleView}
                    style={style.button}>
                    <Text
                        style={style.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    text: {
        position: "relative",
        top: "48%",
        textAlign: "center",
        fontSize: 16,
        transform: [
            {translateY: -50}
        ]
    },
    button: {
        width: 250,
        height: 45,
        backgroundColor: "#F6CECE",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        top: "50%",
        textAlign: "center",
        fontSize: 16,
        transform: [
            {translateY: -50}
        ]
    },
    buttonText: {
        textAlign: "center",
        color: "white"        
    }
})