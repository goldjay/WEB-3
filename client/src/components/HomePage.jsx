//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
//Referenced: https://reactjs.org/docs/conditional-rendering.html

import React from 'react';
import TokenHandler from '../client-auth/TokenHandler';
import HomeContent from '../components/HomeContent.jsx';
import { Redirect } from 'react-router-dom';

class HomePage extends React.Component {


  render() {
    let homePage = null;

    if (TokenHandler.userTokenPresent() === false && TokenHandler.adminTokenPresent() === false) {
      homePage = <HomeContent />;
    } else if (TokenHandler.userTokenPresent() === true) {
      homePage = <Redirect to='/award' />;
    } else if (TokenHandler.adminTokenPresent() === true) {
      homePage = <Redirect to='/admin' />;
    }

    return (
      <div>
        {homePage}
      </div>
    );

  }

}

export default HomePage;
