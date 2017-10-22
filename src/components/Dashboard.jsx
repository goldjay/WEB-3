// import React, { PropTypes } from 'react';

import React from 'react';

import PropTypes from 'prop-types';

const Dashboard = ({ secretData }) => (
  <div>
    <span>{ secretData }</span>
    <span>You will only see this text if you are logged in!</span>
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
};

export default Dashboard;
