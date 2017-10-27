//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import '../styles/FooterBar.css';

class FooterBar extends React.Component {

  render() {
    return (

    <div className="footerDiv">
      <div>
      <span className="footerAuthor">Site Authors: </span>
      <a className="footerEmail" href="mailto:proulxp@oregonstate.edu">Phillip Proulx</a>
      <a className="footerEmail" href="mailto:reichmat@oregonstate.edu">Timothy Reichmann</a>
      <a className="footerEmail" href="mailto:steingoj@oregonstate.edu">Jay Steingold</a>

      </div>
    </div>

    );
  }

}

export default FooterBar;
