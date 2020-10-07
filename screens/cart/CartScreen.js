import React, { useState } from 'react'
import { Text, View, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem'
import { COLOR } from '../../components/constants/Color'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'
// import 

const CartScreen = () => {
    const [isloading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const [isError, setError] = useState(false)
    const totalAmount = useSelector(state => state.cart.totalAmount)


    const cartItems = useSelector(state => {
        let ItemArray = []
        for (const key in state.cart.items) {
            ItemArray.push({
                productId: key,
                prodTitle: state.cart.items[key].title,
                prodPrice: state.cart.items[key].price,
                prodQuantity: state.cart.items[key].quantity,
                prodSum: state.cart.items[key].sum,
            })
        }
        return ItemArray.sort((a, b) => a.productId < b.productId ? 1 : -1)
    })

    const orderhandler = async () => {
        setIsLoading(true)
        await dispatch(orderActions.addOrders(cartItems, totalAmount))
        setIsLoading(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    TOTAL:{' '}
                    <Text style={styles.amount}>{totalAmount.toFixed(2)}</Text>
                </Text>
                {isloading ? <ActivityIndicator size='large' color='red' /> :
                    <Button title='order Now' color='blue' onPress={orderhandler} />}
            </View>
            <FlatList data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemdata => (<CartItem
                    quantity={itemdata.item.prodQuantity}
                    sum={itemdata.item.prodSum}
                    delettable
                    key={itemdata.item.productId}
                    title={itemdata.item.prodTitle}
                    onRemove={() => {
                        dispatch(cartActions.removeFromCart(itemdata.item.productId))
                    }}
                />
                )} />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        // margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black'
    },
    summaryText: {
        fontSize: 18
    },
    amount: {
        color: COLOR.primaryColor
    }
})

CartScreen.navigationOptions = (navdata) => {
    return {
        headerTitle: 'my cart',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='cart' color='blue' iconName='md-list'
                onPress={() => {
                    navdata.navigation.toggleDrawer()
                }} />
        </HeaderButtons>
    }
}
export default CartScreen