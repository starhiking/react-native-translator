/**
 * Author: Lan Xing
 * Description:This is the search page component
 *              It offer users choose the APIs and Languages
 *              And users can input words or sentences 
 *              press search icon or local words 
 *              it will show the data from serval APIs
 *
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TextInput, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';

import AutoExpandingInput from './app/com/AutoExpandingInput';
import APINetDataCom from './app/com/APINetDataCom';
import NetDataCom from './app/com/NetDataCom';
import LocalDataCom from './app/com/LocalDataCom';
import TranslucentModal from './app/com/TranslucentModal';
import MultiSelector from './app/com/MultiSelector';

import language from './app/lib/language';
import startwith from './app/lib/dictionary';
import baidu from './app/lib/baidu';
import google from './app/lib/google';
import youdao from './app/lib/youdao';
import common from './app/lib/common-result';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            querytext: "",
            showTemp: false,
            localres: [],
            netres: [],
            clickData: "",
            baiduData: null,
            googleData: null,
            youdaoData: null,
            commonData: null,
            from: 'auto',
            to: 'zh',
            modalVisible: false,
            useBaidu: true,
            useGoogle: true,
            useYoudao: true,
        };
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    // return a list contains selected engines
    getSelectedEngine = () => ['useBaidu', 'useGoogle', 'useYoudao'].filter(value => this.state[value])

    onSelectEngine = (status) => {
        this.setState(status);
        this.setModalVisible(false);
    }

    getPressData = (newData) => {

        if (this.state.from == this.state.to) {
            alert('The two languages are the same');
            return;
        }

        this.setState({
            querytext: newData,
        });

        common(newData, this.state.from, this.state.to).then(result => {
            this.setState({
                commonData: result,
                showTemp: true,
            })
        });

        if (this.state.useBaidu)
            baidu(newData, this.state.from, this.state.to).then(result => {
                this.setState({
                    baiduData: result,
                    showTemp: true
                })
            });

        if (this.state.useYoudao)
            youdao(newData, this.state.from, this.state.to).then(result => {
                this.setState({
                    youdaoData: result,
                    showTemp: true,
                });
            });

        if (this.state.useGoogle)
            google(newData, this.state.from, this.state.to).then(result => {
                this.setState({
                    googleData: result,
                    showTemp: true,
                })
            });
    }

    _onChangeText = (text) => {
        this.setState({
            showTemp: false,
            localres: startwith(text),
            querytext: text,
        })
    }

    _findText = () => {
        var tempData = this.state.querytext;
        this.getPressData(tempData);
    }

    render() {
        return (
            <View>
                <ScrollView>

                    <View style={{ flexDirection: 'row' }}>
                        <ModalDropdown style={styles.dropdown}
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            options={language.from}
                            defaultValue={'源(From)'}
                            defaultIndex={1}
                            onSelect={(idx, value) => this.setState({ from: idx })}
                        />

                        <TouchableHighlight style={styles.btn} onPress={() => this.setModalVisible(true)}>
                            <Text>
                                Interface
                            </Text>
                        </TouchableHighlight>

                        <ModalDropdown style={styles.dropdown}
                            textStyle={styles.dropdown_text}
                            dropdownStyle={styles.dropdown_dropdown}
                            options={language.to}
                            defaultValue={'目标(To)'}
                            defaultIndex={1}
                            onSelect={(idx, value) => this.setState({ to: idx })}
                        />
                    </View>

                    <View style={styles.container}>
                        <AutoExpandingInput onChangeText={this._onChangeText}
                            queryValue={this.state.querytext}
                            style={{ flex: 1 }}
                        />
                        {this.state.querytext == "" ? <Text /> :
                            <TouchableHighlight underlayColor='white' onPress={this._findText}>
                                <Image
                                    source={require('./app/res/search.png')}
                                    style={{ width: 50, height: 50, marginRight: 10 }}
                                />
                            </TouchableHighlight>
                        }
                    </View>

                    {this.state.showTemp ?
                        <NetDataCom
                            baiduData={this.state.baiduData}
                            googleData={this.state.googleData}
                            youdaoData={this.state.youdaoData}
                            commonData={this.state.commonData}
                        /> : <LocalDataCom
                            localData={this.state.localres}
                            onPressData={this.getPressData}
                        />}

                    <View style={{ marginVertical: 10 }}>
                        <Button
                            raised
                            title={'每日一句(Daily Sentences)'}
                            onPress={() => this.props.navigation.navigate('Sentences')}
                            backgroundColor={'#009588'}
                            icon={{ name: 'book', type: 'Entypo', size: 20 }}
                            fontSize={20}
                            borderRadius={5}
                        />
                    </View>
                </ScrollView>

                <TranslucentModal visible={this.state.modalVisible}>
                    <View style={{ flex: 6 }}></View>

                    <MultiSelector
                        choice={[
                            ['百度(Baidu)', 'useBaidu'],
                            ['谷歌(Google)', 'useGoogle'],
                            ['有道(Youdao)', 'useYoudao']
                        ]}
                        defaultSelected={this.getSelectedEngine()}
                        onDone={this.onSelectEngine}
                        flex={4}
                    />
                </TranslucentModal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        alignItems: 'center'
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
        backgroundColor: '#FF5622',
    },
    dropdown: {
        flex: 1,
        width: 100,
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
        width: 100,
        height: 300,
        borderColor: 'cornflowerblue',
        borderWidth: 2,
        borderRadius: 3,
    },
});