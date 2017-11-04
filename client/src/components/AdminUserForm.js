import React from 'react';
import CancelButton from './CancelButton';
import TokenHandler from '../client-auth/TokenHandler';
import {Row, Col, Container} from 'reactstrap';

export default class AdminUserForm extends React.Component {
  constructor(props) {
    super(props);

    if(this.props.tileType === 'edit'){
      var td = this.props.tileData;
      this.state = {
        userType: 'generic',
        email: td.email,
        firstName: td.firstName,
        lastName: td.lastName,
        signature: td.signature,
        password: td.password,
        tileType: 'edit',
        userName: td.email
      };

    }else{
      this.state = {
        userType: 'generic',
        email: '',
        firstName: '',
        lastName: '',
        signature: '',
        password: ''
      };
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
    // Resets all of the input fi
    clearFields(){
      // document.getElementById("userTypeDropDown").value = "generic";
      this.setState({
        email: '',
        firstName: '',
        lastName: '',
        signature: '',
        password: ''
      });
    }

  removeAtPosition(props) {
    this.props.removeAdminTileAtPosition(this.props.position);
  }

  handleSubmit(event) {
    // TO DO: Add validation for input
    event.preventDefault();

    var today = new Date();
    var createDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var userType = this.state.userType;

    if(this.props.tileType === 'new'){

      var authHeader = 'bearer ' + TokenHandler.returnAdminToken();

      fetch('/auth/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: userType, email: this.state.email, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, createDate: createDate})
      })
       .then((res) => {
         if(res.ok){
           // Clear all the fields
           console.log("$$$$$$$$$$$$$$$$$$$");
           console.log(res);
          this.clearFields();

          // TO DO: Add success animation


         }else{
           // Indicate the add failed
         }
       })

    } else if(this.props.tileType === 'edit'){
      var authHeader = 'bearer ' + TokenHandler.returnAdminToken();
      // Submit to a different route that uses update
      fetch('/auth/edit', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: this.state.userName, email: this.state.email, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, signature: this.state.signature})
      })
       .then((res) => {

         if(res.ok){
          // Remove the edit tile
          this.props.cancelEdit();

          // Add position so it knows which record to change
          var payload = this.state;
          payload['position'] = this.props.position;
          // TO DO: SHOW THE TILE WITH UPDATED INFORMATION
           this.props.editAdminTileAtPosition(this.state);
         }else{
           // Indicate the add failed
           console.log("EDIT FETCH DID NOT WORK");
         }
       });
    }
  }

  handleUserTypeChange() {
    var e = document.getElementById("userTypeDropDown");
    var value = e.options[e.selectedIndex].value;
    this.setState({
      userType: value
    });
    //
    // // True == admin
    // if(this.state.adminChecked){
    //   this.setState({
    //     adminChecked: false
    //   });
    // }
    // // false == generic
    // else {
    //   this.setState({
    //     adminChecked: true
    //   });
    // }
  }

  // ALSO: Add file upload input for signature
  render() {

    // Components initial values for conditional render
    var firstName = '';
    var lastName = '';
    var signature = '';
    var adminCheck = '';
    var cancelButton;

    // Rendering logic based on the tiletype
    if(this.props.tileType !== 'edit'){
      cancelButton = (
        <button onClick={this.clearFields}>Clear</button>
      );

      adminCheck = (
              <div>
                <select
                  id={'userTypeDropDown'}
                  onChange={this.handleUserTypeChange}>
                   <option value="generic" selected="selected">generic</option>
                   <option value="admin">admin</option>
                </select>
            </div>

      );
      // If editing, remove the tile at position
    }else{
      cancelButton = (
        <button onClick={this.props.removeAdminTileAtPosition}>Cancel</button>
      );
    }

    // If the user is generic
    if(this.state.userType === 'generic'){
      firstName = (
        <div>
          <input
            placeholder="First name"
            className="adminInput"
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInputChange} />
        </div>
      );
      lastName = (
        <div>
          <input
            placeholder="Last name"
            className="adminInput"
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInputChange} />
        </div>
      );
      signature = (
        <div>
          <label> signature </label>
            <input
              className="adminInput"
              name="signature"
              type="file"
              value={this.state.signature}
              onChange={this.handleInputChange} />
        </div>
      );
    }

    return (
      <Container >
        <form onSubmit={this.handleSubmit}>
        <Row>
          <Col className={'adminLeft'}>{adminCheck}</Col>
        </Row>
        <Row>
          <Col>{firstName}</Col>
          <Col>{lastName}</Col>
        </Row>
        <Row>
          <Col>
            <input
              placeholder="email"
              className="adminInput"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col>
            <input
               placeholder="password"
               className="adminInput"
               name="password"
               type="text"
               value={this.state.password}
               onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>{signature}</Col>
        </Row>
        <Row className='adminButtonRow'>
          <Col>
            <input className="adminSubmit" type="submit" value="Submit" />
            {cancelButton}
          </Col>
        </Row>
      </form>
      </Container>
    );
  }
}
