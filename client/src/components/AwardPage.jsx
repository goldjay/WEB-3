//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Redirect } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import AwardPageContent from '../components/AwardPageContent.jsx';

class AwardPage extends React.Component {

  render() {
    let awardPage = null;

    if (TokenHandler.userTokenPresent() === false && TokenHandler.adminTokenPresent() === false) {
      awardPage = <Redirect to='/' />;
    } else if (TokenHandler.adminTokenPresent() === true) {
      awardPage = <Redirect to='/admin' />;
    } else if (TokenHandler.userTokenPresent() === true) {
      awardPage = <AwardPageContent />;
    }

    return (
      <div className="awardPageContentWrapper">
        {awardPage}
      </div>
    );

  }

}

export default AwardPage;
