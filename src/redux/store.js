import {createStore, combineReducers} from 'redux';
import userReducer from './userReducer';
import mapReducer from './mapReducer'
import bucketReducer from './bucketReducer';
import {devToolsEnhancer} from 'redux-devtools-extension'

let rootReducer = combineReducers({
  userReducer,
  mapReducer,
  bucketReducer
});

export default createStore(rootReducer, devToolsEnhancer());
