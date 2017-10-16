import React from 'react'
import '../styles/logins.css';

export default class UserLoginPage extends React.Component {

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
      <div className="loginDiv">
      <legend className="signupTitle">User Login</legend>
      <form className="signup" onSubmit={this.handleSubmit}>
      <br/>
      <label>
        Username/Email:
        <input type="email" value={this.state.value} onChange={this.handleChange.bind(this, 'value')} />
      </label>
      <br/>
        <label>
          Password:
          <input type="password" value={this.state.value4} onChange={this.handleChange.bind(this, 'value4')} />
        </label>
        <br/>
        <a className="lPassword" href="/lostPassword">Lost Password?</a>
        <br/>
        <input type="submit" value="Login" />
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
    );
  }



  }
