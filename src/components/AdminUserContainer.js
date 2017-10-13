import React from 'react';
import AdminUserTile from './AdminUserTile';


export default class AdminUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userType: '', query: '', data: []}
    this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
    this.removeAdminTileAtPosition = this.removeAdminTileAtPosition.bind(this);
  }

  // Place initial component functionality here
  // if you want it to search or anything on load
  componentDidMount(props) {
  }

  // TO DO: Add option to choose from admin or user (Or add a checkbox to the form)
  handleAddButtonPress(){
    console.log("HANDLING ADD BUTTON PRESS!!!");
    var newData = this.state.data;

    console.log(newData);

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
    console.log("HANDLING removeAdminTileAtPosition!");
    console.log("POSITION: " + dataFromChild);

    var newData = this.state.data;
    // Remove from newData the object at position in dataFromChild
    // SPLICE WITHOUT '' NOT WORKING
    // TO DO: FIX WITHOUT ADDING AN EMPTY STRING
    newData.splice( dataFromChild, 1, '' );

    this.setState({
      data: newData
    });
  }


  componentWillReceiveProps(nextProps){
       console.log("RECEIVING PROPS IN AdminUserContainer!");
       //console.log("QUERY RECEIVED: " + nextProps.query);
       console.log("userType RECEIVED: " + nextProps.userType);

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
    console.log("HERE IS THE DATA IN AdminUserContainer: ");
    console.log(this.state.data);
    // email, firstName, lastName, createDate, signature
    const tiles = this.state.data.map((item, idx) => {

      console.log(item);

      // ADDED because splice wasn't working so now the data has empty spaces
      if(item === ''){
        return null;
      }

      // CHECK ITEMS FOR NULL OR UNDEFINED VALUES
      var signature = item.signature == null ? '' : signature;

        // console.log(item);
          // No names or signatures
          if(item.type === 'admin'){

            return(
              <AdminUserTile
                tileType={''}
                userType={item.type}
                key={idx}
                position={idx}
                email={item.email}
                password={item.password}
                createDate={item.createDate}
                signature={signature}
                handleAcceptPress={this.handleAcceptPress}
                handleCancelPress={this.handleCancelPress}
              />
            );
          }else{ // generic type
            return(
              <AdminUserTile
                userType={item.type}
                tileType={item.tileType}
                key={idx}
                position={idx}
                email={item.email}
                firstName={item.firstName}
                lastName={item.lastName}
                createDate={item.createDate}
                signature={signature}
                removeAdminTileAtPosition={this.removeAdminTileAtPosition}
              />
            );
          }
    });

    return (
      <div>EMPTY DIV: USER INFO HERE
        {tiles}
        <button className="addButton" onClick={this.handleAddButtonPress} >+</button>
      </div>
    );
  }
}
