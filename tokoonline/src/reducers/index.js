import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CategoryReducer from './CategoryReducer';
import LoginFormReducer from './LoginFormReducer';
import TransactionReducer from './TransactionReducer';

export default combineReducers({
    selectedCategory: CategoryReducer,
    auth: AuthReducer,
    loginform: LoginFormReducer,
    transaction: TransactionReducer
})