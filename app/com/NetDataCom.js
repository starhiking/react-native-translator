/**
 * Author: Lan Xing
 * Description: This Component show all the data from NetWork
 *  contains:google baidu youdao (if exist) commonData (such as sentences,pronunciation,similar word)
 *  props:baiduData(object,data from baidu API)
 *        googleData(object,data from google API)
 *        youdaoData(object,data from youdao API)
 *        commonData(object)  
 *              src_pron(string)
 *              dst_pron(string)
 *              sentences(array of array of string )
 *              synonyms(array of sting)
 * 
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import APINetDataCom from './APINetDataCom';

export default class NetDataCom extends Component {

    constructor(props) {
        super(props);
    }

    renderSentenceItem(item, i) {
        return (
            <View key={i}>
                <Text key={0} style={{fontSize:18}}>{item[0]}</Text>
                <Text key={1} style={{color:"#00000073"}}>{item[1]}</Text>
            </View>
        );
    }

    render() {
        var commonData = this.props.commonData;
        return (
            <View>
                <APINetDataCom API={this.props.baiduData} />
                <APINetDataCom API={this.props.youdaoData} />
                <APINetDataCom API={this.props.googleData} />
                {commonData == null || commonData.src_pron == '' ? <Text /> : <Text style={{ fontSize: 22, color: '#6699CC' }}>发音(pronunciation): </Text>}
                {commonData == null || commonData.src_pron == '' ? <Text /> : <Text style={{fontSize:18}}>{commonData.src_pron}-->{commonData.dst_pron} </Text>}
                {commonData == null || commonData.synonyms.length == 0 ? <Text /> : <Text style={{fontSize: 22, color: '#6699CC' }}>近义词(synonyms): </Text>}
                {commonData == null || commonData.synonyms.length == 0 ? <Text /> : <Text style={{fontSize: 18}} >{commonData.synonyms.join('     ')}</Text>}
                {commonData == null || commonData.sentences.length == 0 ? <Text /> : <Text style={{ fontSize: 22, color: '#6699CC' }}>例句(sentences): </Text>}
                {commonData == null || commonData.sentences.length == 0 ? <Text /> : commonData.sentences.splice(0, 5).map((sentence, i) => this.renderSentenceItem(sentence, i))}
            </View>
        );
    }
}