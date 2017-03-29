import getData from '../data'
// exporting action types are optional
const GET_INITIAL_TASKS = 'advanced-redux/tasks/GET_INITIAL_TASKS';
const ADD_A_TASK = 'advanced-redux/tasks/ADD_A_TASK';
const DONE_TASK = 'advanced-redux/tasks/DONE_TASK'
const UNDO_TASK = 'advanced-redux/tasks/UNDO_TASK'

export default function reducer(state = [], action) {
  switch(action.type) {
    case GET_INITIAL_TASKS:
      return action.payload;
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

export function addATask(task) {
  return {
    type: ADD_A_TASK,
    payload: task
  }
}

export function doneTask(task) {
  return {
    type: DONE_TASK,
    payload: task
  }
}

export function undoTask(task) {
  return {
    type: UNDO_TASK,
    payload: task
  }
}

export function getInitialTasks() {
  return {
    type: GET_INITIAL_TASKS,
    payload: getData()
  }
}