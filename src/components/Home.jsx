import React from 'react';

import PropTypes from 'prop-types';

import { Card, CardTitle } from 'material-ui/Card';
import Auth from '../modules/Auth';
import DashboardPage from '../components/Dashboard.jsx';

class Home extends React.Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      currentLanguage: 'Eng',
      cardtitle: 'Website Title',
      cardsubtitle: 'This is the home page. Log in to see the hidden content',

    };

    //this.cardtitleP = "";

  }

  componentWillMount() {
    console.log('Component WILL MOUNT!');
  }

  componentDidMount() {
    console.log('Component DID MOUNT!');
  }

  componentWillReceiveProps(newProps) {
    console.log('Component WILL RECIEVE PROPS!');
  }

  shouldComponentUpdate(newProps, newState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Component WILL UPDATE!');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component DID UPDATE!');
  }

  componentWillUnmount() {
    console.log('Component WILL UNMOUNT!');
  }

  render() {

    return (
      <div>

        {Auth.isUserAuthenticated() == false ? (

          <div>
            <span>{this.props.cardtitleP}</span>
            <span>{this.props.cardsubtitleP}</span>
          </div>
        ) :
      (
        <DashboardPage/>
      )}
      </div>

    );

  }

}

Home.propTypes = {
  cardtitleP: PropTypes.string.isRequired,
  cardsubtitleP: PropTypes.string.isRequired,
};

export default Home;
