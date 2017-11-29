import React from 'react';
import '../styles/signup.css';
import { Redirect } from 'react-router-dom';

export default class SignupContent extends React.Component {

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
                  warningText: '', };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleVisibility() {
    if (document.getElementById('accountSelect').value === 'admin') {
      document.getElementById('fName').style.display = 'none';
      // document.getElementById('fNameBR').style.display = 'none';
      document.getElementById('fNameLabel').style.display = 'none';
      document.getElementById('lName').style.display = 'none';
      document.getElementById('lNameBR').style.display = 'none';
      document.getElementById('lNameLabel').style.display = 'none';
      document.getElementById('sigLabel').style.display = 'none';
      document.getElementById('files').style.display = 'none';
      //document.getElementById('sigBR').style.display = 'none';
      document.getElementById('sigPreviewDiv').style.display = 'none';
    } else {
      {
        document.getElementById('fName').style.display = 'inline';
        document.getElementById('fNameBR').style.display = 'inline';
        document.getElementById('fNameLabel').style.display = 'inline';
        document.getElementById('lName').style.display = 'inline';
        document.getElementById('lNameBR').style.display = 'inline';
        document.getElementById('lNameLabel').style.display = 'inline';
        document.getElementById('sigLabel').style.display = 'inline';
        document.getElementById('files').style.display = 'inline';
        document.getElementById('sigPreviewDiv').style.display = 'block';
        //document.getElementById('sigBR').style.display = 'none';
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

    //Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
    //Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

    //Referenced: https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    var thisDate = new Date();
    var sentDateTime = thisDate.getFullYear() + '/'
                + (thisDate.getMonth() + 1)  + '/'
                + thisDate.getDate() + ' '
                + thisDate.getHours() + ':'
                + thisDate.getMinutes() + ':'
                + thisDate.getSeconds();

    console.log(sentDateTime);

    const type = encodeURIComponent(this.state.value6);
    const email = encodeURIComponent(this.state.value);
    const password = encodeURIComponent(this.state.value4);
    const firstName = encodeURIComponent(this.state.value2);
    const lastName = encodeURIComponent(this.state.value3);
    const createDate = encodeURIComponent(sentDateTime);
    const signature = this.state.newValue;

    var sentSig = null;

    if (signature !=  null)
    {
      var sigSplit = signature.split('base64,');
      var nonEncSig = sigSplit[1];

      sentSig = encodeURIComponent(nonEncSig);
    }

    console.log('This is sig split: ');
    console.log(sigSplit);
    const formData = `type=${type}&email=${email}&password=${password}&firstName=${firstName}&lastName=${lastName}&createDate=${createDate}&signature=${sentSig}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
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
        console.log(this.eMessage);

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

  //Referenced: https://codepen.io/hartzis/pen/VvNGZP
  sigImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let reader2 = new FileReader();
    let file = e.target.files[0];

    if (file != null)
    {
      if (file.type.match('image.*')) {
        reader.onloadend = () => {
          this.setState({
            file: file,
            sigPreviewUrl: reader.result,
          });
        };

        reader.readAsDataURL(file);

        reader2.onloadend = () => {
          this.setState({
            newValue: reader2.result,
          });
          console.log(reader2.result);
        };

        reader2.readAsDataURL(file);
      }
    }

  }

  render() {

    let { sigPreviewUrl } = this.state;
    let $sigPreview = null;
    if (sigPreviewUrl) {
      $sigPreview = (<img src={sigPreviewUrl} />);
    } else {
      $sigPreview = (<div>Please select a Signature to preview</div>);
    }

    return (
      <div className="inputDiv">

      {this.state.redirect == false ? (
        <div>
      <legend className="signupTitle">User and Admin Sign-Up</legend>
      <span id="warningSpan">{this.state.warningText}</span>
      <br/>
      <span>{this.state.eMessage}</span>
      <br/>
      <form className="signup" onSubmit={this.handleSubmit}>
      <label className ="signupLabel">
        Account Type:
          <select id="accountSelect" onChange={this.handleChange.bind(this, 'value6')}>
              <option value='generic'>User</option>
              <option value='admin'>Admin</option>
          </select>
      </label>
      <label className ="signupLabel">
        Username/Email:
        <input className="signupInput" type="email" value={this.state.value} onChange={this.handleChange.bind(this, 'value')} />
      </label>

        <div id="fNameLabel">
          First Name:
          <input className="signupInput" id="fName" type="text" value={this.state.value2} onChange={this.handleChange.bind(this, 'value2')} />
        </div>

        <div id="lNameLabel">
          Last Name:
        </div>
        <div>
          <input className="signupInput" id="lName" type="text" value={this.state.value3} onChange={this.handleChange.bind(this, 'value3')} />
        </div>
        <label className ="signupLabel">
          Password:
          <input className="signupInput" type="password" value={this.state.value4} onChange={this.handleChange.bind(this, 'value4')} />
        </label>

        <label id="sigLabel">
          Signature:
          <input id="files" type="file" name="files[]" accept=".jpg,.png" onChange={(e)=>this.sigImageChange(e)} />
        </label>
        <div id="sigPreviewDiv" className="sigPreview">
          {$sigPreview}
        </div>

        <input className="signupButton" type="submit" value="SIGN UP" />
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
