import React from 'react';

import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';
import LoginPage from '../components/UserLoginPage.jsx';
import SignUpPage from '../components/signup.jsx';
import HomePage from '../components/HomePage.jsx';
import AdminPage from '../components/AdminPage.js';
import AdminLoginPage from '../components/AdminLoginPage.js';

class MainRouter extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    var title = 'Phils test title';
    var subtitle = 'This is a test subtitle.';
    return (
          <main>

            <Switch>
              <Route exact path='/' render={() => <HomePage cardtitleP={title}
                 cardsubtitleP={subtitle}/>}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/adminLogin' component={AdminLoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
              <Route path='/admin' component={AdminPage}/>

            </Switch>

          </main>

    );

  }

}

export default MainRouter;
