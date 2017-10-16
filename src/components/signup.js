import React from 'react'
import '../styles/signup.css';

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
      document.getElementById('sigLabel').style.display = 'none';
      document.getElementById('sig').style.display = 'none';
      document.getElementById('sigBR').style.display = 'none';
    }
    else {
      {
        document.getElementById('fName').style.display = 'inline';
        document.getElementById('fNameBR').style.display = 'inline';
        document.getElementById('fNameLabel').style.display = 'inline';
        document.getElementById('lName').style.display = 'inline';
        document.getElementById('lNameBR').style.display = 'inline';
        document.getElementById('lNameLabel').style.display = 'inline';
        document.getElementById('sigLabel').style.display = 'inline';
        document.getElementById('sig').style.display = 'inline';
        document.getElementById('sigBR').style.display = 'none';
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
      <div className="inputDiv">
      <legend className="signupTitle">User and Admin Sign-Up</legend>
      <br/>
      <form className="signup" onSubmit={this.handleSubmit}>
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
          <input id="lName" type="text" value={this.state.value3} onChange={this.handleChange.bind(this, 'value3')} />
        </label>
        <br id="lNameBR"/>
        <label>
          Password:
          <input type="password" value={this.state.value4} onChange={this.handleChange.bind(this, 'value4')} />
        </label>
        <br/>
        <label>
          Creation Date:
          <input type="date" value={this.state.value5} onChange={this.handleChange.bind(this, 'value5')} />
        </label>
        <br/>
        <label id="sigLabel">
          Signature:
          <input id="sig" type="file" value={this.state.value7} onChange={this.handleChange.bind(this, 'value7')} />
        </label>
        <br id='sigBR'/>
        <br/>
        <input type="submit" value="Signup" />


      </form>
      </div>
    );
  }
  }
