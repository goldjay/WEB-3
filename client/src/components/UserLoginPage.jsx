//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import UserLoginPageContent from '../components/UserLoginPageContent.jsx';

class UserLoginPage extends React.Component {


  render() {
    let userLogin = null;

    if (TokenHandler.userTokenPresent() === false && TokenHandler.adminTokenPresent() === false) {
      userLogin = <UserLoginPageContent />;
    } else if (TokenHandler.adminTokenPresent() === true) {
      userLogin = <Redirect to='/admin' />;
    } else if (TokenHandler.userTokenPresent() === true) {
      userLogin = <Redirect to='/award' />;
    }

    return (
      <div className="loginBox">
        {userLogin}
      </div>
    );

  }

}

export default UserLoginPage;
