/**
 * Author: Yan Nan
 * Description:
 *     Fetch some English-Chinese sentences from www.iciba.com.
 *     Beautified by 'Card' from 'react-native-elements'
 */

import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import getDailySentence from './app/lib/daily-sentence';

const Sentence = ({ item, index }) => (
    <Card title={item.date} image={{ uri: item.image }} >
        <Text style={styles.english}> {'    ' + item.sentence} </Text>
        <Text style={styles.chinese}> {'    ' + item.translation} </Text>
    </Card>
);

export default class Sentences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyData: null,
        };
    }

    componentDidMount() {
        getDailySentence(5).then(result => {
            this.setState({
                dailyData: result,
            });
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.dailyData}
                    renderItem={Sentence}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    english: {
        marginBottom: 10,
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    chinese: {
        marginBottom: 10,
        fontSize: 18
    }
});