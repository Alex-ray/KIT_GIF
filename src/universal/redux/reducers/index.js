import {combineReducers} from 'redux-immutablejs';
import {routing}         from './routing.js';
import search            from './search.js';

const currentReducers = {
  routing,
  search
};

export default combineReducers({...currentReducers});
