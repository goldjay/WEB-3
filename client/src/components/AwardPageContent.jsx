import React from 'react';
import '../styles/AwardPageContent.css';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import '../styles/AwardPageContent.css';

class AwardPageContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: 'empMonth',
                  value2: '',
                  value3: '',
                  value4: '',
                  value5: '',
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

    const type = encodeURIComponent(this.state.value);
    const receiverFirstName = encodeURIComponent(this.state.value2);
    const receiverLastName = encodeURIComponent(this.state.value3);
    const receiverEmail = encodeURIComponent(this.state.value4);
    const timeGiven = encodeURIComponent(this.state.value5);
    const formData = `type=${type}&receiverFirstName=${receiverFirstName}&receiverLastName=${receiverLastName}&receiverEmail=${receiverEmail}&timeGiven=${timeGiven}`;
    var authHeader = 'bearer ' + TokenHandler.returnUserToken();

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/award');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', authHeader);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {},
        });

        console.log('Award Creation Success!');
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
      <div className="awardContentDiv">
        {this.state.redirect == false ? (
          <div>
      <legend className="signupTitle">Award Generation</legend>
      <span id="warningSpan">{this.state.warningText}</span>
      <form className="award" onSubmit={this.handleSubmit}>
      <br/>
        <label className ="awardLabel">
          Award Type:
            <select id="awardSelect" onChange={this.handleChange.bind(this, 'value')}>
                <option value='empMonth'>Employee of the Month</option>
                <option value='empWeek'>Employee of the Week</option>
            </select>
        </label>
        <br/>
          <label className="awardLabel">
            Recipient First Name:
            <input className="awardRec" type="text" value={this.state.value2} onChange={
                this.handleChange.bind(this, 'value2')} />
          </label>
        <br/>
          <label className="awardLabel">
            Recipient Last Name:
            <input className="awardRec" type="text" value={this.state.value3} onChange={
                this.handleChange.bind(this, 'value3')} />
          </label>
        <br/>
      <label className="awardLabel">
        Recipient Email:
        <input className="awardEmail" type="email" value={this.state.value4} onChange={
            this.handleChange.bind(this, 'value4')} />
      </label>
      <br/>
        <label className ="awardLabel">
          Creation Date:
          <input className="awardDate" type="datetime-local" value={this.state.value5}
             onChange={this.handleChange.bind(this, 'value5')} />
        </label>
        <br/>
        <input className="awardSubmit" type="submit" value="Submit Award" />
      </form>
    </div>
  ) :
  (
     <Redirect to='/user' />
   )
  }
    </div>
    );
  }

}

export default AwardPageContent;
