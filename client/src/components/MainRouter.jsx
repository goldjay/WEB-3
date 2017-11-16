import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../components/UserLoginPage.jsx';
import SignUpPage from '../components/signup.jsx';
import HomePage from '../components/HomePage.jsx';
import AdminPage from '../components/AdminPage.js';
import AdminLoginPage from '../components/AdminLoginPage.js';
import AwardPage from '../components/AwardPage.jsx';
import UserPage from '../components/UserPage.jsx';
import AdminSearchPage from '../components/AdminSearchPage';
import AdminAddPage from '../components/AdminAddPage';
import AdminGraphPage from '../components/AdminGraphPage';
import Forgot from '../components/LostPasswordPage';
import Reset from '../components/ResetPage';

export default class MainRouter extends React.Component {

  render() {
    return (
          <main>

            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/adminLogin' component={AdminLoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
              <Route path='/admin' component={AdminSearchPage}/>
              <Route path='/add' component={AdminAddPage} />
              <Route path='/graph' component={AdminGraphPage} />
              <Route path='/search' component={AdminSearchPage} />
              <Route path='/award' component={AwardPage}/>
              <Route path='/user' component={UserPage}/>
              <Route path='/forgot' component={Forgot}/>
              <Route path='/reset' component={Reset}/>

            </Switch>

          </main>
    );
  }
}
