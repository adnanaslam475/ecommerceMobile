import Product from '../../model/ProductModel'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'

export const addProduct = (title, price, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const localId = getState().auth.localId
        const response = await fetch(`https://burgerapp123.firebaseio.com/products.json?auth=${token}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description,
                    localId
                })
            })
        const resData = await response.json()
        dispatch({
            type: ADD_PRODUCT,
            productData: {
                id: resData.name,
                localId,
                title,
                imageUrl,
                price,
                description,
            }
        })
    }
}

export const setProducts = () => {
    return async (dispatch, getState) => {
        const localId = getState().auth.localId
        try {
            // .json ma masla hoga tw error try blok ma eega
            const res = await fetch(`https://burgerapp123.firebaseio.com/products.json`)
            if (!res.ok) {
                throw new Error('this is  !res ok')
            }
            const resData = await res.json()
            let loadedProducts = []
            for (const key in resData) {
                loadedProducts.push(new Product(key,
                    localId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ))
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === localId)
            })
        } catch (error) {
            throw error
        }
    }
}

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        // const localId = getState().auth.localId
        const response = await fetch(`https://burgerapp123.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title, imageUrl, description
            })
        })
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            updateProduct: {
                title,
                imageUrl,
                description
            }
        })

    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        try {
            await fetch(`https://burgerapp123.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: 'DELETE'
            })
            dispatch({
                type: DELETE_PRODUCT,
                pid: productId
            })
        } catch (error) {
            throw error
        }
    }
}