import React, { useState, useReducer } from 'react'
import ColorCounter from './colorCounter'
import { Text, View, Button } from 'react-native'
const COLOR_INCREMENT = 15

const squareScreen = () => {

    const initialState = {
        red: 0,
        green: 0,
        blue: 0
    }
    const reducer = (state, action) => {
        switch (action.changeToColor) {
            case 'red':
                if (state.red + action.amount > 255 || state.red + action.amount < 0) {

                    return state
                }
                return { ...state, red: state.red + action.amount }
            case 'green':
                if (state.green + action.amount > 255 || state.green + action.amount < 0) {
                    return state
                }
                return { ...state, green: state.green + action.amount }
            case 'blue':
                
                if (state.blue + action.amount > 255 || state.blue + action.amount < 0) {
                    return state
                }
                return { ...state, blue: state.blue + action.amount }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const { red, green, blue } = state
    return (
        <View>
            <ColorCounter color='red'
                onIncrease={() => dispatch({ changeToColor: 'red', amount: COLOR_INCREMENT })}
                onDecrease={() => dispatch({ changeToColor: 'red', amount: -1 * COLOR_INCREMENT })}
            />
            <ColorCounter color='green'
                onIncrease={() => dispatch({ changeToColor: 'green', amount: COLOR_INCREMENT })}
                onDecrease={() => dispatch({ changeToColor: 'green', amount: -1 * COLOR_INCREMENT })}
            />
            <ColorCounter color='blue'
                onIncrease={() => dispatch({ changeToColor: 'blue', amount: COLOR_INCREMENT })}
                onDecrease={() => dispatch({ changeToColor: 'blue', amount: -1 * COLOR_INCREMENT })}
            />
            <View style={{ height: 100, width: 100, backgroundColor: `rgb(${red},${green},${blue})` }} />
        </View>
    )
}
export default squareScreen