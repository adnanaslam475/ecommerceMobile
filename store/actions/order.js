import OrderItem from '../../model/order_item'
export const ADD_ORDERS = 'ADD_ORDERS'
export const SET_ORDERS = 'SET_ORDERS'


export const setOrders = () => {
    return async (dispatch, getState) => {
        const localId = getState().auth.localId;
        try {
            //jb .json or url dono ma masla hofa tw catch blok ma jaega
            const res = await fetch(`https://burgerapp123.firebaseio.com/orders/${localId}.json`)
            if (!res.ok) {
                throw new Error('this is !res ok')
            }
            const resData = await res.json()
            let orderItemsArray = []
            for (const key in resData) {
                orderItemsArray.push(new OrderItem(
                    key,
                    resData[key].orderItem,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ))
            }
            dispatch({
                type: SET_ORDERS,
                orderItems: orderItemsArray
            })
        } catch (error) {
            throw error
        }
    }
}

export const addOrders = (orderItem, totalAmount) => {
    return async (dispatch, getState) => {
        const localId = getState().auth.localId
        const token = getState().auth.token
        try {
            const date = new Date()
            const response = await fetch(`https://burgerapp123.firebaseio.com/orders/${localId}.json?auth=${token}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        orderItem: orderItem,
                        totalAmount: totalAmount,
                        date: date.toISOString()
                    }),
                })
            const resData = await response.json()
            if (!response.ok) {
                throw new Error('something went wrong from addOrders_action')
            }
            dispatch({
                type: ADD_ORDERS,
                items: {
                    id: resData.name,
                    orderItem: orderItem,
                    amount: totalAmount,
                    date: date
                }
            })
        }
        catch (error) {
            throw error
        }
    }
}