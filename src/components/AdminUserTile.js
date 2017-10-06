import React from 'react';
import '../styles/AdminUserTile.css';
import FunctionButton from './FunctionButton';
import CancelButton from './CancelButton';
import AcceptButton from './CancelButton';



// NOTE: Renders differently depending on the type of user query (Admin or user)

// NOTE: Stores data in state, on edit button push, re-renders as a form
export default class AdminUserContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  // TO DO: Conditional rendering for 'edit' and 'new'
  render(props) {
    // Email, firstName, lastName, createDate, signature

    if(this.props.tileType === 'edit'){
      // TO DO: Add conditional for edit on an admin or edit on a generic user

      // TO DO: Add
      return (
        <div className="userTile">
          <form>
            Admin:<br/>
            <input type="checkbox"/><br/>
            Email:<br/>
            <input type="text" name="email" value={this.props.email}/><br/>
            First name:<br/>
            <input type="text" name="firstName" value={this.props.firstName}/><br/>
            Last name:<br/>
            <input type="text" name="lastName" value={this.props.lastName} /><br/>
            createDate:<br/>
            <input type="date" name="createDate" value={this.props.createDate} />
          </form>
          <AcceptButton position={this.props.position} text="ACCEPT" buttonClass="addButton" passedFunction={this.props.handleAcceptPress}/>
          <CancelButton position={this.props.position} text="CANCEL" buttonClass="cancelButton" passedFunction={this.props.handleCancelPress}/>
        </div>
      );
    } else{
      return (
        <div className="userTile">
          {this.props.email} <br/>
          {this.props.firstName} <br/>
          {this.props.lastName} <br/>
          {this.props.createDate} <br/>
          {this.props.signature} <br/>
        </div>
      );
    }
  }
}
