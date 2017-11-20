//Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

import React, { Component }
from 'react';

import HeaderBar from './components/HeaderBar.jsx';
import FooterBar from './components/FooterBar.jsx';
import MainRouter from './components/MainRouter.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="globalWrapper">
        <HeaderBar />
        <MainRouter />
        <FooterBar />
      </div>
    );
  }
}

export default App;
