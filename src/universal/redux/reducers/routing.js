
import {LOCATION_CHANGE} from 'react-router-redux';

const initialState = {locationBeforeTransitions: null};

// TODO: Use an Immutable Map for the location state.

export const routing = (state = initialState, {type, payload}) => {
  if (type === LOCATION_CHANGE) {
    return {...state, locationBeforeTransitions: payload};
  }
  return state;
};
