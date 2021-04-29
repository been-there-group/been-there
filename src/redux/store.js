import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import bucketReducer from './bucketReducer';

let rootReducer = combineReducers({
  userReducer,
  bucketReducer
});

export default createStore(rootReducer);