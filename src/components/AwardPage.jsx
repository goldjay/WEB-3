//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import PropTypes from 'prop-types';

class AwardPage extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <span>You will only see this text if you are logged in!</span>
      </div>

    );

  }

}

export default AwardPage;
