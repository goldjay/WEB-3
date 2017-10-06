import React from 'react'
import '../styles/signup.css';


export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '',
                  value2: '',
                  value3: '',
                  value4: '',
                  value5: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }

  handleSubmit(event) {
    fetch('/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.value,
          password: this.state.value4,
          firstName: this.state.value2,
          lastName: this.state.value3,
          createDate: this.state.value5
  })
});

    event.preventDefault();
  }

  render() {
    return (
      <div class="inputDiv">
      <form class="signup" onSubmit={this.handleSubmit}>
      <label>
        Username/Email:
        <input type="email" value={this.state.value} onChange={this.handleChange.bind(this, 'value')} />
      </label>
      <br/>
        <label>
          First Name:
          <input type="text" value={this.state.value2} onChange={this.handleChange.bind(this, 'value2')} />
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" value2={this.state.value3} onChange={this.handleChange.bind(this, 'value3')} />
        </label>
        <br/>
        <label>
          Password:
          <input type="password" value2={this.state.value4} onChange={this.handleChange.bind(this, 'value4')} />
        </label>
        <br/>
        <label>
          Creation Date:
          <input type="datetime-local" value2={this.state.value5} onChange={this.handleChange.bind(this, 'value5')} />
        </label>
        <br/>
        <input type="submit" value="Signup" />

      </form>
      </div>
    );
  }
  }
