import { ADD_ORDERS, SET_ORDERS } from '../actions/order'
import OrderItem from '../../model/order_item'

const initialSate = {
    orderItems: []
}
export default (state = initialSate, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                orderItems: action.orderItems
            }
        case ADD_ORDERS:
            const order = new OrderItem(
                action.items.id,
                action.items.orderItem,
                action.items.amount,
                action.items.date
            )
            return {
                ...state,
                orderItems: state.orderItems.concat(order)
            }
    }
    return state
}