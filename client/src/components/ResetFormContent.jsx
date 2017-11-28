import React from 'react';
import '../styles/UserPageContent.css';
<<<<<<< HEAD
=======
import TokenHandler from '../client-auth/TokenHandler';
import { refresh } from 'react-router-dom';
>>>>>>> af38203f1bda4b6703f70fb6e65408ca1189f91d
import { Redirect } from 'react-router-dom';

class ResetFormContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false,
      value: '',
      value2: '',
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
    console.log(this.props.resetID);
<<<<<<< HEAD
    if (this.state.value !== this.state.value2)
=======
    if (this.state.value != this.state.value2)
>>>>>>> af38203f1bda4b6703f70fb6e65408ca1189f91d
    {
      this.setState({
        warningText: 'Passwords do not match!',
      });
<<<<<<< HEAD
    } else if (this.state.value === '' || this.state.value2 === '')
=======
    } else if (this.state.value == '' || this.state.value2 == '')
>>>>>>> af38203f1bda4b6703f70fb6e65408ca1189f91d
    {
      this.setState({
        warningText: 'No password entered.',
      });
    } else {
      const password = encodeURIComponent(this.state.value2);
      const passCode = encodeURIComponent(this.props.resetID);
      const formData = `password=${password}&passReset=${passCode}`;

      const xhr = new XMLHttpRequest();
      xhr.open('post', '/editPass');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          console.log('Password is all reset!');

          this.setState({
            redirect: true,
          });

        } else {
          console.log('400 response.');

        }
      });
      xhr.send(formData);
    }
  }

  render() {

    return (
      <div className="loginDiv">
        {this.state.redirect === false ? (
          <div>
      <legend className="signupTitle">Reset Password Form</legend>
      <span id="warningSpan">{this.state.warningText}</span>
      <form className="signup" onSubmit={this.handleSubmit}>
      <br/>
        <label className="loginLabel">
          New Password:
          <input className="loginPassword" type="password" value={this.state.value} onChange={
              this.handleChange.bind(this, 'value')} />
        </label>
      <br/>
        <label className="loginLabel">
          Confirm Password:
          <input className="loginPassword" type="password" value={this.state.value2} onChange={
              this.handleChange.bind(this, 'value2')} />
        </label>
        <br/>
        <input className="loginInput" type="submit" value="Submit" />
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

export default ResetFormContent;
