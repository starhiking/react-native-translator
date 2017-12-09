import React, { Component } from 'react';
import {Text,Image,TouchableHighlight,FlatList} from 'react-native';

export default class LocalDataCom extends Component{
    
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