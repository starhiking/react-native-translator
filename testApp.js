import React, { Component } from 'react';
import {View,Alert, Text,StyleSheet,Image,TouchableHighlight, TextInput, FlatList, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import language from './app/lib/language';
import startwith from './app/lib/dictionary';
import baidu from './app/lib/baidu';
import google from './app/lib/google';
import youdao from './app/lib/youdao';
import common from './app/lib/common-result';
import getDailySentence from './app/lib/daily-sentence';

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

class APINetDataCom extends Component{
    constructor(props) {
        super(props);
    }

    renderExpenseItem(item , i) {
        return <View key ={i}><Text key ={i}>{item}</Text></View>
    }

    render(){
        var API = this.props.API;
        if(API==null) return <View />
        else return(
            <View>
                <Text style={{fontSize:22,color:"#B45B3E"}}>{API.engine}:</Text>
                <View>
                    <Text>{language.from[API.from]}-->{language.to[API.to]}</Text>
                    <Text>{API.src}:{API.dst}</Text>
                    <View>
                    {  
                        API.parts.map((mean,i)=>this.renderExpenseItem(mean,i))
                    }  
                    </View>
                <Text />
                </View>
            </View>
        )
    }

}

class NetDataCom extends Component{

    constructor(props) {
        super(props);
    }

    renderSentenceItem(item , i) {
        return (
            <View key ={i}>
                <Text key ={0}>{item[0]}</Text>
                <Text key={1}>{item[1]}</Text>
            </View>
        )
    }

    render(){
        var commonData =this.props.commonData;
        return(
            <View style={styles.result}>
                <APINetDataCom API={this.props.baiduData} />
                <APINetDataCom API={this.props.youdaoData} />
                <APINetDataCom API={this.props.googleData} />
                {commonData==null||commonData.src_pron==""?<Text />:<Text style={{fontSize:22,color:"#B45B3E"}}>发音(pronunciation): </Text>}
                {commonData==null||commonData.src_pron==""?<Text />:<Text>{commonData.src_pron}-->{commonData.dst_pron} </Text>}
                {commonData==null||commonData.synonyms.length == 0?<Text />:<Text style={{fontSize:22,color:"#B45B3E"}}>近义词(synonyms): </Text>}
                {commonData==null||commonData.synonyms.length == 0?<Text />:<Text>{commonData.synonyms.join('     ')}</Text>}
                {commonData==null||commonData.sentences.length == 0?<Text />:<Text style={{fontSize:22,color:"#B45B3E"}}>例句(sentences): </Text>}
                {commonData==null?<Text />:commonData.sentences.splice(0,5).map((sentence,i)=>this.renderSentenceItem(sentence,i))}
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

    getPressData = (item,index) =>{
        this.setState({
            chooseData:item[0],
        });
        this.props.onPressData(item[0]);
    }

    _renderItem = ({item,index})=>(
        <TouchableHighlight onPress = {()=>this.getPressData(item,index)} >
            <Text style={{fontSize:22}} >{item.join()}</Text>
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
            baiduData:null,
            googleData:null,
            youdaoData:null,
            commonData:null,
            dailyData:null,
        }; 
    }

    componentDidMount() {
        getDailySentence(3)
        .then(result => {
            const text = JSON.stringify(result, null, 4);
            alert(text);
            this.setState({ 
                dailyData: result, 
            });
        });
    }

    getPressData = (newData)=>{

        common(newData,'en','zh').then(result => {
            this.setState({
                commonData:result,
                showTemp:true,
            })
        });
        baidu(newData, 'en', 'zh').then(result => {
            this.setState({
                baiduData:result,
                showTemp:true
            })
        });
        youdao(newData, 'en', 'zh').then(result => {
            this.setState({
                youdaoData:result,
                showTemp:true,
            });
        });
        google(newData, 'en', 'zh').then(result => {
            this.setState({
                googleData:result,
                showTemp:true,
            })
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
        var time = localDate.getFullYear()+"-"+(localDate.getMonth()+1)+"-"+(localDate.getDate()+1);
        return (
            <Text style={{fontSize:22,color:"#B45B3E"}}>每日一句:{time}</Text>
        )
    }

    _keyExtractor = (item,index) => index;

    render() {
        return (
            <ScrollView >
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