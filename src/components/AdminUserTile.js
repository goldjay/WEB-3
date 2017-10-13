import React from 'react';
import '../styles/AdminUserTile.css';
import CancelButton from './CancelButton';
import AdminUserForm from './AdminUserForm';



// NOTE: Renders differently depending on the type of user query (Admin or user)

// NOTE: Stores data in state, on edit button push, re-renders as a form
export default class AdminUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditButtonPress = this.handleEditButtonPress.bind(this);
    this.state = {tileType: this.props.tileType};
  }

  handleEditButtonPress(){
    // Set the state of the user tile to 'edit'
    console.log("HANDLE EDIT CLICK!");
    this.setState({
      tileType: 'edit'
    });
  }

  // TO DO: Conditional rendering for 'edit' and 'new'
  render(props) {
    // Email, firstName, lastName, createDate, signature
    console.log("THE TYPE IS: " + this.state.tileType);

    if(this.props.tileType === 'new' || this.state.tileType === 'edit'){
      return (
        <div className="userTile">
          <AdminUserForm tileData={this.props} tileType ={this.state.tileType} position={this.props.position} removeAdminTileAtPosition={this.props.removeAdminTileAtPosition} />
        </div>
      );
    }
    else{
      return (
        <div className="userTile">
          Type: {this.props.userType} <br/>
          Email: {this.props.email} <br/>
          firstName: {this.props.firstName} <br/>
          lastName:{this.props.lastName} <br/>
          creationDate: {this.props.createDate} <br/>
          signature: {this.props.signature} <br/>
          password: {this.props.password} <br/>
          <button className="editButton" onClick={this.handleEditButtonPress} >EDIT</button>
        </div>
      );
    }
  }
}
