import React, { Component } from 'react';
import {View,Alert, Text,StyleSheet,Image,TouchableHighlight, TextInput, FlatList, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import AutoExpandingInput from './app/com/AutoExpandingInput';
import APINetDataCom from './app/com/APINetDataCom';
import NetDataCom from './app/com/NetDataCom';
import LocalDataCom from './app/com/LocalDataCom';

import language from './app/lib/language';
import startwith from './app/lib/dictionary';
import baidu from './app/lib/baidu';
import google from './app/lib/google';
import youdao from './app/lib/youdao';
import common from './app/lib/common-result';
import getDailySentence from './app/lib/daily-sentence';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            querytext:"",
            showTemp : false,
            localres : [],
            netres : [],
            clickData : "",
            baiduData:null,
            googleData:null,
            youdaoData:null,
            commonData:null,
            dailyData:null,
            from:'auto',
            to:'zh',
            usebaidu:true,
            usegoogle:true,
            useyoudao:true,
        }; 
    }

    componentDidMount() {
        getDailySentence(4)
        .then(result => {
            const text = JSON.stringify(result, null, 4);
            this.setState({ 
                dailyData: result, 
            });
        });
    }

    getPressData = (newData)=>{

        if(this.state.from == this.state.to){
            alert('The two languages are the same');
            return;
        }
            
        this.setState({
            querytext:newData,
        });

        common(newData,this.state.from, this.state.to).then(result => {
            this.setState({
                commonData:result,
                showTemp:true,
            })
        });

        if(this.state.usebaidu)
            baidu(newData, this.state.from, this.state.to).then(result => {
                this.setState({
                    baiduData:result,
                    showTemp:true
                })
            });
        
        if(this.state.useyoudao)
            youdao(newData, this.state.from, this.state.to).then(result => {
                this.setState({
                    youdaoData:result,
                    showTemp:true,
                });
            });

        if(this.state.usegoogle)
            google(newData, this.state.from, this.state.to).then(result => {
                this.setState({
                    googleData:result,
                    showTemp:true,
                })
            });
    }

    _onChangeText=(text)=>{
        this.setState({
            showTemp:false,
            localres:startwith(text),
            querytext:text,
        })
    }

    _dailyItem = ({item,index})=>{
        return(
            <View >
                <Text>
                    {item.sentence}
                </Text>
                <Text>
                    {item.translation}
                </Text>
                <Image source={{uri:item.thumbnail}} style={{width:100,height:100}} />
            </View>
        )
    }
    _dateHeader=()=>{
        var localDate = new Date();
        var time = localDate.getFullYear()+"-"+(localDate.getMonth()+1)+"-"+(localDate.getDate());
        return (
            <Text style={{fontSize:22,color:"#B45B3E"}}>每日一句:{time}</Text>
        )
    }

    _keyExtractor = (item,index) => index;

    _findText = ()=>{
        var tempData = this.state.querytext;
        this.getPressData(tempData);
    }

    render() {
        return (
            <View >
                <View style={{flexDirection:'row'}}>
                    <ModalDropdown style={styles.dropdown}
                        textStyle={styles.dropdown_text}
                        dropdownStyle={styles.dropdown_dropdown}
                        options={language.from}
                        defaultValue={'源语言'}
                        defaultIndex = {1}
                        onSelect={(idx, value) => this.setState({from:idx})}
                    />
                    <TouchableHighlight style={styles.btn}>
                        <Text>
                            翻译接口
                        </Text>
                    </TouchableHighlight>

                    <ModalDropdown style={styles.dropdown}
                        textStyle={styles.dropdown_text}
                        dropdownStyle={styles.dropdown_dropdown}
                        options={language.to}
                        defaultValue={'目标语言'}
                        defaultIndex = {1}
                        onSelect={(idx, value) => this.setState({to:idx})}
                    />
                </View>
                <View  style={styles.container}>
                
                <AutoExpandingInput onChangeText={this._onChangeText}
                    queryValue = {this.state.querytext}
                    style={{flex:1}}
                />
                {this.state.querytext==""?<Text />:<TouchableHighlight  onPress={this._findText}><Image source={require('./search.png')} style={{width:50,height:50,marginRight:10}} /></TouchableHighlight>} 
                </View>
                <ScrollView>

                    {this.state.showTemp ? 
                        <NetDataCom 
                            baiduData={this.state.baiduData}
                            googleData={this.state.googleData}
                            youdaoData={this.state.youdaoData}
                            commonData = {this.state.commonData}
                        /> : <LocalDataCom 
                                localData={this.state.localres} 
                                onPressData = {this.getPressData} 
                            />}

                    <FlatList 
                        keyExtractor ={this._keyExtractor}
                        data={this.state.dailyData}
                        renderItem={this._dailyItem}
                        ListHeaderComponent={this._dateHeader}
                    />

                </ScrollView>

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
    btn:{
        flex:1,
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
        flex:1,
        width: 100,
        margin:12,
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

export default App;
