import React, { Component } from "react";
import "./new-task-form.css";

export default class NewTaskForm extends Component {

  static defaultProps = {
    onItemAdded: () => {
      return alert('To add a new task, pass the function');
    },
  };

state = {
 label: ''
}
  onLabelDo = (e)=>{
    this.setState({
      label: e.target.value
    })
  }

onSubmit =(e)=>{
e.preventDefault(); 
this.props.onItemAdded(this.state.label);
this.setState({
  label: '' 
})
}

  render(){

    return (
    <form
    onSubmit={this.onSubmit}>
    
    <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={this.onLabelDo}
        value={this.state.label}
      />
    </form>
    )};
};

