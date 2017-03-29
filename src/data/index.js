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

const getData = () => {
  return new Promise((resolve,reject) => {
    resolve(data)
  }) 
}

export default getData;