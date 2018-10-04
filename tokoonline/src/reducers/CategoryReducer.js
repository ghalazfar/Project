const INITIAL_STATE = { selectedCategory: '' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "CATEGORY_SELECT" :
            return action.payload;
        default :
            return state
    }
}