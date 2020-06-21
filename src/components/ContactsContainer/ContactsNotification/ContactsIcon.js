import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import AppContext from "../../../services/contexts/AppContext/AppContext";

export default class ContactsIcon extends React.Component{

    static contextType = AppContext;

    unconfirmedAmount = (allContacts)=>{
        let contacts = allContacts;

        contacts = contacts.filter((contact)=> contact.confirmed === false);

        return contacts.length;
    }

    render(){

        return (
            <TouchableOpacity
                style={{
                    ...IconStyle.container,
                    backgroundColor: this.unconfirmedAmount(this.context.contacts) > 0 ? "red" : "transparent"
                }}
                onPress={()=> {}}>
                <Text
                    style={IconStyle.text}>{this.unconfirmedAmount(this.context.contacts) > 0 ? this.unconfirmedAmount(this.context.contacts) : ""}</Text>
            </TouchableOpacity>
        )
    }
};

const IconStyle = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
        marginLeft: 20,
        marginRight: -20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 16
    }
});