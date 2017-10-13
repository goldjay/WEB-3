import React from 'react';
import CancelButton from './CancelButton';

export default class AdminUserForm extends React.Component {
  constructor(props) {
    super(props);

    console.log("TYPE IN THE FORM!");
    console.log(this.props.tileType);

    if(this.props.tileType === 'edit'){
      var td = this.props.tileData;
      this.state = {
        adminChecked: false,
        email: td.email,
        firstName: td.firstName,
        lastName: td.lastName,
        signature: td.signature,
        password: td.password
      };
      console.log("FORM STATE: ");
      console.log(this.state);
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

    var today = new Date();
    var createDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var userType = this.state.adminChecked === true ? 'admin' : 'generic';

    if(this.props.tileType == 'new'){
      fetch('/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({type: userType, email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, createDate: createDate})
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

    } else if(this.props.tileType === 'edit'){
      // Submit to a different route that uses update
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

  // TO DO: Add conditional rendering based on the user type that you want
  // I.E. if admin is checked, remove the signature upload, firstName and lastName

  // ALSO: Add file upload input for signature
  render() {

    var firstName = '';
    var lastName = '';
    var signature = '';
    var adminCheck = '';

    // Rendering logic based on the tiletype
    if(this.props.tiletype !== 'edit'){
      adminCheck = (
        <label>
          Admin:
          <input
            name="adminChecked"
            type="checkbox"
            checked={this.state.adminChecked}
            onChange={this.handleUserTypeChange} />
        </label>
      );
    }

    // If the user is generic
    if(this.state.adminChecked === false){
      firstName = (
        <label>
          firstName:
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleInputChange} />
        </label>
      );
      lastName = (
        <label>
          lastName:
          <input
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
            name="signature"
            type="file"
            value={this.state.signature}
            onChange={this.handleInputChange} />
        </label>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {adminCheck}
        <br />
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange} />
        </label>
        {firstName}
        {lastName}
        <label>
          password
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleInputChange} />
        </label>
        {signature}
        <input type="submit" value="Submit" />
        <CancelButton text='Cancel' position={this.props.position} passedFunction={this.props.removeAdminTileAtPosition}/>
      </form>
    );
  }
}
