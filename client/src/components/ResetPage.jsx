//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import ResetPageContent from '../components/ResetPageContent.jsx';

class ResetPage extends React.Component {

  constructor(props) {
    super(props);
    var parsedUrl = new URL(window.location.href);
    console.log(parsedUrl.searchParams.get('code'));
    var passedCode = parsedUrl.searchParams.get('code');

    this.state = { value: 'blah',
      value2: passedCode,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  componentDidMount() {
    console.log(this.state.value2);

    const code = encodeURIComponent(this.state.value2);
    const formData = `code=${code}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/reset');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log('Found a reset code that matches!');

        this.setState({
          value: true,
        });

      } else {
        console.log('400 response.');

        this.setState({
          value: false,
        });
      }
    });
    xhr.send(formData);
  }

  render() {

    return (
      <div>
        <ResetPageContent resetVar={this.state.value} resetID={this.state.value2}/>
      </div>
    );

  }

}

export default ResetPage;
