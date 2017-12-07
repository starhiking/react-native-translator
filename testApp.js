import React, { Component } from 'react';
import { View,Alert, Text,StyleSheet,Image,TouchableHighlight, TextInput, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import language from './app/lib/language';

class AutoExpandingInput extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            height:100,
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
                style={[styles.edit,{height:Math.max(100,this.state.height)}]}
                value={this.state.text}
                underlineColorAndroid='transparent'
                placeholder="输入文字即可翻译"
            />
        );
    }
}

class NetDataCom extends Component{
    constructor(props) {
        super(props);
    }

    render(){

        return(
            <View style={styles.result}>
                <Text>数据显示</Text>
                <View style={styles.baidu}>
                </View>
                <View style={styles.google}>
                </View>
                <View style={styles.google}>
                </View>
                <View style={styles.common}>
                </View>
            </View>
        )
    }

}

class LocalDataCom extends Component{

    constructor(props) {
        super(props);
    }
    
    _keyExtractor = (item,index) => index;

    _renderItem = ({item,index})=>(
        <View>
        <Text>{item}</Text>
        </View>
    )

    render(){
        let localData = this.props.localData;
            return(
                <FlatList 
                    data={localData}
                    keyExtractor = {this._keyExtractor}
                    renderItem = {this._renderItem}
                />
            )
    }
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTemp : false,
        }; 
    }

    getLocalData(text){
        
    }

    getNetData(text){
        
    }

    _onChangeText(){
        this.setState({
            showTemp:!this.state.showTemp
        })
    }

    render() {
        return (
            <View>
                <View style={{flexDirection:'row'}}>

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
                    onEndEditing={(event)=>this.getLocalData(event.nativeEvent.text)}
                />
                
                {this.state.showTemp ? <NetDataCom /> : <LocalDataCom localData={["test:测试","a:一个","this:这个"]} />}

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