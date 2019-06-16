import React, { useState } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';


export default props => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const renderButton = () => {
        if(loading) return <Spinner size="small" />;
        return(
            <Button
                onPress={ onButtonPress }
            //    onPress={ () => onButtonPress() } 
            >
                Log in
            </Button>
        );
    }

    const onButtonPress = () => {

        setError('');
        setLoading(true);

        // Promise
        // Try Sign In.
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('signin!!!') 
                onLoginSuccess()
            })
            .catch(() => {
                // Once we fail to signIn => it will guide us to SignUp
                firebase.auth().createUserWithEmailAndPassword(email, password)
                // Once we fail to create Signup, show an error message.
                .then(() => onLoginSuccess())
                .catch(() => onLoginFail());
                    // setError('Unable to create your authentication.');
        
            });
    }

    const onLoginFail = () => {
        setError('Unable to create your authentication.');
        setLoading(false);
    }

    const onLoginSuccess = () => {
        setEmail('');
        setPassword('');
        setLoading(false);
        // just in case that the errro is generated for anther reason.
        setError('');
    }

    return(
        <Card>
            <CardSection>
            {/* For android height must be more than 40 */}
                <Input
                    placeholder="example@example.com"
                    label="Email"
                    value={ email }
                    onChangeText={ email => setEmail(email) }
                />
            </CardSection>
                
            <CardSection>
                <Input
                    // In boolean value, when the key exists, it is automatically "true"
                    secureTextEntry
                    placeholder="Your password"
                    label="Password"
                    value={ password }
                    onChangeText={ password => setPassword(password) }
                />
            </CardSection>
            
            {
                error ? ( <Text style={ styles.errorTextStyle }>
                    { error }
                </Text>) : null
            }
           
            <CardSection>
               {/*  <Button
                    onPress={ onButtonPress }
                //    onPress={ () => onButtonPress() } 
                >
                    Log in
                </Button> */}
                { renderButton() }
            </CardSection>
        </Card>
    );
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}