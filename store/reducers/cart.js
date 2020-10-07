import CartItem from '../../model/cart_Item'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { ADD_ORDERS } from '../actions/order'
import { DELETE_PRODUCT } from '../actions/products'

const initialSate = {
    items: {},
    totalAmount: 0
}

export default (state = initialSate, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodTitle = addedProduct.title
            const prodPrice = addedProduct.price
            let updateOrNewCartItem
            if (state.items[addedProduct.id]) {
                updateOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodTitle,
                    prodPrice,
                    state.items[addedProduct.id].sum + prodPrice
                )
            }
            else {
                updateOrNewCartItem = new CartItem(1, prodTitle, prodPrice, prodPrice)
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid].quantity
            const selectedCartPrice = state.items[action.pid].price
            const currentSum = state.items[action.pid].sum
            const proTitle = state.items[action.pid].title
            let updatedCartItem;
            if (selectedCartItem > 1)
             {
                updatedCartItem = new CartItem(selectedCartItem - 1,
                    proTitle,
                    selectedCartPrice, currentSum - selectedCartPrice),
                    updatedCartItem = {
                        ...state.items,
                        [action.pid]: updatedCartItem
                    }
            }
            else {
                updatedCartItem = { ...state.items },
                    delete updatedCartItem[action.pid]
            }
            return {
                ...state,
                items: updatedCartItem,
                totalAmount: state.totalAmount - selectedCartPrice
            }
        case ADD_ORDERS:
            return initialSate;
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state
            }
            const updatedItem = { ...state.items }
            delete updatedItem[action.pid]
            const prodSum = state.items[action.pid].sum
            return {
                ...state,
                items: updatedItem,
                totalAmount: state.totalAmount - prodSum
            }
    }
    return state;
}