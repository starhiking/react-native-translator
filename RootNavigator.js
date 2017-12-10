import React from 'react';
import { Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import Sentences from './Sentences';

// Feature: screen navigation
const RootNavigator = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: '翻译(Translation)'
        }
    },
    Sentences: {
        screen: Sentences,
        navigationOptions: {
            headerTitle: 'Daily Sentences'
        }
    }
});

export default RootNavigator;