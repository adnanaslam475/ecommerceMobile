import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, Button, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as CartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import * as authActions from '../../store/actions/auth'

const ProductOverviewScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isrefeshing, setIsRefreshing] = useState(false)


    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const onSelectHandler = (id, title) => {
        navigation.navigate('productDetail',
            {
                id: id, title: title
            })
    }
    const dispatch = useDispatch()
    const loadProducts = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(productActions.setProducts())
        }
        catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadProducts)
        return () => {
            willFocusSub
        }
    })
    useEffect(() => {
        loadProducts()
    }, [dispatch, loadProducts])

    if (error) {
        return <View style={styles.errorContainer}>
            <Text>An error occured</Text>
            <Button title='try again' onPress={loadProducts} />
        </View>
    }

    if (isLoading) {
        return <ActivityIndicator size='large' color='red' />
    }
    if (!isLoading && products.length === 0) {
        return <View>
            <Text style={styles.noPro}>no products found please add new one</Text>
        </View>
    }
    return <View>
        <FlatList data={products} onRefresh={loadProducts}
            refreshing={isrefeshing}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
                price={itemData.item.price}
                onSelect={() => {
                    onSelectHandler(itemData.item.id, itemData.item.title)
                }}>
                <Button color='blue' title='view Details' onPress={() => {
                    onSelectHandler(itemData.item.id, itemData.item.title)
                }} />
                <Button color='blue' title='add Cart' onPress={() => { dispatch(CartActions.addToCart(itemData.item)) }} />
            </ProductItem>
            }
        /></View>
}
ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'all products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='cart' color='blue' iconName='md-list'
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='cart' color='blue' iconName='md-cart'
                onPress={() => { navData.navigation.navigate('cart') }} />
        </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    errorContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noPro: {
        display: 'flex',
        marginLeft:50,
        marginTop:200
    }
})
export default ProductOverviewScreen