import React from "react";
import {View, Button, Text, StyleSheet, Linking, TouchableOpacity} from "react-native";
import AdminToken from "../../../services/AdminToken/AdminToken";
import AppContext from "../../../services/contexts/AppContext/AppContext";

export default class ContactItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book: {},
            confirming: false,
            confirmSuccess: false
        };
    };

    static contextType = AppContext; 
    
    componentDidMount(){
        this.setState({
            book: this.props.route.params.book
        })
    }

    resetItemState = ()=>{
        this.setState({
            confirming: false,
            confirmSuccess: false
        });
    }

    renderConfirmSuccess = ()=>{
        return (
            <View
                style={ItemStyle.success}>
                <Text
                    style={ItemStyle.textStyle}>Confirmed</Text>
                <Button
                    title="Ok"
                    onPress={this.resetItemState}></Button>
            </View>
        )
    }

    handleConfirm = () => {

        this.setState({
            confirming: true
        });

        AdminToken.getToken()
            .then( token => {

                fetch(`https://vast-atoll-11346.herokuapp.com/api/bookings/${this.props.route.params.book.id}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${token}`
                    },
                    body: JSON.stringify({
                        confirmed: true
                    })
                })
                    .then( res => {
                        if(!res.ok){
                            return res.json().then( e => Promise.reject(e));
                        };

                        return res.json();
                    })
                    .then( resData => {
                        const book = this.state.book;

                        book.confirmed = true;

                        this.context.loginAdmin()
                            .then( loggedIn => {
                                this.setState({
                                    book,
                                    confirming: false,
                                    confirmSuccess: true
                                });
                            })
                    })
                    .catch( err => {

                        this.setState({
                            error: err.error,
                            confirming: false
                        });

                    })
            })
    }

    renderOptions = ()=>{
        return (
            <View
                style={ItemStyle.options}>
                {!this.state.book.confirmed ? <Button
                    title="Confirm"
                    onPress={this.handleConfirm}></Button> : <Text style={ItemStyle.confirmed}>Confirmed</Text>}
                    
                <Button
                    title="Close"
                    onPress={()=>this.props.navigation.goBack()}></Button>
            </View>
        )
    }

    openPhone = ()=>{
        Linking.openURL(`tel://${this.props.route.params.book.mobile_number}`)
    }

    render(){
        
        return(
            <View
                style={ItemStyle.container}>

                
                <Text
                    style={ItemStyle.textStyle}>Name: {this.props.route.params.book.name}</Text>

                <Text
                    style={ItemStyle.textStyle}>Mobile number: {this.state.book.mobile_number}</Text>

                <Text
                    style={ItemStyle.textStyle}>Email: {this.props.route.params.book.email}</Text>

                <Text
                    style={ItemStyle.textStyle}>Set for: {new Date(this.props.route.params.book.date).toDateString()} {this.props.route.params.book.time}</Text>

                <Text
                    style={ItemStyle.lastText}>Message: {this.props.route.params.book.message}</Text>

                {this.state.confirming && !this.state.confirmSuccess ? <Text style={ItemStyle.loading}>Loading</Text> : <View></View>}

                {!this.state.confirming && !this.state.confirmSuccess ? this.renderOptions() : <View></View>}

                {!this.state.confirming && this.state.confirmSuccess ? this.renderConfirmSuccess() : <View></View>}

            </View>
        )
    }
}

const ItemStyle = StyleSheet.create({
    container: {
        position: "relative",
        top: "40%",
        transform: [
            {translateY: -50}
        ],
        width: "100%",
        minHeight: "40%",
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },
    loading: {
        textAlign: "center"
    },
    options: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom : 2,
        width: "100%"
    },
    success: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom : 2,
        width: "100%"
    },
    mobileNumber: {
        color: "skyblue",
        textDecorationLine: "underline"
    },
    textStyle: {
        fontSize: 16,
        marginVertical: 5,
        textAlign: "center"
    },
    lastText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 55
    },
    confirmed: {
        fontSize: 12,
        backgroundColor: "lightgrey",
        borderWidth: .5,
        borderColor: "grey",
        borderRadius: 4,
        width: 150,
        height: 38,
        textAlign: "center",
        alignSelf: "center",
        paddingVertical: 8,
        textAlignVertical: "center"
    }
})