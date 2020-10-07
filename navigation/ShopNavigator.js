import React from 'react';
import {
    createAppContainer, createDrawerNavigator, SafeAreaView,
    createStackNavigator, createSwitchNavigator, DrawerItems,
} from 'react-navigation'
import { Button, View } from 'react-native';
import ProductOverviewScreen from '../screens/cart/ProductOverviewScreen'
import ProductDetailedScreen from '../screens/cart/ProductDetailedScreen'
import CartScreen from '../screens/cart/CartScreen'
import { Ionicons } from '@expo/vector-icons';
import * as authActions from '../store/actions/auth'
import OrderScreen from '../screens/cart/OrderScreen';
import UserProduct from '../screens/user/UserProduct';
import EditProduct from '../screens/user/EditProduct';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/user/StartUpScreen';
import { useDispatch } from 'react-redux';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: 'brown',
        height: 60
    },
    headerTintColor: 'white'
}

const productNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    productDetail: ProductDetailedScreen,
    cart: CartScreen
},
    {
        navigationOptions: {
            drawerIcon: drawerconfig => <Ionicons name='md-cart' color={drawerconfig.tintColor} size={25} />
        },
        defaultNavigationOptions: defaultNavOptions
    })

const orderNavigator = createStackNavigator({
    orders: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerconfig => <Ionicons name='md-list' color={drawerconfig.tintColor} size={25} />
    },
    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    Admin: UserProduct,
    edit: EditProduct
}, {
    navigationOptions: {
        drawerIcon: drawerconfig => <Ionicons name='md-list' color={drawerconfig.tintColor} size={25} />
    },
    defaultNavigationOptions: defaultNavOptions
})

const mainNavigator = createDrawerNavigator({
    products: productNavigator,
    orders: orderNavigator,
    Admin: AdminNavigator
},
    {
        contentOptions: {
            activeTintColor: 'blue'
        },
        contentComponent: props => {
            const dispatch = useDispatch()
            return <View style={{ flex: 1 }}>
                <SafeAreaView>
                    <DrawerItems {...props} />
                    <Button title='logout' color='red' onPress={() => {
                        dispatch(authActions.logout());
                        props.navigation.navigate('auth')
                    }} />
                </SafeAreaView>
            </View>
        }
    })

const SwitchNavigator = createSwitchNavigator({
    startUp: StartUpScreen,
    auth: AuthScreen,
    main: mainNavigator,
}, {
    defaultNavigationOptions: defaultNavOptions
})
export default createAppContainer(SwitchNavigator)