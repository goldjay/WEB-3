import React from 'react';
import CancelButton from './CancelButton';
import TokenHandler from '../client-auth/TokenHandler';
import {Row, Col, Container} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

// import styled, { keyframes } from 'styled-components';
// import { bounce } from 'react-animations';
//
// const shakeAnimation = keyframes`${bounce}`;
//
// const ShakeyDiv = styled.div`
//   animation: 1s ${shakeAnimation};
// `;


function showFeedback(divId){
  const div = document.getElementById(divId).style;

  div.visibility = "visible";
  // div.style.opacity = 1;

  setTimeout(() => {
    // div.opacity = 0;
    div.visibility = 'hidden';

  }, 1500);
}

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

          this.clearFields();

          // TO DO: Add success animation
          showFeedback('success');

         }else{
           // Indicate the add failed
           showFeedback('fail');
         }
       }).catch((err) => {
        console.log("ERROR!!!!!");
        console.log(err);
       });

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
       }).catch((err) => {
         console.log("ERROR!!!!!");
         console.log(err);
       });
    }
  }

  handleUserTypeChange(event) {
    event.preventDefault();
    const id = event.target.id;
    const adminBtn = document.getElementById('admin').style;
    const genBtn = document.getElementById('generic').style;

    if(id === 'admin'){
      adminBtn.backgroundColor = '#12a4db';
      adminBtn.color = 'white';
      genBtn.backgroundColor = 'white';
      genBtn.color = '#12a4db';
    }else{
      genBtn.backgroundColor = '#12a4db';
      genBtn.color = 'white';
      adminBtn.backgroundColor = 'white';
      adminBtn.color = '#12a4db';
    }

    this.setState({
      userType: id
    });
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
        <button className="buttonStyle" onClick={this.clearFields}>
          {<FontAwesome
          name='times'
          size='2x'
        />}
        </button>
      );

      adminCheck = (
              <div>
                <button id="generic" className="toggleStyle2 adminLeft" onClick={this.handleUserTypeChange}>GENERIC</button>
                <button id="admin" className="toggleStyle" onClick={this.handleUserTypeChange}>ADMIN</button>
            </div>
      );
      // If editing, remove the tile at position
    }else{
      cancelButton = (
        <button className="buttonStyle" onClick={this.props.removeAdminTileAtPosition}>
          {<FontAwesome
          name='times'
          size='2x'
        />}
        </button>
      );
    }

    // If the user is generic
    if(this.state.userType === 'generic'){
      firstName = (
        <div>
          <input
            placeholder="first"
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
            placeholder="last"
            className="adminInput"
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInputChange} />
        </div>
      );
      signature = (
        <div>
          <label className="toggleStyle2"> 
          UPLOAD SIGNATURE FILE 
            <input
              name="signature"
              type="file"
              id="file"
              value={this.state.signature}
              onChange={this.handleInputChange} />
            </label>
              
        </div>  
      );
    }

    return (
      <Container >
        <div id="success">SUCCESS! {<FontAwesome
        name='check-circle-o'
      />}</div>
      <div id="fail">Your operation could not be completed. {<FontAwesome
      name='check-circle-o'
      />}</div>
        <form onSubmit={this.handleSubmit}>
          <Row className='formRow'>
            <Col className="rightAlign">
              <button className="adminLeft buttonStyle" onClick={this.handleSubmit}>
                {<FontAwesome
                name='check'
                size='2x'
              />}
              </button>
              {cancelButton}
            </Col>
          </Row>
        <Row className="formRow">
          <Col className={'adminLeft'}>{adminCheck}</Col>
        </Row>
        <Row className="formRow">
          <Col>{firstName}</Col>
          <Col>{lastName}</Col>
        </Row>
        <Row className="formRow">
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
        <Row className="formRow">
          <Col>{signature}</Col>
        </Row>
      </form>
      </Container>
    );
  }
}
