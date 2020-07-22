import React from "react";
import {Vibration, Alert} from "react-native";
import ExpoToken from "../services/ExpoToken/ExpoToken";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {StatusBar} from "react-native";
import * as Device from "expo-device";

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
        if(!Device.brand){
            return;
        };

        this.checkForToken();

        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    checkForToken = async ()=>{
        
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
  
            if (existingStatus !== 'granted') {
              const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
              finalStatus = status;
            };
  
            if (finalStatus !== 'granted') {
              
              return;
            }
  
            let token = await Notifications.getDevicePushTokenAsync();
            
            return fetch(`https://vast-atoll-11346.herokuapp.com/api/expo/${token.data}`, {
                headers: {
                    'content-type': "application/json"
                }
            })
                .then( res => {
                    if(!res.ok){
                        return res.json().then( e => Promise.reject(e));
                    };

                    return res.json();
                })
                .then( resData => {
                    return this.setState({
                        expoToken: resData.token
                    })
                })
                .catch( err => {
                    this.registerForPushNotificationsAsync();
                });
        }
    };

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          };

          if (finalStatus !== 'granted') {
            
            return;
          }

          let token = await Notifications.getDevicePushTokenAsync();
          
          return fetch("https://vast-atoll-11346.herokuapp.com/api/expo", {
              method: "POST",
              headers: {
                  'content-type': "application/json"
              },
              body: JSON.stringify({
                  expo_token: token.data
              })
          })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                
                ExpoToken.saveToken(token.data)
                .then( savedToken => {

                    this.setState({
                        expoToken: token.data 
                    });

                    if (Platform.OS === 'android') {
                        Notifications.createChannelAndroidAsync('default', {
                          name: 'default',
                          sound: true,
                          priority: 'max',
                          vibrate: [0, 250, 250, 250],
                        });
                    };

                    return;
                })
            })
            .catch( err => {
                this.setState({
                    error: err.error
                })

                return;
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
        
        return (
            <AppProvider refresh={this.componentDidMount} navigation={this.props.navigation} expoToken={this.state.expoToken}>
                <NavMenu navigation={this.props.navigation}/>
                <StatusBar hidden={true}/>
            </AppProvider>
        );
    }
}