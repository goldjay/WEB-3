// import React, { PropTypes } from 'react';

import React from 'react';

import PropTypes from 'prop-types';

const Dashboard = ({ secretData }) => (
  <div>
    <span>{ secretData }</span>
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
};

export default Dashboard;
