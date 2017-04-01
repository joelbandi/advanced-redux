import React, { Component } from 'react';
import { connectModule } from 'redux-modules';


//components
import CurrentTask from './currentTask';
import Task from './task';

// import the modules
import tasksModule from '../modules/tasksModule';
import currentTaskModule from '../modules/currentTaskModule';

@connectModule([tasksModule,currentTaskModule])
class App extends Component {
  
  componentWillMount() {
    this.props.actions.tasks.getInitialTasks();
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


    return (
      <div>
        <h1>Task Manager</h1>
        

        <CurrentTask setAsCurrent={setAsCurrent} 
                     currentTask={this.props.currentTask}/>        


        <ul>
          {this.props.tasks.map((task) => {
            return (
              <Task 
                key={task.name}
                task={task}
                doneTask={doneTask}
                undoTask={undoTask}
                setAsCurrent={setAsCurrent}
              />
            );
          })}
        </ul>


        <div className="well well-sm input-group ">
          <input id="newtaskname" type="text" className="form-control" placeholder="Search for..."/>
          <span className="input-group-btn">
            <button className="btn btn-success" onClick={() => {
              addATask({
                name:document.getElementById("newtaskname") ? document.getElementById("newtaskname").value : "",
                done:false
              })  
            }} type="button">Add!</button>
          </span>
        </div>

      </div>
    )
  }
}


export default App