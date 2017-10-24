//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Link } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
import { Redirect } from 'react-router-dom';
import '../styles/HeaderBar.css';

class HeaderBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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

    <div className="headerDiv">

        <div>
        {TokenHandler.userTokenPresent() == true || TokenHandler.adminTokenPresent() == true ? (
            <div className="welcomeText">
              {JSON.parse(localStorage.getItem('headerName')).name}
            </div>
            ) :
            (
            <div>
            </div>
            )}

        </div>
        {TokenHandler.userTokenPresent() == false && TokenHandler.adminTokenPresent() == false ? (
        <div>
                <div><Link className="headerLink" to="/">Cassiopeia Homepage</Link></div>
                <div><Link className="headerLink" to="/login">Login</Link></div>
                <div><Link className="headerLink" to="/signup">Signup</Link></div>
        </div>
        ) :
        (
        <div>
                 <Link className="headerLink" to="/login" onClick={this.logUserOut}>Log out</Link>
        </div>
        )
        }

    </div>

    );
  }

}

export default HeaderBar;
