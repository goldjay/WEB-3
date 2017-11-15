import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import '../styles/LostPasswordPageContent.css';

export default class LostPasswordPageContent extends React.Component {

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

    const blankPass = 'blank';
    const email = encodeURIComponent(this.state.value);
    const password = encodeURIComponent(blankPass);
    const formData = `email=${email}&password=${password}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/forgot');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {},
        });

        this.setState({ redirect: true });

      } else {

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        console.log('Here is the error message.');
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
      <div className="forgetDiv">
        {this.state.redirect === false ? (
          <div>
  <legend className="forgetTitle">Password Recovery</legend>
  <span id="warningSpan">{this.state.warningText}</span>
  <form className="forget" onSubmit={this.handleSubmit}>
  <br/>
  <label className="forgetLabel">
    Username/Email:
    <input className="forgetEmail" type="email" value={this.state.value} onChange={
        this.handleChange.bind(this, 'value')} />
  </label>
  <br/>
    <input className="forgetInput" type="submit" value="Submit" />
  </form>
  </div>
) :
(
   <Redirect to='/' />
 )
}
</div>
    );
  }

}
