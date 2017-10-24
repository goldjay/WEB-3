//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Link } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import { Redirect } from 'react-router-dom';
import '../styles/FooterBar.css';

class FooterBar extends React.Component {

  constructor(props) {
    super(props);

  }

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
