import { combineReducers } from 'redux';

import tasksReducer from '../ducks/tasksDuck'
import currentTaskReducer from '../ducks/currentTaskDuck'


// This controls the shape of the global state
const rootReducer = combineReducers({
  tasks: tasksReducer,
  currentTask: currentTaskReducer
});

export default rootReducer;