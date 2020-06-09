import React from "react";
import {Button, ScrollView, View, TextInput, Text, StyleSheet, TouchableOpacity} from "react-native";
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
        if(!this.state.email){
            this.setState({
                error: "Email is required"
            });

            return;
        };

        if(!this.state.password){
            this.setState({
                error: "Password is required"
            });

            return;
        }

        this.setState({
            loading: true,
            error: ""
        });

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

    render(){
        
        return (
            <View
                style={FormStyle.container}>

                <Text
                    style={FormStyle.headerText}>Log into your account</Text>

                <TextInput 
            
                    style={FormStyle.input}
                    placeholder="Email"
                    onChangeText={this.handleEmail}
                    value={this.state.email}></TextInput>

                <TextInput
                    style={FormStyle.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={this.handlePassword}
                    value={this.state.password}></TextInput>

                {this.state.error ? <Text style={FormStyle.text}>{this.state.error}</Text> : <Text style={FormStyle.text}></Text>}

                {this.state.loading ? <Text style={FormStyle.text}>Loading</Text> : <TouchableOpacity style={FormStyle.button} onPress={this.handleLogin}><Text style={FormStyle.buttonText}>Log In</Text></TouchableOpacity>}

            </View>
        )
    }
};

const FormStyle = StyleSheet.create({
    container: {
        position: "absolute",
        top: "50%",
        alignSelf: "center",
        alignItems: "center",
        transform: [
            {translateY: - 200}
        ],
        width: 300,
        borderWidth: 2,
        borderColor: "black",
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
        height: 40,
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
    button: {
        width: 200,
        height: 45,
        backgroundColor: "skyblue",
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