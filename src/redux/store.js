import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';


let rootReducer = combineReducers({
  userReducer
});

export default createStore(rootReducer);