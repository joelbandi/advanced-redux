import { createModule } from 'redux-modules'

export default createModule({
  name:'tasks',
  initialState: [],
  selector: state => state.tasks,
  transformations: {
    getInitialTasks: {
      reducer: (state,action) => state
    },
    addATask: {
      reducer: (state,action) => [...state,action.payload]
    },
    doneTask: {
      reducer: (state,action) => [...state.filter((task) => task.name !== action.payload.name),{name:action.payload.name,done:true}]
    },
    undoTask: {
      reducer: (state,action) => [{name:action.payload.name,done:false},...state.filter((task) => task.name !== action.payload.name)]
    },
    setInitialTasks: {
      reducer: (state,action) => action.payload
    }
  }
});