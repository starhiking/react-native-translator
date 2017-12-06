import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, Image, TouchableHighlight, TextInput } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import language from './app/lib/language';

class AutoExpandingInput extends Component {
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
                onChange={this.onChange}
                onContentSizeChange={this.onContentSizeChange.bind(this)}
                style={[styles.edit, { height: Math.max(100, this.state.height) }]}
                value={this.state.text}
                underlineColorAndroid='transparent'
                placeholder="输入文字即可翻译"
            />
        );
    }
}

class App extends Component {

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>

                    <ModalDropdown style={styles.dropdown}
                        textStyle={styles.dropdown_text}
                        dropdownStyle={styles.dropdown_dropdown}
                        options={language.from}
                        defaultValue={'源语言'}
                    />

                    <TouchableHighlight style={styles.btn} onPress={() => { }}>
                        <Text>
                            翻译接口
                        </Text>
                    </TouchableHighlight>

                    <ModalDropdown style={styles.dropdown}
                        textStyle={styles.dropdown_text}
                        dropdownStyle={styles.dropdown_dropdown}
                        options={language.to}
                        defaultValue={'目标语言'}
                    />
                </View>

                <AutoExpandingInput onChangeText={this._onChangeText}
                    onEndEditing={() => { alert('on end editing'); }}
                />
                <View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    edit: {
        marginTop: 15,
        fontSize: 25,
        backgroundColor: '#ccc',
    },
    btn: {
        flex: 1,
        width: 100,
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'red',
    },
    dropdown: {
        flex: 1,
        width: 110,
        margin: 12,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
    },

    dropdown_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_dropdown: {
        width: 150,
        height: 300,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
});


export default App;