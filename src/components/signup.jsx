import React from 'react';
import '../styles/signup.css';
import { Redirect } from 'react-router-dom';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '',
                  value2: '',
                  value3: '',
                  value4: '',
                  value5: '',
                  value6: 'generic',
                  value7: '',
                  redirect: false,
                  errors: {},
                  eMessage: '', };

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
    event.preventDefault();

    const type = encodeURIComponent(this.state.value6);
    const email = encodeURIComponent(this.state.value);
    const password = encodeURIComponent(this.state.value4);
    const firstName = encodeURIComponent(this.state.value2);
    const lastName = encodeURIComponent(this.state.value3);
    const createDate = encodeURIComponent(this.state.value5);
    const formData = `type=${type}&email=${email}&password=${password}&firstName=
    ${firstName}&lastName=${lastName}&createDate=${createDate}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {},
        });

        // set a message
        //localStorage.setItem('successMessage', xhr.response.message);
        this.setState({ redirect: true });

        // console.log(xhr.response.message);
        // make a redirect
        // this.context.router.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        console.log(this.eMessage);
        this.setState({
          errors,
        });
      }
    });
    xhr.send(formData);

  }

  render() {
    return (
      <div className="inputDiv">

      {this.state.redirect == false ? (
        <div>
      <legend className="signupTitle">User and Admin Sign-Up</legend>
      <br/>
      <span>{this.state.eMessage}</span>
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
    ) :
    (
       <Redirect to='/login' />
     )
  }
      </div>
    );
  }
}
