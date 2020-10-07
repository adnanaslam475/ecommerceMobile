import React from 'react'
import { FlatList, Button, Text, Alert, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as ProductActions from '../../store/actions/products'

const UserProduct = props => {
    const userProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()
    const onEditHandler = id => {
        props.navigation.navigate('edit', { productId: id })
    }
    const deleteHandler = id => {
        Alert.alert(
            "Delete",
            "are you sure?",
            [
                { text: "No", style: "cancel" },
                { text: "yes", onPress: () => { dispatch(ProductActions.deleteProduct(id)) } }
            ])
    }
    if (userProducts.length === 0) {
        return <View style={styles.noPro} >
            <Text >No produst found may be add somenoe</Text>
        </View>
    }
    return <FlatList
        data={userProducts}
        keyExtractor={item => item.id} renderItem={itemdata => (
            <ProductItem
                title={itemdata.item.title}
                price={itemdata.item.price}
                onSelect={() => {
                    onEditHandler(itemdata.item.id)
                }}
                imageUrl={itemdata.item.imageUrl}>
                <Button color='blue' title='edit' onPress={() => onEditHandler(itemdata.item.id)} />
                <Button color='blue' title='delete' onPress={() => {
                    deleteHandler(itemdata.item.id)
                }} />
            </ProductItem>
        )} />
}
const styles = StyleSheet.create({
    noPro: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
UserProduct.navigationOptions = navData => {
    return {
        headerTitle: 'Your products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='cart' color='blue' iconName='md-list'
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='cart' color='blue' iconName='md-create'
                onPress={() => { navData.navigation.navigate('edit') }} />
        </HeaderButtons>
    }
}
export default UserProduct