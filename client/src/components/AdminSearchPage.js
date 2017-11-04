import React from 'react'
import AdminDropDown from './AdminDropDown'
import AdminUserContainer from './AdminUserContainer'
import TokenHandler from '../client-auth/TokenHandler';
import { Redirect } from 'react-router-dom';
//import {Row, Col} from 'react-bootstrap'

export default class AdminSearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userType: '', query: ''} // Set up the initial state

    console.log("AT THE ADMIN SEARCH PAGE!!!");

    // State from the parent (AdminPage.js) is bound to the function so
    // when it is called, the parent's state will change
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleDropDownChange(dataFromChild) {
    console.log("HANDLING CHANGE FROM DROPDOWN!!!");
    console.log(dataFromChild);
    this.setState({
      userType: dataFromChild,
      query: ''
    });
  }

  // TO DO: Possibly move search to another component
  handleSearch(dataFromChild) {
    this.setState({
      query: dataFromChild,
      userType: ''
    })
  }

  render(props) {

    //Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
    //Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

    return (
      <div>
        {TokenHandler.adminTokenPresent() === true ? (
        <div>
        <AdminDropDown handleDropDownChange={this.handleDropDownChange} handleSearch={this.handleSearch} />
        <AdminUserContainer userType={this.state.userType}/>
      </div>
    ) :
    (
       <Redirect to='/' />
     )
  }
    </div>
    );
  }
}
