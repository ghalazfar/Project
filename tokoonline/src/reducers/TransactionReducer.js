const INITIAL_STATE = { onCart: '', onProcess: '', delivered: '' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "TRANSACTION_DATA" :
            return action.payload;
        default :
            return state
    }
}