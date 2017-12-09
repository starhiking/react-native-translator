/**
 * Author: Lan Xing
 * Description:This component height will auto grow
 *      props : queryText(defaultValue in textInput)
 */

import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class AutoExpandingInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 100,
        };
    }

    onContentSizeChange(event) {
        this.setState({ height: event.nativeEvent.contentSize.height });
    }

    render() {
        return (
            <TextInput {...this.props}
                multiline={true}
                onContentSizeChange={this.onContentSizeChange.bind(this)}
                style={[styles.edit, { height: Math.max(100, this.state.height) }]}
                defaultValue={this.props.queryValue}
                underlineColorAndroid='transparent'
                placeholder="输入文字(Type here)"
            />
        );
    }
}

const styles = StyleSheet.create({
    edit: {
        flex: 1,
        fontSize: 25,
        backgroundColor: '#ccc',
    }
});
