import React from "react";
import {ScrollView, Text, Button, View, StyleSheet, TouchableOpacity} from "react-native";
import AppContext from "../../../services/contexts/AppContext/AppContext";
import BookDisplay from "./BookDisplay/BookDisplay";

export default class Contacts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            viewNew: true, 
            viewConfirmed: false,
            bookings: []
        };
    };

    static contextType = AppContext;

    componentDidMount(){
    }

    renderNewItems = (bookings) => {
        let bookItems = bookings;

        bookItems = bookItems.filter((book, index)=> book.confirmed === false);

        if(bookItems.length === 0){
            return (
                <Text
                    style={ItemsStyle.textStyle}>You have not recieved new bookings.</Text>
            );
        };

        bookItems = bookItems.map((book, index) => book.confirmed === false ? <BookDisplay key={index} book={book} navigation={this.props.navigation}></BookDisplay> : <View></View>);

        return bookItems;
    }

    renderItems = (bookings) => {
        let bookItems = bookings;

        bookItems = bookItems.filter((book, index)=> book.confirmed === true);

        if(bookItems.length === 0){
            return (
                <Text
                    style={ItemsStyle.textStyle}>You have not confirmed bookings yet.</Text>
            );
        };

        bookItems = bookItems.map((book, index) => book.confirmed === true ? <BookDisplay key={index} book={book} navigation={this.props.navigation}></BookDisplay> : <View></View>);

        return bookItems;
    }

    activateNew = ()=>{
        this.setState({
            viewNew: true,
            viewConfirmed: false
        })
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
                        style={ItemsStyle.containerButton}
                        onPress={this.activateNew}>
                        <Text
                            style={ItemsStyle.containerText}>New</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ItemsStyle.containerButton}
                        onPress={this.activateConfirmed}>
                        <Text
                            style={ItemsStyle.containerText}>Confirmed</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    {this.state.viewNew ? this.renderNewItems(this.context.bookings) : <View></View>}

                    {this.state.viewConfirmed ? this.renderItems(this.context.bookings) : <View></View>}
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
    containerButton: {
        width: 115,
        borderWidth: 1,
        borderColor: "black",
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
})