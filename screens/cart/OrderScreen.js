import React, { useEffect, useState } from 'react'
import { FlatList, View,Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as orderActions from '../../store/actions/order'


const OrderScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const myOrders = useSelector(state => state.order.orderItems)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(orderActions.setOrders()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    if (isLoading) {
        return <ActivityIndicator size='large' color='blue' />
    }
    if(myOrders.length===0){
        return <View style={styles.noOrder} >
            <Text >No Orders found may be add somenoe</Text>
        </View>
    }
    return (
        <FlatList data={myOrders} keyExtractor={item => item.id} renderItem={itemData => (
            <OrderItem
                amount={itemData.item.amount.toFixed(2)}
                date={itemData.item.getDate}
                items={itemData.item.item}
            />
        )} />
    )
}

OrderScreen.navigationOptions = navdata => {
    return {
        headerTitle: 'my Orders',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='cart' color='blue' iconName='md-list'
                onPress={() => {
                    navdata.navigation.toggleDrawer()
                }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    spinner: {
        justifyContent: 'center',
        display: 'flex'
    },
    noOrder:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default OrderScreen