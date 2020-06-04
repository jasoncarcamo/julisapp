import React from "react";
import Contacts from "./Contacts/Contacts";
import {createStackNavigator} from "@react-navigation/stack";
import ContactItem from "./ContactItem/ContactItem";
import MenuIcon from "../MenuIcon/MenuIcon";
import ContactsNotification from "./ContactsNotification/ContactsNotification";

const Stack = createStackNavigator();

export default class ContactsContainer extends React.Component{
    renderMainScreens = () => {
        return (
            <Stack.Navigator
                initialRouteName="Contacts">
                <Stack.Screen
                    name="Contacts"
                    component={Contacts}
                    options={{
                        headerRight: ()=> <MenuIcon navigation={this.props.navigation}/>
                    }}></Stack.Screen>

                <Stack.Screen
                    name="Contact item"
                    component={ContactItem}
                    options={{
                        headerShown: false
                    }}></Stack.Screen>
            </Stack.Navigator>
        )
    }
    render(){
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Contact Main"
                    component={this.renderMainScreens}
                    options={{
                        headerShown: false
                    }}></Stack.Screen>

                <Stack.Screen
                    name="New contacts appointment"
                    component={ContactsNotification}
                    options={{
                        headerShown: false
                    }}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}