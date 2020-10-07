import React, { useEffect, useCallback, useState } from 'react';
import { View, ScrollView, StyleSheet, Platform, ActivityIndicator, Text, Alert, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products';


const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId))
    const dispatch = useDispatch()
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : '')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setError] = useState()

    const submitHandler = useCallback(async () => {
        if (title.trim().length < 1 ||
            price < 1 ||
            imageUrl.trim().length <= 1 ||
            description.trim().length < 1) {
            Alert.alert(
                "ERROR alert!!",
                "please check your form again",
                [{ text: "OK", onPress: () => console.log('') }],
                { cancelable: false })
            return false
        }
        setError(null)
        setIsLoading(true)
        try {
            if (editedProduct) {
                await dispatch(productsActions.updateProduct(
                    prodId,
                    title,
                    imageUrl,
                    description
                ))
            }
            else {
                await dispatch(
                    productsActions.addProduct(
                        title,
                        +price,
                        imageUrl,
                        description
                    ))
            }
            setIsLoading(false)
            props.navigation.goBack()
        }
        catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }, [dispatch, isLoading, prodId, title, imageUrl, price, description])
    useEffect(() => {
        if (isError) {
            console.log(isError)
            Alert.alert(
                "ERROR!!",
                isError,
                [{ text: "OK", onPress: () => console.log('') }],
                { cancelable: false })
        }
    }, [isError])
    useEffect(() => {

        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])
    if (isLoading) {
        return <ActivityIndicator color='red' size='large' />
    }
    return (
        <ScrollView style={styles.formControl}>
            <View style={styles.form}>
                <Text style={styles.label}>title</Text>
                <TextInput
                    placeholder='title'
                    style={styles.input}
                    returnKeyType='next'
                    keyboardType='default'
                    value={title}
                    onChangeText={text => setTitle(text)}
                />
                <Text style={styles.label}>image imageUrl</Text>
                <TextInput
                    placeholder='image Url'
                    returnKeyType='next'
                    keyboardType='default'
                    style={styles.input}
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                />
                {editedProduct ? null : (
                    <View>
                        <Text style={styles.label}>price</Text>
                        <TextInput
                            placeholder='price'
                            keyboardType='number-pad'
                            style={styles.input}
                            returnKeyType='next'
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>
                )}
                <Text style={styles.label}>description</Text>
                <TextInput
                    returnKeyType='next'
                    placeholder='description'
                    keyboardType='default'
                    style={styles.input}
                    multiline
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    };
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        margin: 10
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        color: 'red',
        fontSize: 13
    }
})
export default EditProductScreen