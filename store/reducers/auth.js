import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialSate = {
    localId: null,
    token: null
}
export default (state = initialSate, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                localId: action.localId,
                token: action.token
            }
        case LOGOUT:
            return initialSate
        default:
            return state
    }
}