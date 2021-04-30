import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import mapReducer from './mapReducer'
import bucketReducer from './bucketReducer';

let rootReducer = combineReducers({
  userReducer,
  mapReducer,
  bucketReducer
});

export default createStore(rootReducer);
