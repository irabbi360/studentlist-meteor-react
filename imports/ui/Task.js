import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <table id="customers" className={taskClassName}>
        
        <tbody>
        <td>{this.props.task.text}</td>
        <td>{this.props.task.email}</td>
        <td>{this.props.task.phone}</td>
        <td>{this.props.task.country}</td>
        </tbody>
        </table>

    );
  }
}