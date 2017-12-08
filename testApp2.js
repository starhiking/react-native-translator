import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: true
        };
    }

    render() {
        return (
            <View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'none'}
                    transparent={true}
                    onRequestClose={() => this.onRequestClose()}
                >
                    {/* <TouchableOpacity style={{ flex: 1 }} onPress={this._onClose}>
                        <View style={styles.modalBackground}>
                            <View style={[styles.modalBox, { position: 'absolute', top: this.state.y }]}>
                                {
                                    this.props.datas.child_class.map(function (cateKey) {
                                        return (
                                            <View style={styles.innerBox}>
                                                <TouchableOpacity onPress={_linkTo}>
                                                    <Text style={styles.cateKeyWords}>{cateKey.gc_name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })
                                }
                            </View>
                        </View>
                    </TouchableOpacity> */}
                </Modal>
            </View>
        );
    }

}


