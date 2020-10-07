import PRODUCTS from "../../data/dummy-data"
import Product from '../../model/ProductModel'
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS } from "../actions/products";
const initialState = {
    userProducts: [],
    availableProducts: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.localId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            )
            return {
                ...state,
                userProducts: state.userProducts.concat(newProduct),
                availableProducts: state.availableProducts.concat(newProduct)
            }
        case SET_PRODUCTS:
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid)
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.updateProduct.title,
                action.updateProduct.imageUrl,
                action.updateProduct.description,
                state.userProducts[productIndex].price
            )
            const updateduserProducts = [...state.userProducts]
            updateduserProducts[productIndex] = updatedProduct
            const availableproductIndex = state.availableProducts.findIndex(prod =>
                prod.id === action.pid)
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableproductIndex] = updatedProduct
            return {
                ...state,
                userProducts: updateduserProducts,
                availableProducts: updatedAvailableProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id !== action.pid),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.pid)
            }
        default:
            return state
    }
}
