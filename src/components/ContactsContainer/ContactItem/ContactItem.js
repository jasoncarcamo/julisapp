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
        console.log(this.props.route.params.contact)
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
                        
                        this.context.loginAdmin()
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
                {!this.state.contact.confirmed ? <Button
                    title="Confirm"
                    onPress={this.handleConfirm}></Button> : <Text style={ItemStyle.confirmed}>Confirmed</Text>}

                <Button
                    title="Close"
                    onPress={()=>this.props.navigation.goBack()}></Button>
            </View>
        )
    }

    openMobileNumber = ()=>{
        Linking.openURL(`tel://${this.props.route.params.contact.mobile_number}`);
    };

    render(){
        console.log(this.props)
        return(
            <View 
                style={ItemStyle.container}>

                <Text
                    style={ItemStyle.textStyle}>Name: {this.props.route.params.contact.name}</Text>

                <Text
                    style={ItemStyle.textStyle}>Mobile number: {this.props.route.params.contact.mobile_number}</Text>

                <Text
                    style={ItemStyle.textStyle}>Email: {this.props.route.params.contact.email}</Text>

                <Text
                    style={ItemStyle.lastText}>Message: {this.props.route.params.contact.message}</Text>

                {this.state.confirming && !this.state.confirmSuccess ? <Text style={ItemStyle.loading}>Loading</Text> : <Text></Text>}

                {!this.state.confirming && !this.state.confirmSuccess ? this.renderOptions() : <Text></Text>}

                {!this.state.confirming && this.state.confirmSuccess ? this.renderConfirmSuccess() : <Text></Text>}

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