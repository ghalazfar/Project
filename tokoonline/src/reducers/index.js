import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CategoryReducer from './CategoryReducer';
import SearchReducer from './SearchReducer';
import LoginFormReducer from './LoginFormReducer';
import TransactionReducer from './TransactionReducer';

export default combineReducers({
    selectedCategory: CategoryReducer,
    searchQuery: SearchReducer,
    auth: AuthReducer,
    loginform: LoginFormReducer,
    transaction: TransactionReducer
})