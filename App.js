import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import baidu from './app/lib/baidu';
import google from './app/lib/google';
import youdao from './app/lib/youdao';
import { dir } from './app/lib/yukimilib';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            text: 'Hello World!'
        };
    }

    componentDidMount() {
        baidu('show', 'en', 'zh').then(result => {
            alert(JSON.stringify(result, null, 4).toString());

            google('show', 'en', 'zh').then(result => {
                alert(JSON.stringify(result, null, 4).toString());

                youdao('show', 'en', 'zh').then(result => {
                    alert(JSON.stringify(result, null, 4).toString());

                });
            });
        });
    }

    render() {
        return (
            <Text> {this.state.text} </Text>
        );
    }
}