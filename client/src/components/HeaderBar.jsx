//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React from 'react';
import { Link } from 'react-router-dom';
import TokenHandler from '../client-auth/TokenHandler';
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
    let userName = null;

    if (TokenHandler.userTokenPresent() === true) {
      var name = JSON.parse(localStorage.getItem('headerName')).name;
      userName = <Link className="userLink" to="/user">{name}</Link>;
    } else if (TokenHandler.adminTokenPresent() === true) {
      var name = JSON.parse(localStorage.getItem('headerName')).name;
      userName = <div className="welcomeText">{name}</div>;
    }

    return (

    <div className="headerDiv">

        <div>
        {TokenHandler.userTokenPresent() === true || TokenHandler.adminTokenPresent() === true ? (
            <span>{userName}</span>
            ) :
            (
            <div>
            </div>
            )}

        </div>
        {TokenHandler.userTokenPresent() === false && TokenHandler.adminTokenPresent() === false ? (
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
