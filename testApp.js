/* eslint-disable */
// blabla
/* eslint-enable */
import React, { Component } from 'react';
import { View,Alert, Text,StyleSheet,Image,TouchableHighlight, TextInput, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import language from './app/lib/language';
import startwith from './app/lib/dictionary';
import baidu from './app/lib/baidu';
import google from './app/lib/google';
import youdao from './app/lib/youdao';

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
        this.state={
            chooseData:'',
        };
    }
    
    _keyExtractor = (item,index) => index;

    getPressData = (item,index) =>{//  如果设置press或者click时会一直更新状态机(改成alert就很清楚) 有bug
        this.setState({
            chooseData:item[0],
        });
        this.props.onPressData(item[0]);
    }

    _renderItem = ({item,index})=>(
        <TouchableHighlight onPress = {()=>this.getPressData(item,index)} >
            <Text style={{fontSize:22}} >{item.join('  ')}</Text>
        </TouchableHighlight>
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
            localres : [],
            netres : [],
            clickData : "",
        }; 
    }

    getPressData = (newData)=>{
        this.setState({
            showTemp:!this.state.showTemp,
        });
        // baidu(newData, 'en', 'zh').then(result => {
        //     alert(JSON.stringify(result, null, 4).toString());
        // });
        youdao(newData, 'en', 'zh').then(result => {
            alert(JSON.stringify(result, null, 4).toString());
        });

        
    }

    getLocalData=(text)=>{
        
    }

    getNetData=(text)=>{
        
    }

    _onChangeText=(querytext)=>{    
        this.setState({
            showTemp:false,
            localres:startwith(querytext),
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

                    <TouchableHighlight style={styles.btn} onPress={this.getLocalData}>
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
                    // onEndEditing={(event)=>this.getLocalData(event.nativeEvent.text)}
                />
                
                {this.state.showTemp ? <NetDataCom /> : <LocalDataCom localData={this.state.localres} onPressData = {this.getPressData} />}

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


//还差父组件获取点击之后的子组件 就是本地数据点击之后 输入框信息变成本地数据的英语单词(输入框与本地数据之间是兄弟组件)
//同时触发搜索网络数据 子组件向父组件传值 
//然后显示网络数据
//最后显示每日一句