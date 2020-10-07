import React from 'react'
import { ScrollView, Image, Text, View, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { COLOR } from '../../components/constants/Color'
import * as CartActions from '../../store/actions/cart'

const ProductDetailedScreen = ({ navigation }) => {
    const productId = navigation.getParam('id')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(pro => pro.id === productId))
    const dispatch = useDispatch()
    return <ScrollView>
        <Image style={styles.Image} source={{ uri: selectedProduct.imageUrl }} />
        <View style={styles.action}>
            <Button title='adD to cart' color={COLOR.primaryColor} onPress={() => {
                dispatch(CartActions.addToCart(selectedProduct))
            }} />
        </View>
        <View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.price}>{selectedProduct.description}</Text>
        </View>
    </ScrollView>
}

ProductDetailedScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title')
    }
}
const styles = StyleSheet.create({
    action: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 5
    },
    Image: {
        height: 250
    },

})
export default ProductDetailedScreen