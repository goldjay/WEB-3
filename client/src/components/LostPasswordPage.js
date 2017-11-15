//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import LostPasswordPageContent from '../components/LostPasswordPageContent.jsx';

class LostPasswordPage extends React.Component {

  render() {
    let forgot = null;

    if (TokenHandler.userTokenPresent() === false && TokenHandler.adminTokenPresent() === false) {
      forgot = <LostPasswordPageContent />;
    } else if (TokenHandler.adminTokenPresent() === true) {
      forgot = <Redirect to='/admin' />;
    } else if (TokenHandler.userTokenPresent() === true) {
      forgot = <Redirect to='/award' />;
    }

    return (
      <div>
        {forgot}
      </div>
    );

  }

}

export default LostPasswordPage;
