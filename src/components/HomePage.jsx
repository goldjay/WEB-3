//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import PropTypes from 'prop-types';
import TokenHandler from '../client-auth/TokenHandler';
import AwardPage from '../components/AwardPage.jsx';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>

        {TokenHandler.userTokenPresent() == false ? (

          <div>
            <span>Home Page</span>
          </div>
        ) :
      (
        <AwardPage/>
      )}
      </div>

    );

  }

}

export default HomePage;
