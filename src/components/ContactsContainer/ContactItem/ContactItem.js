import React from "react";
import {View, Button, Text, TouchableOpacity, Linking, StyleSheet} from "react-native";
import AdminToken from "../../../services/AdminToken/AdminToken";
import AppContext from "../../../services/contexts/AppContext/AppContext";

export default class ContactItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contact: this.props.route.params.contact,
            confirming: false,
            confirmSuccess: false
        };
    };

    static contextType = AppContext;

    componentDidMount(){

        this.setState({
            contact: this.props.route.params.contact
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

                <TouchableOpacity
                    style={ItemStyle.button}
                    onPress={this.resetItemState}>
                    <Text
                        style={ItemStyle.buttonText}>Ok</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleConfirm = () => {

        this.setState({
            confirming: true
        });

        AdminToken.getToken()
            .then( token => {
                
                fetch(`https://vast-atoll-11346.herokuapp.com/api/contact/${this.props.route.params.contact.id}`, {
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
                        
                        this.context.refreshContacts()
                            .then( loggedIn => {
                                const contact = this.state.contact;

                                contact.confirmed = true;

                                this.setState({
                                    contact,
                                    confirming: false,
                                    confirmSuccess: true
                                });

                            });
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
                {!this.state.contact.confirmed ? <TouchableOpacity
                    style={ItemStyle.button}
                    onPress={this.handleConfirm}>
                    <Text
                        style={ItemStyle.buttonText}>Confirm</Text>
                </TouchableOpacity> : <Text style={ItemStyle.confirmed}>Confirmed</Text>}

                <TouchableOpacity
                    style={ItemStyle.button}
                    onPress={() => this.props.navigation.goBack()}>
                    <Text
                        style={ItemStyle.buttonText}>Close</Text>
                </TouchableOpacity>

            </View>
        )
    }

    openMobileNumber = ()=>{
        Linking.openURL(`tel://${this.props.route.params.contact.mobile_number}`);
    };

    openEmail = ()=>{
        Linking.openURL(`mailto:${this.props.route.params.contact.email}`)
    }

    render(){
        
        return(
            <View
                style={ItemStyle.container}>
                <View 
                    style={ItemStyle.view}>

                    <Text
                        style={ItemStyle.textStyle}>Name: {this.props.route.params.contact.name}</Text>

                    <Text
                        style={ItemStyle.textStyle}>Mobile number: <Text style={ItemStyle.open} onPress={this.openMobileNumber}>{this.props.route.params.contact.mobile_number}</Text></Text>

                    <Text
                        style={ItemStyle.textStyle}>Email: <Text style={ItemStyle.open} onPress={this.openEmail}>{this.props.route.params.contact.email}</Text></Text>

                    <Text
                        style={ItemStyle.lastText}>Message: {this.props.route.params.contact.message}</Text>

                    {this.state.confirming && !this.state.confirmSuccess ? <Text style={ItemStyle.loading}>Loading</Text> : <Text></Text>}

                    {!this.state.confirming && !this.state.confirmSuccess ? this.renderOptions() : <Text></Text>}

                    {!this.state.confirming && this.state.confirmSuccess ? this.renderConfirmSuccess() : <Text></Text>}

                </View>
            </View>
        )
    }
}

const ItemStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    view: {
        position: "relative",
        top: "40%",
        transform: [
            {translateY: -50}
        ],
        width: "100%",
        minHeight: "40%",
        backgroundColor: "white"
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
    open: {
        color: "#F6CECE",
        textDecorationLine: "underline",
        color: "blue"
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
    },
    button: {
        width: 100,
        height: 40,
        borderRadius: 8,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#F6CECE"
    },
    buttonText: {
        fontSize: 16,
        textAlign: "center",
        color: "white"
    }
})