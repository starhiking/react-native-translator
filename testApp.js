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
                onContentSizeChange={this.onContentSizeChange.bind(this)}
                style={[styles.edit,{height:Math.max(100,this.state.height)}]}
                defaultValue={this.props.queryValue}
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
                {commonData==null||commonData.sentences.length == 0?<Text />:commonData.sentences.splice(0,5).map((sentence,i)=>this.renderSentenceItem(sentence,i))}
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
                    // onEndEditing={(event)=>this.getLocalData(event.nativeEvent.text)}
                />
                {this.state.querytext==""?<Text />:<TouchableHighlight  onPress={this._findText}><Image source={{uri:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3141758320,2770624601&fm=27&gp=0.jpg"}} style={{width:50,height:50}} /></TouchableHighlight>} 
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
    edit: {
        flex:1,
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
