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
        this.setState({
            loading: true
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
                    style={{
                        textAlign: "center",
                        marginTop: 30,
                        marginBottom: 20,
                        fontSize: 30
                    }}>Log into your account</Text>

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
            {translateY: - 100}
        ],
        width: 325,
        borderWidth: 2,
        borderColor: "black"
    },
    input: {
        width: 250,
        height: 40,
        borderWidth: 1,
        marginVertical: 10,
        paddingLeft: 10
    },
    text: {
        textAlign: "center",
        marginVertical: 10,
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: "skyblue",
        borderRadius: 4,
        marginBottom: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 0
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        margin: 0,
        textAlignVertical: "center",
        justifyContent: "center"
    }
})