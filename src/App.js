import React, { Component }
from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import HeaderBar from './components/HeaderBar.jsx';
import MainRouter from './components/MainRouter.jsx';

class App extends Component {
  render() {
    return (

      <div>
        <HeaderBar />
        <MainRouter />
      </div>

    );
  }
}

export default App;
