import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import '../styles/logins.css';

export default class AdminLoginPageContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '',
                  value2: '',
                  redirect: false,
                  warningText: '',
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

    //Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
    //Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
    const email = encodeURIComponent(this.state.value);
    const password = encodeURIComponent(this.state.value2);
    const formData = `email=${email}&password=${password}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/adminLogin');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {

        this.setState({
          errors: {},
        });

        TokenHandler.setAdminToken(xhr.response.token);

        localStorage.setItem('headerName', JSON.stringify(xhr.response.user));

        console.log(JSON.parse(localStorage.getItem('headerName')).name);

        this.setState({ redirect: true });

      } else {

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        console.log(xhr.response.message);
        if (xhr.response.message) {

          this.setState({ warningText: xhr.response.message });
        }

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
        {this.state.redirect === false ? (
      <div>
      <legend className="signupTitle">Admin Login</legend>
      <span id="warningSpan">{this.state.warningText}</span>
      <form className="signup" onSubmit={this.handleSubmit}>
      <br/>
      <label className="loginLabel">
        Username/Email:
        <input className="loginEmail" type="email" value={this.state.value} onChange={
            this.handleChange.bind(this, 'value')} />
      </label>
      <br/>
        <label className="loginLabel">
          Password:
          <input className="loginPassword" type="password" value={this.state.value2} onChange={
              this.handleChange.bind(this, 'value2')} />
        </label>
        <br/>
        <div className="lPassword">
          <a className="lPassword" href="/forgot">Lost Password?</a>
        </div>
        <br/>
        <input className="loginInput" type="submit" value="Login" />
      </form>
      <br/>
      <a href="/signup">
      <div className="signupButton">
        <span>Signup</span>
      </div>
      </a>
      <br/>
      <a href="/login">
        <div className="adminLogin">
          User Login
        </div>
      </a>
    </div>
  ) :
  (
     <Redirect to='/add' />
   )
}
    </div>
    );
  }

}
