import { combineReducers } from 'redux';
import { transactionReducer } from './transactioReducer';

export const rootReducer = combineReducers({
    transaction: transactionReducer
})