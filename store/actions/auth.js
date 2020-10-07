export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
import { AsyncStorage } from 'react-native'
let timer

export const authenticate = (localId, token, expirationTime) => {
    return dispatch => {
        dispatch(setlogoutTimer(expirationTime))
        dispatch({ type: AUTHENTICATE, localId: localId, token: token })
    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {
        type: LOGOUT
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setlogoutTimer = expiryTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expiryTime )
    }
}

// 3600000/100 =36 seconds
// 3600000/1000 =3.6 seconds

export const signUp = (email, password) => {
    return async dispatch => {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZhw--QkCDWKw4OF4N12b8OY5i3suUjaM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        if (!res.ok) {
            const errorRes = await res.json()
            const errorId = errorRes.error.message
            let errorMsg = 'something went wrong frm signup'
            if (errorId === 'EMAIL_EXISTS') {
                errorMsg = 'this email is already in used'
            }
            throw new Error(errorMsg)
        }
        const resData = await res.json()
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expirationTime = new Date(new Date().getTime() +
            parseInt(resData.expiresIn) * 1000)
        saveData(resData.localId, resData.idToken, expirationTime)
    }
}


export const login = (email, password) => {
    return async dispatch => {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZhw--QkCDWKw4OF4N12b8OY5i3suUjaM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })
        if (!res.ok) {
            const errorRes = await res.json()
            const errorId = errorRes.error.message
            let errorMsg = 'something went wrong frm login'
            if (errorId === 'EMAIL_NOT_FOUND') {
                errorMsg = 'this email could not be found'
            }
            else if (errorId === 'INVALID_PASSWORD') {
                errorMsg = 'passsword is incorrect'
            }
            throw new Error(errorMsg)
        }
        const resData = await res.json()
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expirationTime = new Date(new Date().getTime() +
            parseInt(resData.expiresIn) * 1000)
        saveData(resData.localId, resData.idToken, expirationTime)
    }
}

const saveData = (localId, token, expirationTime) => {
    AsyncStorage.setItem('userData',
        JSON.stringify({
            localId: localId,
            token: token,
            expirationTime: expirationTime.toISOString()
        }))
}