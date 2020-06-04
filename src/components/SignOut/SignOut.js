import React from "react";
import {View, Button, StyleSheet, TouchableOpacity, Text, Dimensions} from "react-native";
import AdminToken from "../../services/AdminToken/AdminToken";
import {createStackNavigator} from "@react-navigation/stack";
import MenuIcon from "../MenuIcon/MenuIcon";
import AppContext from "../../services/contexts/AppContext/AppContext";

const Stack = createStackNavigator(); 

export default class SignOut extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static contextType = AppContext;

    handleSignOut = ()=>{
        AdminToken.deleteToken()
            .then( tokenDeleted => {
                this.context.signoutAdmin()
                    .then( signedOut => {
                        this.props.navigation.navigate("Log in")
                    })
            })
    }
    renderView = ()=>{
        return (
            <View
                style={SignOutStyle.container}>
                    <TouchableOpacity
                        style={SignOutStyle.button}
                        onPress={this.handleSignOut}>
                        <Text
                            style={SignOutStyle.text}>Sign Out</Text>
                    </TouchableOpacity>
            </View>
        )
    }
    render(){
        console.log(this.props)
        return (
            <Stack.Navigator
                initialRouteName="Sign Out">
                <Stack.Screen
                    name="Sign Out"
                    component={this.renderView}
                    options={{
                        headerRight: () => <MenuIcon navigation={this.props.navigation}/>
                    }}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}

const SignOutStyle = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    button: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: "50%",
        left: "50%",
        transform: [
            {translateX: -87.5},
            {translateY: -50}
        ],
        width: 175,
        height: 45,
        padding: 0,
        backgroundColor: "black"
    },
    text: {
        margin: 0,
        paddingBottom: 5,
        fontSize: 16,
        textAlign: "center",
        color: "red"
    }
})

