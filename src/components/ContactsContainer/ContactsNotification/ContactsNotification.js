import React from "react";
import {View, Text, Button, TouchableOpacity, StyleSheet} from "react-native";

export default class ContactsNotification extends React.Component{
    render(){
        return (
            <View
                style={style.container}>
                <Text
                    style={style.text}>You have recieved a new contact.</Text>
                <Button
                    title="View"
                    onPress={()=>this.props.navigation.navigate("Contact Main", { screen: "Contacts"})}></Button>
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
        textAlign: "center",
        marginTop: "50%",
        marginBottom: 75,
        fontSize: 16
    },
    button: {

    }
})