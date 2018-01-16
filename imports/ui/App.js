import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';



// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
    const phone = ReactDOM.findDOMNode(this.refs.phoneInput).value.trim();
    const country = ReactDOM.findDOMNode(this.refs.country).value.trim();

    Tasks.insert({
      text,
      email,
      phone,
      country,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.emailInput).value = '';
    ReactDOM.findDOMNode(this.refs.phoneInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Student Information</h1>

          
        </header>
        <div>

<form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <label for="name">Name</label>
            <input
              type="text"
              ref="textInput" id="name"
              placeholder="Enter Name" required />

              <label for="email">Email</label>
              <input
              type="email"
              ref="emailInput" id="email"
              placeholder="Enter Email" required />

              <label for="number">Phone Number</label>
              <input
              type="number"
              ref="phoneInput" id="number"
              placeholder="Enter Phone Number" required />

              <label for="country">Country</label>
            <select id="country" name="country" ref="country">
      <option value="bangladesh">Bangladesh</option>
      <option value="canada">Canada</option>
      <option value="usa">USA</option>
    </select>
            <input type="submit" value="Save Data"/>
          </form>
</div>
          <hr/>
  <table id="customers">
    <tr>
    <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Country</th>
    </tr>
  </table>
      {this.renderTasks()}
</div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);