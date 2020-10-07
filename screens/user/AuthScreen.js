import React, { useState, useReducer, useCallback, useEffect } from 'react'
import {
    KeyboardAvoidingView, ScrollView, Text,
    View, StyleSheet, Button, ActivityIndicator, TextInput, Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'

const FORM_INPUT = 'FORM_INPUT'
const INPUT_BLUR = 'INPUT_BLUR'
const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            }
            const updatedValidities = {
                ...state.initiallyValid,
                [action.input]: action.isValid
            }
            let isFormValid = false
            return {
                formIsValid: isFormValid,
                inputValues: updatedValues,
                initiallyValid: updatedValidities
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state
    }
}

const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch()
    const [formState, dispacthFormstate] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        initiallyValid: {
            email: false,
            password: false
        },
        touched: false,
        formIsValid: false
    })

    const handleChange = useCallback((inputIdentifier, value) => {
        let isValid = true
        if (inputIdentifier === 'email') {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (value.trim().length === 0 || !emailRegex.test(value.toLowerCase())) {
                isValid = false
            }
        }
        if (inputIdentifier === 'password') {
            if (value.length <= 3) {
                isValid = false
            }
        }
        dispacthFormstate({
            type: FORM_INPUT,
            value: value,
            input: inputIdentifier,
            isValid: isValid
        })
    }, [dispacthFormstate])

    const authhandler = async () => {
        let auth;
        if (isSignUp) {
            auth = authActions.signUp(formState.inputValues.email,
                formState.inputValues.password)
        }
        else {
            auth = authActions.login(formState.inputValues.email,
                formState.inputValues.password)
        }
        try {
            setIsLoading(true)
            await dispatch(auth)
            props.navigation.navigate('main')
        }
        catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert(
                "ERROR!!!",
                error, [{ text: "OK" }])
        }
    }, [error])

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <ScrollView>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={formState.inputValues.email}
                    onChangeText={handleChange.bind(this, 'email')}
                    placeholder='type email'
                    keyboardType='default'
                    style={styles.input}
                    required
                />
                {!formState.initiallyValid.email ?
                    <Text style={styles.errorText}>plase enter valid email
                 </Text> : null}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    onChangeText={handleChange.bind(this, 'password')}
                    value={formState.inputValues.password}
                    // secureTextEntry
                    style={styles.input}
                    keyboardType='default'
                    required
                    placeholder='type Password'
                />
                {!formState.initiallyValid.password ?
                    <Text style={styles.errorText}>please enter valid password
                </Text> : null}
                <View style={styles.btnContainer}>
                    {isLoading ? <ActivityIndicator size='large' color='red' /> :
                        <Button title={isSignUp ? 'sign up' : 'login'} color='red' onPress={authhandler} />}
                    <Button title={`switch to ${isSignUp ? 'login' : 'sign up'}`} color='orange'
                        onPress={() => { setIsSignUp(prevState => !prevState) }} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'authentication'
}
const styles = StyleSheet.create({
    screen: {
        marginTop: 90,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    btnContainer: {
        margin: 10
    },
    formControl: {
        width: '100%'
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
export default AuthScreen