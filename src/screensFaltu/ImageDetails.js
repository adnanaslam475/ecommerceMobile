import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
const ImageDetails = props => {
    return (
        <View>
            <Image source={props.imgSource}
                style={{ width: 300, height: 100 }} />
            <Text>{props.title}</Text>
        </View>
    )
}
export default ImageDetails