import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CategoryReducer from './CategoryReducer';

export default combineReducers({
    selectedCategory: CategoryReducer,
    auth: AuthReducer
})