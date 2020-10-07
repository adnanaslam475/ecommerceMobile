import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'


const styles = StyleSheet.create({
    textStyle: {
        fontWeight: '400',
        marginVertical: 100
    }
})
const ComponentScreen = () => {
    const flatlist = [
        { name: 'adnan', a: '1' },
        { name: 'waqar', a: '1' },
        { name: 'sanad', a: '1' },
        { name: 'sadna', a: '1' },
        { name: 'sadwna', a: '1' },
        { name: 'ssdddsana', a: '1' },
        { name: 'ssccana', a: '1' },
        { name: 'sadwcna', a: '1' },
        { name: 'eeeeeeepooopopopopopopopopoppo', a: '1' },
    ]
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={flatlist} keyExtractor={i => i.name} renderItem={({ item }) => {
                return (<View>
                    <Text style={styles.textStyle}>{item.name}- age{item.a}</Text>
                </View>
                )
            }} />
    )
}
export default ComponentScreen