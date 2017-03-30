import { createModule } from 'redux-modules'

export default createModule({
  name:'tasks',
  initialState: [],
  selector: state => state.tasks,
  transformations: {
    getInitialTasks: {
      reducer: (state,action) => action.payload
    },
    addATask: {
      reducer: (state,action) => [...state,action.payload]
    },
    doneTask: {
      reducer: (state,payload) => [...state.filter((task) => task.name !== action.payload.name),{name:action.payload.name,done:true}]
    },
    undoTask: {
      reducer: (state,payload) => [{name:action.payload.name,done:false},...state.filter((task) => task.name !== action.payload.name)]
    }
  }
});