import { combineReducers } from 'redux';
import fetchReducer from './fetch_reducer';

const rootReducer = combineReducers({
  data: fetchReducer
});

export default rootReducer;
