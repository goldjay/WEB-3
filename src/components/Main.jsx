import React from 'react';

import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';
import LoginPage from '../components/UserLoginPage.jsx';
import SignUpPage from '../components/signup.jsx';
import Home from '../components/Home.jsx';
import AdminPage from '../components/AdminPage.js';
import Auth from '../modules/Auth';

class Main extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    var title = 'Phils test title';
    var subtitle = 'This is a test subtitle.';
    return (
          <main>

            <Switch>
              <Route exact path='/' render={() => <Home cardtitleP={title}
                 cardsubtitleP={subtitle}/>}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
              <Route path='/admin' component={AdminPage}/>

            </Switch>

          </main>

    );

  }

}

export default Main;
