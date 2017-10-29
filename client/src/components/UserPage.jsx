import React from 'react';
import PropTypes from 'prop-types';
import TokenHandler from '../client-auth/TokenHandler';
import AwardPage from '../components/AwardPage.jsx';
import UserPageContent from '../components/UserPageContent.jsx';
import { Redirect } from 'react-router-dom';

class UserPage extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    let userPage = null;

    if (TokenHandler.userTokenPresent() == false && TokenHandler.adminTokenPresent() == false) {
      userPage = <Redirect to='/' />;
    } else if (TokenHandler.adminTokenPresent() == true) {
      userPage = <Redirect to='/admin' />;
    } else if (TokenHandler.userTokenPresent() == true) {
      userPage = <UserPageContent />;
    }

    return (
      <span>{userPage}</span>
    );

  }

}

export default UserPage;
