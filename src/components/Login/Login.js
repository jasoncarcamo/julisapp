import React from "react";
import {Button, ScrollView, View, TextInput, Text} from "react-native";
import AdminToken from "../../services/AdminToken/AdminToken";
import AppContext from "../../services/contexts/AppContext/AppContext";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
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
                                
                            });
                    });
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            })
    }

    render(){
        
        return (
            <ScrollView>

                <View>

                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 40,
                            marginBottom: 20,
                            fontSize: 30
                        }}>Log into account</Text>

                    <TextInput
                        placeholder="Email"
                        onChangeText={this.handleEmail}
                        value={this.state.email}></TextInput>

                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}
                        value={this.state.password}></TextInput>

                    <Button
                        title="Log in"
                        onPress={this.handleLogin}></Button>

                </View>

            </ScrollView>
        )
    }
}