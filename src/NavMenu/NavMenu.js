import React from "react";
import {StyleSheet} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import AdminToken from "../services/AdminToken/AdminToken";
import AppContext from "../services/contexts/AppContext/AppContext";

//Import components here
import ContactsIcon from "../components/ContactsContainer/ContactsNotification/ContactsIcon";
import BookingIcon from "../components/BookingsContainer/BookingsNotification/BookingsIcon";
import Login from "../components/Login/Login";
import ContactsContainer from "../components/ContactsContainer/ContactsContainer";
import BookingsContainer from "../components/BookingsContainer/BookingsContainer";
import SignOut from "../components/SignOut/SignOut";

const Drawer = createDrawerNavigator();
const Stack = createDrawerNavigator();



export default class NavMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        };
    };

    static contextType = AppContext;

    renderLoggedInOptions = ()=>{
        return (
            <>
                <Drawer.Screen
                    name="Bookings Menu"
                    component={BookingsContainer}                    
                    options={{
                        drawerIcon: ({focused}) => <BookingIcon focused={focused} navigation={this.props.navigation}/>
                    }}></Drawer.Screen>

                <Drawer.Screen
                    name="Contacts Menu"
                    component={ContactsContainer}
                    options={{
                        drawerIcon: ({focused}) => <ContactsIcon focused={focused} navigation={this.props.navigation}/>
                    }}></Drawer.Screen>

                <Drawer.Screen
                    name="Sign Out Menu"
                    component={SignOut}
                    options={{
                        
                        title: "Sign Out"
                    }}></Drawer.Screen>
            </>
        )
    }

    renderLogIn = ()=>{
        return <Drawer.Screen
        name="Log In"
        component={Login}></Drawer.Screen>;
    }

    render(){

        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeBackgroundColor: "#F6CECE",
                    activeTintColor: "white",
                    inactiveTintColor: "black",
                    
                }}>
                    {this.context.isLoggedIn ? this.renderLoggedInOptions() : this.renderLogIn()}
            </Drawer.Navigator>
        )
    }
};

const NavStyle = StyleSheet.create({
    screenHightlisht: {
        backgroundColor: "#F6CECE"
    },
    screenText: {
        color: "white"
    }
})