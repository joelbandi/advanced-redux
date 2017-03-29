import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInitialTasks, setAsCurrent, addATask, doneTask, undoTask } from '../actions'


//components
import CurrentTask from './currentTask';
import Task from './task';

class App extends Component {
  
  componentWillMount() {
    this.props.getInitialTasks();
  }
  
  render() {
    return (
      <div>
        <h1>Task Manager</h1>
        

        <CurrentTask setAsCurrent={this.props.setAsCurrent} 
                     currentTask={this.props.currentTask}/>        


        <ul>
          {this.props.tasks.map((task) => {
            return (
              <Task 
                key={task.name}
                task={task}
                doneTask={this.props.doneTask}
                undoTask={this.props.undoTask}
                setAsCurrent={this.props.setAsCurrent}
              />
            );
          })}
        </ul>


        <div className="well well-sm input-group ">
          <input id="newtaskname" type="text" className="form-control" placeholder="Search for..."/>
          <span className="input-group-btn">
            <button className="btn btn-success" onClick={() => {
              this.props.addATask({
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

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentTask: state.currentTask
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getInitialTasks,
    setAsCurrent,
    addATask,
    doneTask,
    undoTask
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);