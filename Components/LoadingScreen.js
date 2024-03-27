import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

const Loader = ({ visible = false }) => {
    const { height, width } = useWindowDimensions();
    return (
        visible && (
            <View style={[style.container, { height, width }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    );
};

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
});

export default Loader;