import React, { Component } from 'react';
import _ from 'lodash';


class CurrentTask extends Component {
  render() {

    return (
      <div>
        { !_.isEmpty(this.props.currentTask)  &&
          <div className="jumbotron">
            <h4>
              Active Task:
              <p className='lead'>{this.props.currentTask.name}</p>
              <button style={{margin:'5px'}} 
                      onClick={() => this.props.setAsCurrent({})} 
                      className="btn btn-primary">Unset Current</button>
            </h4>
          </div>
        }
      </div>
    );

  }
}

export default CurrentTask;