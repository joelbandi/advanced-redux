# redux-modules

`redux-modules` is a refinement on the [Redux module](https://github.com/erikras/ducks-modular-redux) concept with developer experience in mind. It provides:
- A concise, **intuitive** way to define actions and state transformations
- Action creator middleware for transforming actions before they're dispatched
- A decorator that handles mapping state and actions to components
- A modified Redux Provider that dynamically registers new reducers as connected components mount

## Getting Started
### Install
`npm install redux-modules --save`

### Usage Example
First we completely convert each duck into its own simple module!!!

#### src/modules/currentTaskModule.js
```js
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
```

### src/modules/tasksModule.js
```js
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
```

These modules automatically create all the required actions, actions types, final reducer based on the options passed and the tranformations passed into it. It follows a standard redux-ducks convention in naming things.
getInitialTasks , tasks/GET_INITIAL_TASKS, tasksReducer are all standard names here. The createModule then creates the tranformation object which is then used to pass the reducer to the store creator and also hook up to individual components to give them actioncreators and states as props.





Once the modules are complete, the reducer has to be added to the store.
This step makes the `ducks/` and the `reducers/` folder useless.

# src/index.js
Use `ModuleProvider` instead of `Provider` to allow reducers to be automatically added to the store at runtime.

```js
import { ModuleProvider } from 'redux-modules';
const createStoreWithMiddleware = applyMiddleware(ReduxPromise,ReduxLogger)(createStore);

ReactDOM.render(
  <ModuleProvider store={createStoreWithMiddleware(state => state,{})}>
    <App />
  </ModuleProvider>
  , document.querySelector('.container'));

```

The last step is to connect the module to the view. This works like a normal Redux `connect` with the added bonus of auto dispatching and namespacing actions.

#### src/views/Todos.jsx
```js
import React,{ Component } from 'react';
import { connectModule } from 'redux-modules';
import tasksModule from '../modules/tasksModule';
import currentTaskModule from '../modules/currentTaskModule';


@connectModule([tasksModule,currentTaskModule])
export default class App extends Component {

  componentWillMount() {
    
    
    //shape of props object in this component
    /** 
    props: {
      actions:{
        tasks: {
          addATask,
          doneTask,
          undoTask,
          getInitialTask
        },
        currentTask:{
          setAsCurrent
        }
      },
      tasks, //slice of state passed as prop
      currentTask //slice of state passed as prop
    }
    **/


    this.props.actions.tasks.getInitialTasks(getData());
  }

  render() {
    const {
      actions:{
        tasks:{
          addATask,
          doneTask,
          undoTask
        },
        currentTask:{
            setAsCurrent
        }
      }
    } = this.props;
  }
}
```

That's it! Check the documentation for comparisons with idiomatic Redux, in depth examples, and advanced usage.

# Documentation
- [Motivation](https://mboperator.gitbooks.io/redux-modules/content/docs/motivation.html)
- [Basic Concepts](https://mboperator.gitbooks.io/redux-modules/content/docs/basics/creating-a-module.html)
- Recipes
- [API Reference](https://mboperator.gitbooks.io/redux-modules/content/docs/api_reference/)
- [Tooling](https://mboperator.gitbooks.io/redux-modules/content/docs/tooling/)