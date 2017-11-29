import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import google from './app/lib/google-translate-api';
import { dir } from './app/lib/yukimilib';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            text: dir(google.languages)
        };
    }

    componentDidMount() {
        google('Chinese', { to: 'zh-cn', raw: true }).then(res => {
            const json_string = JSON.stringify(JSON.parse(res.raw), null, 4).toString();
            alert(json_string);
        }).catch(err => {
            alert(err);
        });
    }

    render() {
        return (
            <Text> {this.state.text} </Text>
        );
    }
}