import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import mapReducer from './mapReducer'


let rootReducer = combineReducers({
  userReducer,
  mapReducer
});

export default createStore(rootReducer);
