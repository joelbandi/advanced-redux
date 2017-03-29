import getData from '../data';
export const GET_INITIAL_TASKS = 'GET_INITIAL_TASKS';
export const SET_AS_CURRENT = 'SET_AS_CURRENT';
export const ADD_A_TASK = 'ADD_A_TASK';
export const DONE_TASK = 'DONE_TASK'
export const UNDO_TASK = 'UNDO_TASK'
export const getInitialTasks = () => {
  return {
    type: GET_INITIAL_TASKS,
    payload: getData()
  }
}

export const setAsCurrent = (task) => {
  return {
    type: SET_AS_CURRENT,
    payload: task
  }
}

export const addATask = (task) => {
  return {
    type: ADD_A_TASK,
    payload: task
  }
}

export const doneTask = (task) => {
  return {
    type: DONE_TASK,
    payload: task
  }
}

export const undoTask = (task) => {
  return {
    type: UNDO_TASK,
    payload: task
  }
}