import React from 'react';
import '../styles/HomeContent.css';

class HomeContent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
          <div className="homeDiv">
            <h2 className="homeHeader">Cassiopeia Capstone Project</h2>
            <h3 className="homeHeader">WEB3: EMPLOYEE RECOGNITION</h3>
            <br></br>
            <p>Welcome to the Cassiopeia Group's Capstone Project! Our group is
               following the Web3: Employee Recognition project guidline to build a database
             backed webpage for issuing and tracking employee recognition awards. Please either
           signup or login using the links in the header to begin.</p>
          </div>
    );

  }

}

export default HomeContent;
