import React from 'react'
import AdminDropDown from './AdminDropDown'
import AdminUserContainer from './AdminUserContainer'
//import {Row, Col} from 'react-bootstrap'

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userType: '', query: ''} // Set up the initial state

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
    console.log("HANDLING SEARCH FROM DROPDOWN!!");
    console.log(dataFromChild);
    this.setState({
      query: dataFromChild,
      userType: ''
    })
  }

  render(props) {

    return (
      <div>
        <AdminDropDown handleDropDownChange={this.handleDropDownChange} handleSearch={this.handleSearch} />
        <AdminUserContainer userType={this.state.userType}/>
      </div>
    );
  }
}
