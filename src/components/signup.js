import React from 'react'
import '../styles/signup.css';
var fileSystem = require('fs');

export default class Signup extends React.Component {


  constructor(props) {
    super(props);
    this.state = {value: '',
                  value2: '',
                  value3: '',
                  value4: '',
                  value5: '',
                  value6: 'generic',
                  value7: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleVisibility() {
    if (document.getElementById('accountSelect').value === 'admin') {
      document.getElementById('fName').style.display = 'none';
      document.getElementById('fNameBR').style.display = 'none';
      document.getElementById('fNameLabel').style.display = 'none';
      document.getElementById('lName').style.display = 'none';
      document.getElementById('lNameBR').style.display = 'none';
      document.getElementById('lNameLabel').style.display = 'none';
    }
    else {
      {
        document.getElementById('fName').style.display = 'inline';
        document.getElementById('fNameBR').style.display = 'inline';
        document.getElementById('fNameLabel').style.display = 'inline';
        document.getElementById('lName').style.display = 'inline';
        document.getElementById('lNameBR').style.display = 'inline';
        document.getElementById('lNameLabel').style.display = 'inline';
      }
    }
  }

  handleChange(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
      this.handleVisibility();
    }

  handleSubmit(event) {
    fetch('/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: this.state.value6,
          email: this.state.value,
          password: this.state.value4,
          firstName: this.state.value2,
          lastName: this.state.value3,
          createDate: this.state.value5
  })
});
    //Referenced: https://stackoverflow.com/questions/40867927/how-to-redirect-page-with-javascript-in-react-router
    this.context.router.push('/');
    event.preventDefault();
  }

  render() {
    return (
      <div class="inputDiv">
      <legend class="signupTitle">User and Admin Sign-Up</legend>
      <br/>
      <form class="signup" onSubmit={this.handleSubmit} action="www.google.com" method="get">
      <label>
        Account Type:
          <select id="accountSelect" onChange={this.handleChange.bind(this, 'value6')}>
              <option value='generic'>User</option>
              <option value='admin'>Admin</option>
          </select>
      </label>
      <br/>
      <br/>
      <label>
        Username/Email:
        <input type="email" value={this.state.value} onChange={this.handleChange.bind(this, 'value')} />
      </label>
      <br/>
        <label id="fNameLabel">
          First Name:
          <input id="fName" type="text" value={this.state.value2} onChange={this.handleChange.bind(this, 'value2')} />
        </label>
        <br id="fNameBR"/>
        <label id="lNameLabel">
          Last Name:
          <input id="lName" type="text" value2={this.state.value3} onChange={this.handleChange.bind(this, 'value3')} />
        </label>
        <br id="lNameBR"/>
        <label>
          Password:
          <input type="password" value2={this.state.value4} onChange={this.handleChange.bind(this, 'value4')} />
        </label>
        <br/>
        <label>
          Creation Date:
          <input type="date" value2={this.state.value5} onChange={this.handleChange.bind(this, 'value5')} />
        </label>
        <br/>
        <br/>
        <input type="submit" value="Signup" />


      </form>
      </div>
    );
  }
  }
