import {combineReducers} from 'redux-immutablejs';
import {routing}         from './routing.js';

const currentReducers = {
  routing
};

export default combineReducers({...currentReducers});
