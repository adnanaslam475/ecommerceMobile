import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CartItem = ({ delettable, quantity, title, sum, onRemove }) => {
    return (
        <View style={styles.item}>
            <Text>{quantity}</Text>
            <Text> {title}</Text>
            <Text>$ {sum.toFixed(2)}</Text>
            {delettable && <TouchableOpacity onPress={onRemove} >
                <Ionicons name='md-cart' color='red' size={23} />
            </TouchableOpacity>}
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 2,
        margin: 2,

    },
    title: {
        // fontSize: 20
    }
})
export default CartItem