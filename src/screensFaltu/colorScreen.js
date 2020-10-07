import React, { useState } from 'react'
import { View, Button, FlatList } from 'react-native'
const colorScreen = () => {
    const [colors, setColors] = useState([])
    const randomrgb = () => {
        const red = Math.floor(Math.random() * 256)
        const blue = Math.floor(Math.random() * 256)
        const green = Math.floor(Math.random() * 256)
        return `rgb(${red}, ${green}, ${blue})`
    }

    return (
        <View>
            <Button title='generate' onPress={() => {
                setColors([...colors, randomrgb()])
            }} />
            <FlatList keyExtractor={item => item} data={colors} renderItem={({ item }) => {
                return (
                    <View style={{ width: 100, height: 100, backgroundColor: item }} />
                )
            }}
            />
        </View>
    )
}
export default colorScreen