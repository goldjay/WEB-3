import React, { Component }
from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import AdminPage from './components/AdminPage';
import Signup from './components/signup';
import AdminLoginPage from './components/AdminLoginPage';
import LostPasswordPage from './components/LostPasswordPage';
import UserLoginPage from './components/UserLoginPage';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

class App extends Component {
  render() {
    return (

      <div>
        <Header />
        <Main />
      </div>

      /*
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={UserLoginPage}/>
            <Route path="/admin" component={AdminPage}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/userLogin" component={UserLoginPage}/>
            <Route path="/adminLogin" component={AdminLoginPage}/>
            <Route path="/lostPassword" component={LostPasswordPage}/>
          </div>
        </Router>
      </div>
      */
    );
  }
}

export default App;
