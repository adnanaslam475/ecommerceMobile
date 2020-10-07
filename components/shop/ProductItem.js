import React from 'react'
import {
    StyleSheet, Text, TouchableNativeFeedback, View,
    Image, TouchableOpacity, Platform
} from 'react-native'

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <TouchableCmp onPress={props.onSelect} useForeground >
            <View style={styles.product}>
                <Image style={{ height: 100, width: '100%' }} source={{ uri: props.imageUrl }} />
                <View style={styles.Text}>
                    <Text style={styles.title}>{props.title}</Text>
                      <Text>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.Btns}>
                    {props.children}
                </View>
            </View>
        </TouchableCmp>
    )
}
const styles = StyleSheet.create({
    product: {
        margin: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        padding: 1,
    },
    title: {
        fontFamily: 'opan-sans-bold',
        fontSize: 20
    },
    Btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        margin: 3,
        // marginVertical:5
    },
    Text: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actions: {
        flexDirection: 'row',
    }
})
export default ProductItem