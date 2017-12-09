import React, { Component } from 'react';
import {View, Text} from 'react-native';
import language from '../lib/language';

export default class APINetDataCom extends Component{
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
                </View>
            </View>
        )
    }
}