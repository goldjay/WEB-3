//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import AdminLoginPageContent from '../components/AdminLoginPageContent.jsx';

class AdminLoginPage extends React.Component {

  render() {
    let adminLogin = null;

    if (TokenHandler.userTokenPresent() === false && TokenHandler.adminTokenPresent() === false) {
      adminLogin = <AdminLoginPageContent />;
    } else if (TokenHandler.adminTokenPresent() === true) {
      adminLogin = <Redirect to='/add' />;
    } else if (TokenHandler.userTokenPresent() === true) {
      adminLogin = <Redirect to='/award' />;
    }

    return (
      <div>
        {adminLogin}
      </div>
    );

  }

}

export default AdminLoginPage;
