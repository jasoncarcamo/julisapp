import React from "react";
import {View, Button, Text, StyleSheet, TouchableOpacity} from "react-native";
import AppContext from "../../../../services/contexts/AppContext/AppContext";

class ContactDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            error: ""
        };
    };

    static contextType = AppContext;

    handleView = () => {
        this.props.navigation.navigate("Contact Main", {
            screen: "Contact item",
            params: {
                contact: this.props.contact
            }
        });
    }

    renderTime = (date)=>{
        let typeOfDay;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        
        if(hours === 0){
            hours = 12;
        };

        if(hours < 12){
            typeOfDay = "AM";
        }

        if(hours > 12){
            hours -= 12;

            typeOfDay = "PM";
        };

        if(minutes < 10){
            minutes = `0${minutes}`;
            
        }

        return `${hours}:${minutes} ${typeOfDay}`
    }

    render(){
        
        return(
            <View 
                style={DisplayItem.container}>
                
                <Text
                    style={DisplayItem.text}>Email: {this.props.contact.email}</Text>

                <Text
                    style={DisplayItem.date}>Date created: {new Date(this.props.contact.date_created).toDateString()} {this.renderTime(new Date(this.props.contact.date_created))}</Text>

                <TouchableOpacity
                    style={DisplayItem.button}
                    onPress={this.handleView}>
                    <Text
                        style={DisplayItem.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const DisplayItem = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "lightgrey",
        backgroundColor: "white"
    },
    text: {
        marginTop: 30,
        marginBottom: 7,
        fontSize: 16,
        textAlign: "center"
    },
    date: {
        textAlign: "center",
        marginBottom: 7
    },
    loading: {
        marginVertical: 15,
        textAlign: "center"
    },
    button: {
        width: "100%",
        height: 45,
        backgroundColor: "#F6CECE",
        alignSelf: "center",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        color: "white"
    }
})

export default ContactDisplay;