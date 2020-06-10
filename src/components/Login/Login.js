import React from "react";
import {Button, ScrollView, View, TextInput, Text, StyleSheet, TouchableOpacity, Keyboard} from "react-native";
import AdminToken from "../../services/AdminToken/AdminToken";
import AppContext from "../../services/contexts/AppContext/AppContext";
import {createStackNavigator} from "@react-navigation/stack";
import MenuIcon from "../MenuIcon/MenuIcon";

const Stack = createStackNavigator();

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            emailFocused: false,
            passwordFocused: false,
            error: ""
        }
    }

    static contextType = AppContext;

    handleEmail = (text) => {
        this.setState({
            email: text
        });
    };

    handlePassword = (text) => {
        this.setState({
            password: text
        });
    };

    handleLogin = ()=>{
        this.setState({
            loading: true,
            error: ""
        });

        if(!this.state.email){
            this.setState({
                emailFocused: false,
                passwordFocused: false,
                error: "Email is required",
                loading: false
            });

            return;
        };

        if(!this.state.password){
            this.setState({
                emailFocused: false,
                passwordFocused: false,
                error: "Password is required",
                loading: false
            });

            return;
        }

        fetch("https://vast-atoll-11346.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( res => {

                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                
                AdminToken.saveToken(resData.token)
                    .then( savedToken => {
                        this.context.loginAdmin()
                            .then( loggedIn => {
                                this.setState({
                                    loading: false
                                })
                            });
                    });
            })
            .catch( err => {
                this.setState({
                    error: err.error,
                    loading: false
                });
            })
    };

    focusEmail = ()=>{
        this.setState({
            emailFocused: true,
            passwordFocused: false
        })
    }

    focusPassword = ()=>{
        this.setState({
            emailFocused: false,
            passwordFocused: true
        })
    }

    unFocus = ()=>{
        Keyboard.dismiss();
        
        this.setState({
            emailFocused: false,
            passwordFocused: false
        });
    }

    render(){
        
        return (
            <View
                onTouchStart={this.unFocus}
                style={FormStyle.container}>

                <View
                    onTouchStart={this.unFocus}
                    style={FormStyle.form}>

                    <Text
                        style={FormStyle.headerText}>Log into your account</Text>

                    <TextInput 
                        onFocus={this.focusEmail}
                        style={{
                            ...FormStyle.input,
                            borderTopColor: "transparent",
                            borderRightColor: "transparent",
                            borderLeftColor: "transparent",
                            borderBottomColor: this.state.emailFocused ? "black" : "lightgrey",
                            borderWidth: this.state.emailFocused ? 3 : 1
                        }}
                        placeholder="Email"
                        onChangeText={this.handleEmail}
                        value={this.state.email}></TextInput>

                    <TextInput
                        onFocus={this.focusPassword}
                        style={{
                            ...FormStyle.input,
                            borderTopColor: "transparent",
                            borderRightColor: "transparent",
                            borderLeftColor: "transparent",
                            borderBottomColor: this.state.passwordFocused ? "black" : "lightgrey",
                            borderWidth: this.state.passwordFocused ? 3 : 1
                        }}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}
                        value={this.state.password}></TextInput>

                    {this.state.error ? <Text style={FormStyle.error}>{this.state.error}</Text> : <Text style={FormStyle.text}></Text>}

                    {this.state.loading ? <Text style={FormStyle.loading}>Loading</Text> : <TouchableOpacity style={FormStyle.button} onPress={this.handleLogin}><Text style={FormStyle.buttonText}>Log In</Text></TouchableOpacity>}

                </View>
            </View>
        )
    }
};

const FormStyle = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
    form: {
        position: "relative",
        top: "50%",
        alignSelf: "center",
        alignItems: "center",
        transform: [
            {translateY: - 200}
        ],
        width: 300,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 15,
        backgroundColor: "white"
    },
    headerText: {
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
        fontSize: 32,
        paddingHorizontal: 25
    },
    input: {
        width: 250,
        height: 45,
        borderWidth: 1,
        marginVertical: 10,
        paddingLeft: 10,
        borderWidth: 0,
        
    },
    text: {
        textAlign: "center",
        paddingHorizontal: 20,
        fontSize: 14,
        marginTop: 20,
        marginBottom: 35,
        color: "red"
    },
    loading: {
        textAlign: "center",
        paddingHorizontal: 20,
        fontSize: 14,
        marginTop: 20,
        marginBottom: 35
    },
    error: {
        textAlign: "center",
        paddingHorizontal: 20,
        fontSize: 14,
        marginTop: 20,
        marginBottom: 35,
        color: "red"
    },
    button: {
        width: 250,
        height: 45,
        backgroundColor: "#F6CECE",
        borderRadius: 25,
        marginBottom: 45,
        justifyContent: "center",
        alignContent: "center",
        padding: 0
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        margin: 0,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})