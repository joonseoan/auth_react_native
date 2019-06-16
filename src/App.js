import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// Getting firebase
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection, Card } from './components/common';
import LoginForm from './components/LoginForm';

import { firebaseConfig } from './components/config';

export default () => {

    const [ loggedIn, setLoggedIn ] = useState(null);

    useEffect(() => {
        //  copy and paset config from firebase website.
        firebase.initializeApp(firebaseConfig);
        
        // eventHandler when user signed in and signed out
        // It is from firebase
        firebase.auth().onAuthStateChanged(user => {
            console.log('user: ', user);
            if(user) { 
                setLoggedIn(true)
            } else {
                setLoggedIn(false);
            }
        });

        // initFirebase();

    }, []);

    const renderContent = () => {

        switch (loggedIn) {
            case true:
                return(
                    <Card>
                        <CardSection>
                            <Button 
                                onPress={ () => firebase.auth().signOut() }
                            >
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
            case false:
                return <LoginForm />;

            default:
                // Spinner: large
                return <Spinner />;
        }

       
    }

    // We do not need to use this function because it is just async, not promise!!!
    // initFirebase = () => {
    //     firebase.initializeApp(firebaseConfig);
    // }

    return(
        <View>
            <Header headerText="Authentication" />
            {/* <LoginForm /> */}
            { renderContent() }
        </View>
    );
}