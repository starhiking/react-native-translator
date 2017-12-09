/**
 * Author: Lan Xing
 * Description: This component connects the API and show API data
 * API is a object which deposit data from api
 *      props:API(baidu,google,youdao)
 *      API:from
 *          to
 *          src
 *          dst
 *          parts
 *          sentences
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import language from '../lib/language';

export default class APINetDataCom extends Component {
    constructor(props) {
        super(props);
    }

    renderExpenseItem(item, i) {
        return <View key={i}><Text style ={{fontSize:18}} key={i}>{item}</Text></View>;
    }

    render() {
        var API = this.props.API;
        if (API == null) return <View />;
        else return (
            <View>
                <Text style={{ fontSize: 22, color: '#6699CC' }}>{API.engine}:</Text>
                <View>
                    <Text >{language.from[API.from]}-->{language.to[API.to]}</Text>
                    <Text style ={{fontSize:18}} >{API.src}:{API.dst}</Text>
                    <View>
                        {
                            API.parts.map((mean, i) => this.renderExpenseItem(mean, i))
                        }
                    </View>
                </View>
            </View>
        );
    }
}