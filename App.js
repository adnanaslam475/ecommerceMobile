import React, { useState } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order'
import productReducer from './store/reducers/products'
import authReducer from './store/reducers/auth'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import NavigationContainer from './navigation/navigationContainer'

export default function App() {
  const [fontLoaded, setfontLoaded] = useState(false)
  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  }


  
  const reducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer
  })
  const store = createStore(reducer, applyMiddleware(thunk))
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts}
      onFinish={() => setfontLoaded(true)}
      onError={err => console.log(err)} />
  }
  return <Provider store={store}>
    <NavigationContainer />
  </Provider>
}