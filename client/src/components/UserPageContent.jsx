import React from 'react';
import '../styles/UserPageContent.css';

class UserPageContent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
          <div className="userDiv">
            <h2 className="userHeader">User Page</h2>
            <br></br>
            <p>User Page Content!</p>
          </div>
    );

  }

}

export default UserPageContent;
