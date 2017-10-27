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
        adminChecked: false,
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
        adminChecked: false,
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
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  removeAtPosition(props) {
    this.props.removeAdminTileAtPosition(this.props.position);
  }

  handleSubmit(event) {
    // TO DO: Add validation for input
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log("SUBMITTING");
    event.preventDefault();

    var today = new Date();
    var createDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var userType = this.state.adminChecked === true ? 'admin' : 'generic';

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
           this.props.removeAdminTileAtPosition(this.props.position);

           // TO DO: Success animation and remove adminUserTile
            // to remove, get the position of the tile and set the state of AdminUserContainer
           // If successful, do success animation and remove
         }else{
           // Indicate the add failed
         }
       });
      // .then(res => this.setState({data: res}))

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
         console.log("$$$$$$$$$$$$$$$$$$$$$$$");
         console.log(res)
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
    // True == admin
    if(this.state.adminChecked){
      this.setState({
        adminChecked: false
      });
    }
    // false == generic
    else {
      this.setState({
        adminChecked: true
      });
    }
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
        <CancelButton text='Cancel' position={this.props.position} passedFunction={this.props.removeAdminTileAtPosition}/>
      );

      adminCheck = (
        <Row>
            <Col>
            <label className="adminCheckBox">
              <div className="adminlabel">Admin:</div>
              <input
                className="adminRadio"
                name="adminChecked"
                type="checkbox"
                checked={this.state.adminChecked}
                onChange={this.handleUserTypeChange} />
            </label>
          </Col>
        </Row>
      );
    }else{
      cancelButton = (
        <button onClick={this.props.cancelEdit}>Cancel</button>
      );
    }

    // If the user is generic
    if(this.state.adminChecked === false){
      firstName = (
        <label>
          first:
          <input
            className="adminInput"
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInputChange} />
        </label>
      );
      lastName = (
        <label>
          last:
          <input
            className="adminInput"
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInputChange} />
        </label>
      );
      signature = (
        <label>
          signature
          <input
            className="adminInput"
            name="signature"
            type="file"
            value={this.state.signature}
            onChange={this.handleInputChange} />
        </label>
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
            <label>
                 Email:
                 <input
                   className="adminInput"
                   name="email"
                   type="email"
                   value={this.state.email}
                   onChange={this.handleInputChange} />
            </label>
          </Col>
          <Col>
            <label>
                 password
                 <input
                   className="adminInput"
                   name="password"
                   type="text"
                   value={this.state.password}
                   onChange={this.handleInputChange} />
            </label>
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
