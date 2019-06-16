import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card, CardSection } from './common';

export default props => {
    return(
        <Card>
            <CardSection />
            <CardSection />

            <CardSection>
                <Button>
                    Log in
                </Button>
            </CardSection>
        </Card>
    );
}