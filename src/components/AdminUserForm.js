import React from 'react';
import CancelButton from './CancelButton';

export default class AdminUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 'false',
      email: '',
      firstName: '',
      lastName: '',
      signature: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log("NAME: " + name);
    console.log("VALUE: " + value);

    this.setState({
      [name]: value
    });
  }

  removeAtPosition(props) {
    this.props.removeAdminTileAtPosition(this.props.position);
  }

  handleSubmit(event) {
    // TO DO: Add validation for input
    event.preventDefault();

    console.log('SUBMIT STATE: ');
    console.log(this.state);

    //var userType = this.state.userType == true ? 'admin' : 'generic';

    var today = new Date();
    var createDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    fetch('/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, createDate: createDate})
    })
     .then((res) => {
       console.log("RESPONSE: " + res.ok);
       if(res.ok){
         console.log("SUCCESS!!!!");
         console.log("REMOVING AT POSITION: " + this.props.position);
         this.props.removeAdminTileAtPosition(this.props.position);
         // BUG: Remove at position removes the wrong data if there are 3 new tiles and you click the first tile submit


         // TO DO: Success animation and remove adminUserTile
          // to remove, get the position of the tile and set the state of AdminUserContainer
         // If successful, do success animation and remove
       }else{
         // Indicate the add failed
       }
     });
    // .then(res => this.setState({data: res}))
  }

  // TO DO: Add conditional rendering based on the user type that you want
  // I.E. if admin is checked, remove the signature upload, firstName and lastName

  // ALSO: Add file upload input for signature
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Admin:
          <input
            name="userType"
            type="checkbox"
            checked={this.state.userType}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange} />
        </label>
        <label>
          firstName:
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInputChange} />
        </label>
        <label>
          lastName:
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleInputChange} />
        </label>
        <label>
          password
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleInputChange} />
        </label>
        <label>
          {/* signature
          <input
            name="signature"
            type="file"
            value={this.state.signature}
            onChange={this.handleInputChange} /> */}
        </label>
        <input type="submit" value="Submit" />
        <CancelButton text='Cancel' position={this.props.position} passedFunction={this.props.removeAdminTileAtPosition}/>
      </form>
    );
  }
}
