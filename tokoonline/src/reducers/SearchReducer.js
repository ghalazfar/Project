const INITIAL_STATE = { searchQuery: '' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SEARCH_QUERY" :
            return action.payload;
        default :
            return state
    }
}