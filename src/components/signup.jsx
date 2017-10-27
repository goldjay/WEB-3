//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import SignupContent from '../components/SignupContent.jsx';

class Signup extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let signup = null;

    if (TokenHandler.userTokenPresent() == false && TokenHandler.adminTokenPresent() == false) {
      signup = <SignupContent />;
    } else if (TokenHandler.adminTokenPresent() == true) {
      signup = <Redirect to='/admin' />;
    } else if (TokenHandler.userTokenPresent() == true) {
      signup = <Redirect to='/award' />;
    }

    return (
      <div>
        {signup}
      </div>
    );

  }

}

export default Signup;
