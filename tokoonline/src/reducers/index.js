// buat reducers:
// cara membuat global state
// satu reducer untuk mengisi satu property
// bikin satu file untuk satu reducers, [nama]Reducer

import { combineReducers } from 'redux';
// import UsersReducer from './UsersReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    // mengisi array ke property users
    // users: UsersReducer,
    // sekarang isinya users = state di UsersReducer
    // state = data array
    auth: AuthReducer
})