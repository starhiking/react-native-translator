import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import baidu from './app/lib/baidu';
import google from './app/lib/google';
import youdao from './app/lib/youdao';
import example from './app/lib/example-sentences';
import getDailySentence from './app/lib/daily-sentence';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            text: 'Hello World!'
        };
    }

    componentDidMount() {
        // 有道没有例句
        // 百度的例句做出来了
        // result.sentences是一个列表
        // 列表的每一项代表一个例句。例句的0号索引是英语，例句的1号索引是中文
        // 详见alert数据
        // √ TODO: 谷歌的例句（我觉得百度的够用了，暂时搁置）

        // baidu('说', 'zh', 'en').then(result => {
        //     alert(JSON.stringify(result, null, 4).toString());
        // });

        // google('show', 'en', 'zh').then(result => {
        //     alert(JSON.stringify(result, null, 4).toString());
        // });

        // youdao('show', 'en', 'zh').then(result => {
        //     alert(JSON.stringify(result, null, 4).toString());
        // });

        example('show', 'en', 'zh').then(result => {
            // result是一个数组
            // 前面的元素是百度例句，后面的是谷歌例句
            // 数组里每一项是个二元组，0号位是源语言句子（基本是英文）
            // 1号位是目标语言句子（基本是中文，谷歌的这一段为空字符串）
            alert(JSON.stringify(result, null, 4));
        });

        // getDailySentence(3)
        //     .then(results => {
        //         // results是一个数组
        //         // 每个元素是一个对象
        //         // 每个对象有date(日期), sentence(英语), translation(中文), thumbnail(小图), image(大图)五个成员
        //         const text = JSON.stringify(results, null, 4);
        //         this.setState({ text: text });
        //     });
    }

    render() {
        return (
            <Text> {this.state.text} </Text>
        );
    }
}