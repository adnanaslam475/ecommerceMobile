import React, { useEffect, useReducer } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const INPUT_FORM_UPDATE = 'INPUT_FORM_UPDATE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_FORM_UPDATE:
            // console.log('inptu----->', action.value)
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: false
            }
        default:
            return state
    }
}
const Input = props => {
    const [inputState, dispatchInputstate] = useReducer(inputReducer, {
        value: props.initialValue,
        isValid: props.initiallyValid,
        touched: true
    })
    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatchInputstate({ type: INPUT_FORM_UPDATE, value: text, isValid: isValid });
    }

    const { changehandler, id } = props

    const blurHandler = () => {
        dispatchInputstate({
            type: INPUT_BLUR
        })
    }
    useEffect(() => {
        //child to parent passing props
        changehandler(id, inputState.value, inputState.isValid)
    }, [inputState, changehandler, id])
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={props.value}
                onChangeText={textChangeHandler}
            // onBlur={blurHandler}
            />
            {/* {inputState.touched && <Text style={styles.errorText}>{'ad', props.errortext}</Text>} */}
        </View>
    )
}

const styles = StyleSheet.create({
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

export default Input