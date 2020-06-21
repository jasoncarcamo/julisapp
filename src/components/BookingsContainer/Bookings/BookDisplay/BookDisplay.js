import React from "react";
import {View, Button, Text, StyleSheet, TouchableOpacity} from "react-native";
import AppContext from "../../../../services/contexts/AppContext/AppContext";

export default class BookDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            error: ""
        };
    };

    static contextType = AppContext;

    handleView = () => {
        this.props.navigation.navigate("Book Main", { 
            screen: "Book item", 
            params: {
                book: this.props.book
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

        if(hours === 12){
            typeOfDay = "PM";
        }

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
                    style={DisplayItem.newHeader}>{this.props.new ? "New" : ""}</Text>

                <Text
                    style={DisplayItem.textName}>{this.props.book.name}</Text>

                <Text
                    style={DisplayItem.text}>Email: {this.props.book.email}</Text>

                <Text
                    style={DisplayItem.date}>Date created: {new Date(this.props.book.date_created).toDateString()} {this.renderTime(new Date(this.props.book.date_created))}</Text>

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
        marginVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        backgroundColor: "white"
    },
    newHeader: {
        fontSize: 25,
        textAlign: "center"
    },
    textName: {
        position: "relative",
        top: 0,
        fontSize: 19,
        fontWeight: "bold",
        marginLeft: 0,
        paddingVertical: 15,
        paddingLeft: 30,
        backgroundColor: "whitesmoke",
        borderWidth: 0,
        borderColor: "grey"
    },
    text: {
        marginTop: 10,
        marginBottom: 7,
        fontSize: 16,
        marginLeft: 30
    },
    date: {
        fontSize: 14,
        marginLeft: 30,
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