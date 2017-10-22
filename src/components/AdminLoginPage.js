import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import '../styles/logins.css';

export default class UserLoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '',
                  value2: '',
                  redirect: false,
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = encodeURIComponent(this.state.value);
    const password = encodeURIComponent(this.state.value2);
    const formData = `email=${email}&password=${password}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/adminLogin');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {},
        });

        // save the token
        TokenHandler.authenticateAdminUser(xhr.response.token);

        localStorage.setItem('usrname', JSON.stringify(xhr.response.user));

        console.log(JSON.parse(localStorage.getItem('usrname')).name);

        // if(xhr.response.user)
        // {
        //   console.log(xhr.response.user);
        // }
        // else{
        //   console.log('after signin no user returned');

        // }
        this.setState({ redirect: true });

        // change the current URL to /
        // this.context.router.replace('/');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors,
        });
      }
    });
    xhr.send(formData);
  }

  render() {
    return (
      <div className="loginDiv">
        {this.state.redirect == false ? (
      <div>
      <legend className="signupTitle">Admin Login</legend>
      <form className="signup" onSubmit={this.handleSubmit}>
      <br/>
      <label className="loginLabel">
        Username/Email:
        <input className="loginInput" type="email" value={this.state.value} onChange={
            this.handleChange.bind(this, 'value')} />
      </label>
      <br/>
        <label className="loginLabel">
          Password:
          <input className="loginInput" type="password" value={this.state.value2} onChange={
              this.handleChange.bind(this, 'value2')} />
        </label>
        <br/>
        <a className="lPassword" href="/lostPassword">Lost Password?</a>
        <br/>
        <input className="loginInput" type="submit" value="Login" />
      </form>
      <br/>
      <a href="/adminLogin">
        <div className="accToggle">
          <span>Admin Login</span>
        </div>
      </a>
      <a href="/signup">
      <div className="signupButton">
        <span>Signup</span>
      </div>
      </a>
    </div>
  ) :
  (
     <Redirect to='/admin' />
   )
}
    </div>
    );
  }

}
