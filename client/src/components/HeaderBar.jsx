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
    let awardPage = null;
    var name;

    let addAdmin = null;
    let searchAdmin = null;
    let graphAdmin = null;

    if (TokenHandler.userTokenPresent() === true) {
      name = JSON.parse(localStorage.getItem('headerName')).fName + ' ' + JSON.parse(localStorage.getItem('headerName')).lName;
      userName = <Link className="userLink" to="/user">{name}</Link>;
      awardPage = <div><Link className="headerLink" to="/award">Award Page</Link></div>;
    } else if (TokenHandler.adminTokenPresent() === true) {
      name = JSON.parse(localStorage.getItem('headerName')).name;
      userName = <div className="welcomeText">{name}</div>;
      awardPage = <div></div>;

      // Navigation for sub-categories of admin
      addAdmin = <div><Link className="headerLink" to="/add">Add</Link></div>;
      searchAdmin = <div><Link className="headerLink" to="/search">Search</Link></div>;
      graphAdmin = <div><Link className="headerLink" to="/graph">Graph</Link></div>;
    }

    return (

    <div className="headerDiv">

        <div>
        {TokenHandler.userTokenPresent() === true || TokenHandler.adminTokenPresent() === true ? (
            <div><span>{awardPage}</span>
            <span>{userName}</span></div>
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
                 <span>{addAdmin}</span>
                 <span>{searchAdmin}</span>
                 <span>{graphAdmin}</span>
        </div>
        )
        }

    </div>

    );
  }

}

export default HeaderBar;
