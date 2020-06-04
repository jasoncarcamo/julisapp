import React from "react";
import {View, Button, Text, StyleSheet} from "react-native";
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

                <Button
                    title="View"
                    onPress={this.handleView}></Button>
            </View>
        )
    }
}

const DisplayItem = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "lightgrey"
    },
    text: {
        marginTop: 30,
        marginBottom: 15,
        fontSize: 16,
        textAlign: "center"
    },
    date: {
        textAlign: "center",
        marginBottom: 9
    },
    loading: {
        marginVertical: 15,
        textAlign: "center"
    }
});

export default ContactDisplay;