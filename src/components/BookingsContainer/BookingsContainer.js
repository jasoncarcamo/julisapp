import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import BookItem from "./BookItem/Booktem";
import Bookings from "./Bookings/Bookings";
import MenuIcon from "../MenuIcon/MenuIcon";
import BookingsNotification from "./BookingsNotification/BookingsNotification";

const Stack = createStackNavigator();



export default class BookingsContainer extends React.Component{

    renderMainScreens = ()=>{
        return (
            <Stack.Navigator
                initialRouteName="Bookings">
                <Stack.Screen
                    name="Bookings"
                    component={Bookings}
                    options={{
                        headerRight: ()=> <MenuIcon navigation={this.props.navigation}/>
                    }}></Stack.Screen>

                <Stack.Screen
                    name="Book item"
                    component={BookItem}
                    options={{
                        headerShown: false
                    }}></Stack.Screen>
            </Stack.Navigator>
        )
    };

    render(){

        return (
            <Stack.Navigator
                initialRouteName="Book Main">
                <Stack.Screen
                    name="Book Main"
                    options={{
                        headerShown: false
                    }}
                    component={this.renderMainScreens}></Stack.Screen>
                
                <Stack.Screen
                    name="New bookings appointment"
                    component={BookingsNotification}
                    options={{
                        headerShown: false
                    }}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}