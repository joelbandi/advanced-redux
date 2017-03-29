import React, { Component } from 'react';

export default class Task extends Component {
  
  render() {
    const { task } = this.props;
    return (
      <li >
      <div className='well well-sm'>
        <div className='lead' style={{display:'inline-block'}}>
          {task.done? <span className="label label-success">done</span> : <span className="label label-danger">pending</span>} {task.name} 
        </div>
          
        <div style={{display:'inline-block',float:'right'}}>
          { !task.done ?
            <button style={{margin:'5px'}} 
                    className="btn btn-success"
                    onClick={() => {this.props.doneTask(task)}}>Done</button> :

            <button style={{margin:'5px'}} 
                    className="btn btn-danger"
                    onClick={() => {this.props.undoTask(task)}}>Undo</button>

          }
          <button style={{margin:'5px'}} 
                  onClick={() => this.props.setAsCurrent(task)} 
                  className="btn btn-primary">Set Current</button>
        </div>
    </div>
    </li>
    );
  }
}