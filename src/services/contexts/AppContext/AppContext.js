import React from "react";
import AdminToken from "../../AdminToken/AdminToken";
import io from "socket.io-client/dist/socket.io";
import {useNavigation, NavigationContext} from "@react-navigation/native"

//Contexts

const AppContext = React.createContext({
    isLoggedIn: false,
    bookings: [],
    contacts: [],
    loginAdmin: ()=>{},
    signoutAdmin: ()=>{}
});

export default AppContext;

export class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isLoggedIn: false,
            bookings: [],
            contacts: [],
            loginAdmin: ()=>{},
            signoutAdmin: ()=>{},
            error: ""
        }
    }

    async componentDidMount(){
        
        return AdminToken.hasToken()
            .then( token => {

                if(token){

                    this.socket = io("https://vast-atoll-11346.herokuapp.com", { jsonp: false});

                    this.socket.on("contact", contact => {
                        
                        this.socketContacts(contact)
                            .then( refreshed => {

                                this.props.navigation.navigate("Contacts Menu", { screen: "New contacts appointment", initial: false});

                            })
                    });
    
                    this.socket.on("bookings", booking => {
                        
                        this.socketBookings(booking)
                            .then( refreshed => {
                                
                                this.props.navigation.navigate("Bookings Menu", { screen: "New bookings appointment", initial: false});

                            });
                    });

                    this.setState({
                        isLoggedIn: true
                    });


                    return Promise.all([fetch("https://vast-atoll-11346.herokuapp.com/api/bookings", {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${token}`
                    }
                }), fetch("https://vast-atoll-11346.herokuapp.com/api/contact", {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${token}`
                    }
                })])
                    .then(([bookingsRes, contactsRes]) => {
        
                        if(!bookingsRes.ok){
                            return bookingsRes.json().then( e => Promise.reject(e));
                        };
        
                        if(!contactsRes.ok){
                            return contactsRes.json().then( e => Promise.reject(e));
                        };
        
                        return Promise.all([bookingsRes.json(), contactsRes.json()]);
                    })
                    .then(([bookingsData, contactsData]) => {

                        return this.setState({
                            bookings: bookingsData.bookings,
                            contacts: contactsData.contacts
                        });

                    })
                    .catch( err => {
        
                        return this.setState({
                            error: err.error
                        });                
                    });
                }
            })
    }

    loginAdmin = async ()=>{

        AdminToken.hasToken()
            .then( token => {

                this.setState({
                    isLoggedIn: true
                });

                if(!this.socket){
                    this.socket = io("https://vast-atoll-11346.herokuapp.com", { jsonp: false});

                    this.socket.on("contact", contact => {
                        
                        this.socketContacts(contact)
                            .then( refreshed => {

                                this.props.navigation.navigate("Contacts Menu", { screen: "New contacts appointment", initial: false});

                            })
                    });
    
                    this.socket.on("bookings", booking => {
                        
                        this.socketBookings(booking)
                            .then( refreshed => {
                                
                                this.props.navigation.navigate("Bookings Menu", { screen: "New bookings appointment", initial: false});

                            });
                    });

                };
        
                return Promise.all([fetch("https://vast-atoll-11346.herokuapp.com/api/bookings", {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${token}`
                    }
                }), fetch("https://vast-atoll-11346.herokuapp.com/api/contact", {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${token}`
                    }
                })])
                    .then(([bookingsRes, contactsRes]) => {
        
                        if(!bookingsRes.ok){
                            return bookingsRes.json().then( e => Promise.reject(e));
                        };
        
                        if(!contactsRes.ok){
                            return contactsRes.json().then( e => Promise.reject(e));
                        };
        
                        return Promise.all([bookingsRes.json(), contactsRes.json()]);
                    })
                    .then(([bookingsData, contactsData]) => {
                        
                        this.props.refresh();

                        return this.setState({
                            bookings: bookingsData.bookings,
                            contacts: contactsData.contacts
                        });
                    })
                    .catch( err => {
        
                        return this.setState({
                            error: err.error
                        });                
                    });
            })
    }

    socketBookings = async (book) => {
        const bookings = this.state.bookings;

        bookings.push(book);

        return AdminToken.getToken()   
        .then( token => {
            return fetch("https://vast-atoll-11346.herokuapp.com/api/bookings", {
                headers: {
                    'content-type': "application/json",
                    'authorization': `bearer ${token}`
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
                        bookings: resData.bookings
                    })
                })
                .catch( err => {
                    return this.setState({
                        error: err.error
                    });
                })
        });
    }

    socketContacts = async (contact) => {
        const contacts = this.state.contacts;

        contacts.push(contact);

        return AdminToken.getToken()   
        .then( token => {
            return fetch("https://vast-atoll-11346.herokuapp.com/api/contacts", {
                headers: {
                    'content-type': "application/json",
                    'authorization': `bearer ${token}`
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
                        contacts: resData.contacts
                    })
                })
                .catch( err => {
                    return this.setState({
                        error: err.error
                    });
                })
        });
    }

    signoutAdmin = async ()=>{
        
        return await this.setState({
            isLoggedIn: false,
            bookings: [],
            contacts: []
        });
    }

    render(){
        const value = {
            isLoggedIn: this.state.isLoggedIn,
            bookings: this.state.bookings,
            contacts: this.state.contacts,
            loginAdmin: this.loginAdmin,
            signoutAdmin: this.signoutAdmin,
        };
        
        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}