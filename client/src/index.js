import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css'; // bootstrap css
import '../node_modules/font-awesome/css/font-awesome.min.css';  // font awesome icon css

ReactDOM.render(<BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'));

//ReactDOM.render(<Router routes={routes} />,
//document.getElementById('root'));
registerServiceWorker();
