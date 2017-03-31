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
 */
export const thunkGetModifiedData = () => {
  // functiona and getState are automatically passed to function by the redux-thunk middleware!
  // This might come handy !!
  return function(dispatch,getState) {
    console.log('from a thunk->',getState().tasks);
    dispatch(() => {
      // function that return an action 
      return {
        type: 'something',
        payload: {}
      }
    })
  }
}