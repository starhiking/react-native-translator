/**
 * Author: Yan Nan
 * Description:
 *     MultiSelector is a View contains multiple checkboxes, it's children components are:
 *       - multiple checkboxes: texted by props.choice, control state.status
 *       - a 'done' button: return state.status to father's 'onDone' function when pressed
 *     props:
 *       - (required) choice: a list [['text1', 'statusName1'], ['text2', 'statusName2'], ...]
 *       - (optional) defaultSelected: a list, which checkboxes are initially selected
 *       - (required) onDone: a function receive state.status
 *       - (required) flex: size of this component
 */

import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';

export default class MultiSelector extends Component {
    constructor(props) {
        super(props);
        props.defaultSelected = props.defaultSelected || []
        this.state = {
            status: {},
            buttonDisabled: props.defaultSelected.length === 0,
            buttonTitle: props.defaultSelected.length === 0 ? '至少选择一个(At least one)' : '完成(Done)'
        };
        // set all checkboxes' status false
        props.choice.forEach(item => { this.state.status[item[1]] = false; });
        // set those default selected boxes true
        props.defaultSelected.forEach(value => { this.state.status[value] = true; });
    }

    onSelect(item) {
        this.setState((prevState) => {
            // deep copy of prevState.status
            prevState.status = JSON.parse(JSON.stringify(prevState.status));
            prevState.status[item[1]] = !prevState.status[item[1]];

            // count how many boxes are selected
            let count = 0;
            for (let k in prevState.status) {
                count += prevState.status[k];
            }

            prevState.buttonDisabled = count === 0;
            prevState.buttonTitle = count === 0 ? '至少选择一个(At least one)' : '完成(Done)';

            return prevState;
        });
    }

    _renderItem = ({ item }) => (
        <CheckBox
            center
            title={item[0]}
            checked={this.state.status[item[1]]}
            onPress={() => this.onSelect(item)}
            onIconPress={() => this.onSelect(item)}
        />
    );

    render() {
        return (
            <View style={{ flex: this.props.flex, backgroundColor: 'white' }}>
                <View>
                    <FlatList
                        data={this.props.choice}
                        // [my own note, ignore it] why use extraData:
                        // 给FlatList指定extraData={this.state}属性，是为了保证state.selected变化时，
                        // 能够正确触发FlatList的更新。如果不指定此属性，则FlatList不会触发更新，
                        // 因为它是一个PureComponent，其props在===比较中没有变化则不会触发更新。
                        extraData={this.state.status}
                        keyExtractor={(item, index) => index}
                        renderItem={this._renderItem}
                    />
                </View>
                <Button
                    raised
                    disabled={this.state.buttonDisabled}
                    title={this.state.buttonTitle}
                    onPress={() => this.props.onDone(this.state.status)}
                    backgroundColor={'#4d90fe'}
                    icon={{ name: 'done-all' }}
                    fontSize={20}
                />
            </View>
        );
    }
}