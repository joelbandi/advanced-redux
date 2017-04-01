const data = [
  {
    name: 'Feed the cat',
    done: true
  },
  {
    name: 'Walk the dog',
    done: false
  },
  {
    name: 'Take out trash',
    done: true
  },
  {
    name: 'Pay utility bill',
    done: false
  },
  {
    name: 'Buy milk',
    done: true
  },
  {
    name: 'Take over Russia',
    done: false
  },
  {
    name: 'Wipe the windows',
    done: true
  },
];

export const getData = () => {
  return new Promise((resolve,reject) => {
    resolve(data)
  }) 
}




/**
 * A thunk is a function that returns a function containing the things we need to do so we can execute it 
 * at a time of our choosing.
 * In Redux, You can use thunkified action creators that return a functions that can used to perform asynchronous actions!
 * redux-thunk middleware sees that its a thunk that returns an action creator or dispatches an action whenever we choose and intercepts it
 */

// A THUNK SHOULD BE TREATED LIKE AN ACTION CREATOR...so you can import it in a component or bind it to as an action creator
export const thunkGetData = () => {
  // distpatch and getState are automatically passed to function by the redux-thunk middleware!
  // This might come handy !!
  // return function(dispatch,getState) {
  //   console.log('from a thunk');
  //   dispatch(() => {
  //     // function that return an action 
  //     return {
  //       type: 'something',
  //       payload: {}
  //     }
  //   })
  // }
  // ^ that was how a sample thunk looks like 

  // A standard work flow is the to return a function that performs a async task and then dispatches new
  // actions to let the reducer know that the the async task is finished!!

  // for example in this case


  return function(dispatch,getState) {
    // console.log('I\'m a thunk');
    dispatch({
      type:'ABOUT_TO_FETCH_TASKS'
    }) // you could use this to set up a spinner or something like that!

    getData().then(data => {
      dispatch({
        type:'tasks/SET_INITIAL_TASKS',
        payload: data
      });
      dispatch({
        type:'tasks/FETCHING_COMPLETE'
      })
    })

    // you can wrap the block above in a try catch and even dispatch an error action if needed by app UI to handle issues

    // Let's add these cases as transforms in our module
    // and then import this as an action and call it whenever

  }

}