/**
 * Author: Yan Nan
 * Description:
 *     TranslucentModal displays a covering over the current screen
 *     transparency: 50%
 *     animation: slide in from bottom
 *     props:
 *         visible: boolean
 *         children: children components
 */

import React, { Component } from 'react';
import { View, Modal, StyleSheet } from 'react-native';

const TranslucentModal = (props) => (
    <Modal
        visible={props.visible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => { }}
    >
        <View style={styles.modalBackground} >
            {props.children}
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});

export default TranslucentModal;