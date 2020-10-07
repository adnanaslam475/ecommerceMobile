import React from 'react'
import { Text, View, Button } from 'react-native'
const colorCounter = ({ color, onIncrease, onDecrease }) => {
    return (
        <View>
            <Text>{color}</Text>
            <Button title={`increase ${color}`} onPress={onIncrease} />
            <Button title={`decrease ${color}`} onPress={onDecrease} />
        </View>
    )
}
export default colorCounter