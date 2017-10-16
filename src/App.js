import React, { Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import AdminPage from './components/AdminPage';
import Signup from './components/signup';
import AdminLoginPage from './components/AdminLoginPage';
import LostPasswordPage from './components/LostPasswordPage';
import UserLoginPage from './components/UserLoginPage';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    {/* <Route path={`${match.url}/:topicId`} component={Topic}/> */}
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

class App extends Component {
  state = {users: []}

  render() {
    return (
      <div className="App">
        {/* <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )} */}
        <Router>
          <div>
            <Route exact path="/" component={UserLoginPage}/>
            <Route path="/about" component={About}/>
            <Route path="/admin" component={AdminPage}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/userLogin" component={UserLoginPage}/>
            <Route path="/adminLogin" component={AdminLoginPage}/>
            <Route path="/lostPassword" component={LostPasswordPage}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
