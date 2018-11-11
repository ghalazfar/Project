const INITIAL_STATE = { onCart: [], onProcess: [], delivered: [] }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "TRANSACTION_DATA" :
            return action.payload;
        case "CLEAR_CART" :
            return { ...INITIAL_STATE }
        default :
            return state
    }
}