import { combineReducers } from 'redux';
import { GET_INITIAL_TASKS, SET_AS_CURRENT, ADD_A_TASK, DONE_TASK, UNDO_TASK } from '../actions'

const tasksReducer = (state = [], action) => {
  switch(action.type) {
    case GET_INITIAL_TASKS:
      return action.payload;
      break;
    case ADD_A_TASK:
      return [...state,action.payload];
    case DONE_TASK:
      return [...state.filter((task) => task.name !== action.payload.name),{name:action.payload.name,done:true}]
    case UNDO_TASK:
      return [{name:action.payload.name,done:false},...state.filter((task) => task.name !== action.payload.name)]
    default:
      return state;
  }
}


const currentTaskReducer = (state = {}, action) => {
  switch(action.type) {
    case SET_AS_CURRENT:
      return action.payload;
      break;
    default:
      return state;
  }
}


// This controls the shape of the global state
const rootReducer = combineReducers({
  tasks: tasksReducer,
  currentTask: currentTaskReducer
});

export default rootReducer;
