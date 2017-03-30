import { createModule } from 'redux-modules';

export default createModule({
  name:'currentTask',
  initialState: {},
  selector: state => state.currentTask,
  transformations: {
    setAsCurrent: {
      reducer: (state,action) => action.payload
    }
  }
});