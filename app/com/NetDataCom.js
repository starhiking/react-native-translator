import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import APINetDataCom from './APINetDataCom';

export default class NetDataCom extends Component{
    
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
                <View>
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