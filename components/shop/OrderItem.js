import React, { useState } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import CartItem from './CartItem';

const OrderItem = ({ items, amount, date }) => {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <View style={styles.main}>
            <View style={styles.Text}>
                <Text>{amount}</Text>
                <Text>{date}</Text>
            </View>
            <Button onPress={() => { setShowDetails(prevSate => !prevSate) }} title={showDetails ? 'hide details' : 'view details'} color='orange' />
            {showDetails && <View>
                {items.map(itemData => <CartItem
                    key={itemData.productId}
                    quantity={itemData.prodQuantity}
                    sum={itemData.prodSum}
                    title={itemData.prodTitle}
                />)}
            </View>}
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        borderWidth: 1,
        margin: 5
    },
    Text: {
        flexDirection: 'row'
    },
    DetailsBtn: {
        marginVertical: 30
    }
})
export default OrderItem