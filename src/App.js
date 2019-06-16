import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

// Getting firebase
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

import { firebaseConfig } from './components/config';


export default () => {

    useEffect(() => {
        //  copy and paset config from firebase website.
        firebase.initializeApp(firebaseConfig);

    }, []);

    return(
        <View>
            <Header headerText="Authentication" />
            <LoginForm />
        </View>
    );
}