import React from "react";
import {ScrollView, Text, Button, View, TouchableOpacity, StyleSheet} from "react-native";
import AppContext from "../../../services/contexts/AppContext/AppContext";
import ContactDisplay from "./ContactDisplay/ContactDisplay";

export default class Contacts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewNew: true, 
            viewConfirmed: false,
            contacts: []
        };
    };

    static contextType = AppContext;

    componentDidMount(){
    }

    renderNewItems = (contacts) => {
        let contactItems = contacts;

        contactItems = contactItems.filter((contact, index)=> contact.confirmed === false);

        if(contactItems.length === 0){
            return (
                <Text
                    style={ItemsStyle.textStyle}>You have not recieved new contacts.</Text>
            );
        };

        contactItems = contactItems.map(( contact, index) => contact.confirmed === false ? <ContactDisplay key={index} contact={contact} navigation={this.props.navigation}></ContactDisplay> : <View></View>);

        return contactItems;
    }

    renderItems = (contacts) => {
        let contactItems = contacts;

        contactItems = contactItems.filter((contact, index)=> contact.confirmed === true);

        if(contactItems.length === 0){
            return (
                <Text
                    style={ItemsStyle.textStyle}>You have not confirmed contacts yet.</Text>
            );
        };

        contactItems = contactItems.map((contact, index) => contact.confirmed === true ? <ContactDisplay key={index} contact={contact} navigation={this.props.navigation}></ContactDisplay> : <View></View>);

        return contactItems;
    }

    activateNew = ()=>{
        this.setState({
            viewNew: true,
            viewConfirmed: false
        });
    }

    activateConfirmed = ()=>{
        this.setState({
            viewNew: false,
            viewConfirmed: true
        })
    }

    render(){
        
        return (
            <ScrollView>
                
                <View
                    style={ItemsStyle.container}>
                    <TouchableOpacity
                        style={{
                            ...ItemsStyle.containerButtonNew,
                            backgroundColor: this.state.viewNew ? "#F6CECE" : "white",
                            borderWidth: this.state.viewNew ? 0 : 1
                        }}
                        onPress={this.activateNew}>
                        <Text
                            style={{
                                ...ItemsStyle.containerText,
                                color: this.state.viewNew ? "white" : "black"
                            }}>New</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            ...ItemsStyle.containerButtonConfirmed,
                            backgroundColor: this.state.viewConfirmed ? "#F6CECE" : "white",
                            borderWidth: this.state.viewConfirmed ? 0 : 1
                        }}
                        onPress={this.activateConfirmed}>
                        <Text
                            style={{
                                ...ItemsStyle.containerText,
                                color: this.state.viewConfirmed ? "white" : "black"
                            }}>Confirmed</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    {this.state.viewNew ? this.renderNewItems(this.context.contacts) : <View></View>}

                    {this.state.viewConfirmed ? this.renderItems(this.context.contacts) : <View></View>}
                </View>
    
            </ScrollView>
        );
    };
};

const ItemsStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flex: 1,
        width: "100%",
        marginVertical: 40
    },
    containerButtonNew: {
        width: 115,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 5,
        backgroundColor: "white"
    },
    containerButtonConfirmed: {
        width: 115,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 5,
        
    },
    containerText: {
        fontSize: 20,
        textAlign: "center"
    },
    child: {
        width: "50%",
        borderWidth: 1,
        borderColor: "black"
    },
    textStyle: {
        marginHorizontal: 40,
        fontSize: 16,
        textAlign: "center"
    }
});