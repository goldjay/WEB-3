import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../components/UserLoginPage.jsx';
import SignUpPage from '../components/signup.jsx';
import HomePage from '../components/HomePage.jsx';
import AdminPage from '../components/AdminPage.js';
import AdminLoginPage from '../components/AdminLoginPage.js';
import AwardPage from '../components/AwardPage.jsx';

class MainRouter extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
          <main>

            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/adminLogin' component={AdminLoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
              <Route path='/admin' component={AdminPage}/>
              <Route path='/award' component={AwardPage}/>

            </Switch>

          </main>

    );

  }

}

export default MainRouter;
