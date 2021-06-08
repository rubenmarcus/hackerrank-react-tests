import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      inputVal: null,
      tasks: [
            { name: '1', stage: 0 },
            { name: '2', stage: 0 },
        ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];

    this.createTask = this.createTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStage = this.handleStage.bind(this);
  }

  createTask(){
    const task = {name: this.state.inputVal, stage: 0};
    const newTask = this.state.tasks.concat(task);
    this.setState({ tasks: newTask })

  } 

  handleChange({ target }) {
    this.setState({
      inputVal: target.value
    });
  }


removeTask(i) {
  const newArr = [...this.state.tasks]; 
  if (i !== -1) {
    newArr.splice(i, 1);
    this.setState({tasks: newArr});
  }
}

  handleStage(task,i, forward) {

    const stage = forward?  task.stage + 1 : task.stage - 1;

    const newStage = [...this.state.tasks]; 
    if (task.stage !== -1) {
      newStage[i].stage = stage;
      this.setState({tasks: newStage});
    }


  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input id="create-task-input" type="text" className="large"  value={ this.state.inputVal } 
        onChange={ this.handleChange }  placeholder="New task name" data-testid="create-task-input"/>
          <button type="submit" className="ml-30" onClick={this.createTask} data-testid="create-task-button">Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button  onClick={() => this.handleStage(task,index,false)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button  onClick={() => this.handleStage(task,index,true)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button onClick={() => this.removeTask(index)} className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}