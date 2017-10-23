//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Link } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import { Redirect } from 'react-router-dom';

class HeaderBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userWelcomeText: 'Hello ',
      redirect: false,
    };

    this.logUserOut = this.logUserOut.bind(this);

  }

  logUserOut()
  {
    TokenHandler.removeToken();
  }

  render() {
    return (

    <div>
        <div>
                <Link to="/">Cassiopeia Homepage</Link>
        </div>
        <div>
        {TokenHandler.userTokenPresent() == true || TokenHandler.adminTokenPresent() == true ? (
            <div>
                  {this.state.userWelcomeText} {JSON.parse(localStorage.getItem('headerName')).name}!
            </div>
            ) :
            (
            <div>
            </div>
            )}

        </div>
        {TokenHandler.userTokenPresent() == false && TokenHandler.adminTokenPresent() == false ? (
        <div>
                <div><Link to="/login">Login</Link></div>
                <div><Link to="/signup">Signup</Link></div>
        </div>
        ) :
        (
        <div>
                 <Link to="/login" onClick={this.logUserOut}>Log out</Link>
        </div>
        )
        }

    </div>

    );
  }

}

export default HeaderBar;
