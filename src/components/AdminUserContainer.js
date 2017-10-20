import React from 'react';
import AdminUserTile from './AdminUserTile';
import '../styles/AdminPage.css';

export default class AdminUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userType: '', query: '', data: []}
    this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
    this.removeAdminTileAtPosition = this.removeAdminTileAtPosition.bind(this);
    this.editAdminTileAtPosition = this.editAdminTileAtPosition.bind(this);
  }

  // Place initial component functionality here
  // if you want it to search or anything on load
  componentDidMount(props) {
  }

  // TO DO: Add option to choose from admin or user (Or add a checkbox to the form)
  handleAddButtonPress(){
    var newData = this.state.data;

    // Add to the beginning of the array
    newData.unshift({tileType: 'new', email: "", password: "", firstName: "", lastName: "", createDate: "", signature: ""});
    this.setState({
      data: newData
    });
  }

  // Remove the parent of the button from the AdminUserContainer
  // By removing it from the state
  // Need to get the index or some identified for the parent
  removeAdminTileAtPosition(dataFromChild){

    var newData = this.state.data;
    // Remove from newData the object at position in dataFromChild
    // SPLICE WITHOUT '' NOT WORKING
    // TO DO: FIX WITHOUT ADDING AN EMPTY STRING
    newData.splice( dataFromChild, 1, '' );

    this.setState({
      data: newData
    });
  }

  editAdminTileAtPosition(dataFromChild){
    // dataFromChild is the new, edited object
    // Check if the data has changed
    console.log("$$$$$$$$$$$$$$$$$$$$$");
    console.log(dataFromChild);

    var pos = dataFromChild.position;
    delete dataFromChild.pos;

    var oldData = this.state.data[pos];
    console.log("OLD DATA");
    console.log(oldData);

    Object.keys(dataFromChild).map((item, idx) => {
      console.log("ITEM " + item);

      // Check if it has the property
      if(oldData.hasOwnProperty(item)){
        oldData[item] = dataFromChild[item];
      }
    });

    console.log("AFTER");
    console.log(oldData);

    var newData = this.state.data;
    newData[pos] = oldData;
    this.setState({
      data: newData
    });

  }


  componentWillReceiveProps(nextProps){

      // TO DO: Add query here
      this.setState({userType: nextProps.userType})

      // TO DO: Expand funcitonality to work with query
      if(nextProps.userType !== ''){
        fetch('/users', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({userType: nextProps.userType, query: nextProps.query})
        }).then(res=>res.json())
        .then(res => this.setState({data: res}))
      }
  }

  render(props) {
    // email, firstName, lastName, createDate, signature
    const tiles = this.state.data.map((item, idx) => {

      // ADDED because splice wasn't working so now the data has empty spaces
      if(item === ''){
        return null;
      }

      // CHECK ITEMS FOR NULL OR UNDEFINED VALUES
      var tileType = item.tileType === (null || undefined )? '' : item.tileType;
      var userType = item.type === (null || undefined )? '' : item.type;
      var email = item.email === (null || undefined )? '' : item.email;
      var firstName = item.firstName === (null || undefined )? '' : item.firstName;
      var lastName = item.lastName === (null || undefined )? '' : item.lastName;
      var password = item.password === (null || undefined )? '' : item.password;
      var createDate = item.createDate === (null || undefined )? '' : item.createDate;
      var signature = item.signature === (null || undefined )? '' : item.signature;

      // No names or signatures
      if(item.type === 'admin'){
        return(
          <AdminUserTile
            userType={userType}
            tileType={tileType}
            key={idx}
            position={idx}
            email={email}
            password={password}
            firstName={firstName}
            lastName={lastName}
            createDate={createDate}
            signature={signature}
            handleCancelPress={this.handleCancelPress}
            editAdminTileAtPosition={this.editAdminTileAtPosition}
          />
        );
      }else{ // generic type
        return(
          <AdminUserTile
            userType={userType}
            tileType={tileType}
            key={idx}
            position={idx}
            email={email}
            password={password}
            firstName={firstName}
            lastName={lastName}
            createDate={createDate}
            signature={signature}
            removeAdminTileAtPosition={this.removeAdminTileAtPosition}
            editAdminTileAtPosition={this.editAdminTileAtPosition}
          />
        );
      }
    });

    return (
      <div className="adminPageContainer">
        {tiles}
        <button className="addButton" onClick={this.handleAddButtonPress} >+</button>
      </div>
    );
  }
}
