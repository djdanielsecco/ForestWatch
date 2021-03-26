import { createStore, combineReducers } from 'redux';
import MyState from './reducers/MyState';

const rootReducer = combineReducers({
  Tag: MyState
});

const store = createStore(rootReducer);
export default store