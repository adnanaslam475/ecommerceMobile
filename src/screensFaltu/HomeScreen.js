import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'red'
  },
  viewStyle: {
    width: '70%',
    height: 60,
    borderWidth: 2,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around'
  },
  textOne: {
    borderWidth: 1,
    borderColor: 'red',
    flex: 1
  },

  textTwo: {
    borderWidth: 1,
    borderColor: 'red',

  },
  textThree: {
    borderWidth: 1,
    borderColor: 'red',

  },
})

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textOne}>text </Text>
      <Text style={styles.textTwo}>text two</Text>
      <Text style={styles.textThree}>text three</Text>
    </View>
  )
}

export default HomeScreen
