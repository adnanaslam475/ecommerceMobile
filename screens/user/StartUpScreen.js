import React, { useEffect } from 'react'
import { AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'
const StartUpScreen = props => {
    const dispatch = useDispatch()

    useEffect(() => {
        const authTry = async () => {
            const userdata = await AsyncStorage.getItem('userData')
            if (!userdata) {
                props.navigation.navigate('auth')
                return
            }
            const transformData = JSON.parse(userdata)
            const { localId, token, expirationTime } = transformData
            const newExpirydate = new Date(expirationTime)
            if (newExpirydate <= new Date() || !token || !localId) {
                props.navigation.navigate('auth')
                return
            }
            const expireTime = newExpirydate.getTime() - new Date().getTime()
            console.log('23--->',expireTime)
            dispatch(authActions.authenticate(localId, token, expireTime))
            props.navigation.navigate('main')
        }
        authTry()
    }, [dispatch])
    return (<ActivityIndicator style={styles.start} size='large' />)
}

const styles = StyleSheet.create({
    start: {
        flex: 1,
        color: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default StartUpScreen