const SET_AS_CURRENT = 'advanced-redux/currentTask/SET_AS_CURRENT';
// exporting action types are optional
export default function currentTaskReducer(state = {}, action) {
  switch(action.type) {
    case SET_AS_CURRENT:
      return action.payload;
    default:
      return state;
  }
}

export function setAsCurrent(task) {
  return {
    type: SET_AS_CURRENT,
    payload: task
  }
}