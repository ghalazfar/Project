const INITIAL_STATE = { showLogin: false, showRegister: false }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SHOW_LOGIN" :
            return {...state, showLogin: true};
        case "HIDE_LOGIN" :
            return {showLogin: false, showRegister: false};
        case "SHOW_REGISTER":
            return {...state, showRegister: true}
        default :
            return state
    }
}