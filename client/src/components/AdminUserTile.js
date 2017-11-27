import React from 'react';
import AdminUserForm from './AdminUserForm';
import {Row, Col, Container} from 'reactstrap';
import TokenHandler from '../client-auth/TokenHandler';
import FontAwesome from 'react-fontawesome';

// NOTE: Renders differently depending on the type of user query (Admin or user)

function showFeedback(divId){
  const div = document.getElementById(divId).style;

  div.visibility = "visible";
  // div.style.opacity = 1;

  setTimeout(() => {
    // div.opacity = 0;
    div.visibility = 'hidden';

  }, 1500);
}

// NOTE: Stores data in state, on edit button push, re-renders as a form
export default class AdminUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditButtonPress = this.handleEditButtonPress.bind(this);
    this.state = {tileType: this.props.tileType};
    this.handleDeleteButtonPress = this.handleDeleteButtonPress.bind(this);
  }

  handleEditButtonPress(){
    // Set the state of the user tile to 'edit'
    if(this.state.tileType === 'edit'){
      this.setState({
        tileType: ''
      });
    }
    else{
      this.setState({
        tileType: 'edit'
      });
    }
  }

  handleDeleteButtonPress(){
    var authHeader = 'bearer ' + TokenHandler.returnAdminToken();
    // TO DO: Add confirmation alert/message
    // Send the fetch to delete
    fetch('/auth/delete', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.props.email, password: this.props.password})
    })
     .then((res) => {
       if(res.ok){
         this.props.removeAdminTileAtPosition(this.props.position);
         showFeedback('success');

       }else{
         showFeedback('fail');
       }
    });
}

  // TO DO: Conditional rendering for 'edit' and 'new'
  render(props) {
    // Email, firstName, lastName, createDate, signature

    // Initial state of the tile passed to form so it can be used for edit
    const originalState = {email: this.props.email, password: this.props.password, firstName: this.props.firstName, lastName: this.props.lastName, signature: this.props.signature};

    // Clean original State for undefined values
    Object.keys(originalState).forEach(key => {
	     if (originalState[key] === undefined){
		       originalState[key] = '';
	        }
    });

    if(this.props.tileType === 'new' || this.state.tileType === 'edit'){
      return (
        <div className="userTile">
          <AdminUserForm
            tileData={this.props}
            tileType ={this.state.tileType}
            position={this.props.position}
            removeAdminTileAtPosition={this.props.removeAdminTileAtPosition}
            editAdminTileAtPosition={this.props.editAdminTileAtPosition}
            cancelEdit={this.handleEditButtonPress}
            originalState={originalState}/>
        </div>
      );
    }
    // USED IN SEARCH
    else{
      return (
        <Container className="userTile">
          <div id="success">DELETED!</div>
          <div id="fail">FAILED!</div>
          <Row>
            <Col className="rightAlign">
              <button className="adminLeft buttonStyle" onClick={this.handleEditButtonPress} >
                {<FontAwesome
                  className='fa-icon'
                  name='pencil'
                  size='2x'
                />}
              </button>
              <button className="buttonStyle" onClick={this.handleDeleteButtonPress} >
                {<FontAwesome
                  className='fa-icon'
                  name='trash'
                  size='2x'
                />}
              </button>
            </Col>
          </Row>
          <Row className="formRow">
            <Col><div className="subtle">type: {this.props.userType}</div></Col>
            <Col><div className="subtle">created: {this.props.createDate}</div></Col>
          </Row>
          <Row className="formRow">
            <Col><div className={'adminField'}>first: {this.props.firstName}</div></Col>
            <Col><div className={'adminField'}>last: {this.props.lastName}</div></Col>
          </Row>
          <Row className="formRow">
            <Col><div className={'adminField'}>email: {this.props.email}</div></Col>
            <Col><div className={'adminField'}>password: {this.props.password}</div></Col>
          </Row>
          <Row>
            <Col><div>signature: </div></Col>
          </Row>
        </Container>
      );
    }
  }
}
