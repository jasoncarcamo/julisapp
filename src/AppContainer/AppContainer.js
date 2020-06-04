import React from "react";
import {Vibration} from "react-native";
import ExpoToken from "../services/ExpoToken/ExpoToken";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import AppContext, {AppProvider} from "../services/contexts/AppContext/AppContext";

import NavMenu from "../NavMenu/NavMenu";
import AdminToken from "../services/AdminToken/AdminToken";

export default class AppContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            expoToken: "",
            notification: ""
        }
    }

    componentDidMount(){
        AdminToken.hasToken()
            .then( adminToken => {

                if(adminToken){
                    ExpoToken.getToken()
                        .then( expoToken => {
                            if(expoToken){
                                this.setState({
                                    expoToken
                                });

                            } else {
                                this.registerForPushNotificationsAsync();
                            }



                            
                            this._notificationSubscription = Notifications.addListener(this._handleNotification);


                        });
                };
            })
    }

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          };

          if (finalStatus !== 'granted') {

            alert('Failed to get push token for push notification!');

            return;
          }

          token = await Notifications.getExpoPushTokenAsync();

          fetch("https://vast-atoll-11346.herokuapp.com/api/expo", {
              method: "POST",
              headers: {
                  'content-type': "application/json"
              },
              body: JSON.stringify({
                  expo_token: token
              })
          })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                ExpoToken.saveToken(token)
                .then( savedToken => {

                    this.setState({
                        expoToken: token 
                    });

                    if (Platform.OS === 'android') {
                        Notifications.createChannelAndroidAsync('default', {
                          name: 'default',
                          sound: true,
                          priority: 'max',
                          vibrate: [0, 250, 250, 250],
                        });
                    };
                })
            })
            .catch( err => {
                this.setState({
                    error: err.error
                })
            });
          
        } else {
          alert('Must use physical device for Push Notifications');
        };
    };

    _handleNotification = notification => {
        Vibration.vibrate();

        this.setState({ 
            notification: notification 
        });
    };

    render(){
        (this.state)
        return (
            <AppProvider refresh={this.componentDidMount} navigation={this.props.navigation} expoToken={this.state.expoToken}>
                <NavMenu/>
            </AppProvider>
        )
    }
}