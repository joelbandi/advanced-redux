// This is the main saga file where we are going to implement 3 sagas

/**
 * 1. WorkerSaga - They are the workers behind the logic (esp async logic like API calls)
 * 2. WatcherSaga - That watches (its a listener) for the dispatched actions and intercepts it before reducer gets it
 * 3. rootSaga - That basically combines all watchers into one saga so it can be easily passed as a middleware to the store
 */

// Redux-sagas also have helpers utils that can tell us how to intercept or when to intercept the actions that come from action creators
// ALL SAGAS ARE GENERATOR FUNCTIONS

import { getData } from '../data'
import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'


//This is our watcher ...this generator will be called whenever the action - 'tasks/GET_INITIAL_TASKS' is dispatched.
//this generator can be used to call whatever worker sagas we want to call. in this case its 'workerGetInitialTasks.
export function* watchGetInitialTasks() {
  // console.info('watchGetInitialTasks is running!!');
  yield takeEvery('tasks/GET_INITIAL_TASKS',workerGetInitialTasks);
}


// since our 'workerGetInitialTasks' worker is being called from the above watcher let's define it
// since our work upon an action ususally requires a payload from the data ....the worker gets passed an action
export function* workerGetInitialTasks(action) {
  try {
  // we can perform all sorts of asynchronous stuff here like api call, network access , db access, io stuff.
    // console.info('workerGetInitialTasks is running!!');
    // console.info('received action',action);
    

    // this is where we call our promise based stuff
    // we yield the a call effect which has actual work passed to it.
    // the call api is just like node's call
    // const exampleresponse = yield call(axios.get,"https://www.fakeapi.com/posts");
    const data = yield call(getData);
    
    // once the above promise is resolved...the iterator.next() is called for this generator
    // the above line handles the network request and the next step is to pass in the 
    // resolved data into the reducer to that the reducer can generate the new state.

    // or you can also dispatch new actions straight from workers itself...
    // you dont specifically have to fire it from an action creator

    yield put({
      type: 'tasks/SET_INITIAL_TASKS',
      payload: data
    }); 
    // this action can be used to fire a reducer 
    // now lets write transformation in our tasks module to handle this


    // This actually removed the need to use getData functionality in our front end in App.js where 
    // such logic shouldnt exist in the component life cycle method 
    // in the first place!

  }catch(error) {
    console.error(error);
    // if the promise above somehow rejected -> then you can yield the error action so 
    // that your front end might be able to do something about it
    yield put({
      type: 'tasks/CANT_GET_TASKS ',
      payload: error
    });
  }
}

// rootsaga - single entry point to start all of our sagas all at once
export default function* rootSaga() {
  yield [
    watchGetInitialTasks()
  ];
};