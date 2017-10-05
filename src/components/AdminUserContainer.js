import React from 'react';
import AdminUserTile from './AdminUserTile';
import FunctionButton from './FunctionButton'

export default class AdminUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userType: '', query: '', data: []}
    this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
    this.handleAcceptPress = this.handleAcceptPress.bind(this);
    this.handleCancelPress = this.handleCancelPress.bind(this);
  }

  // Place initial component functionality here
  // if you want it to search or anything on load
  componentDidMount(props) {
  }

  // TO DO: Add option to choose from admin or user (Or add a checkbox to the form)
  handleAddButtonPress(dataFromChild){
    console.log("HANDLING ADD BUTTON PRESS!!!");
    console.log(dataFromChild);
    var newData = this.state.data;

    // Add to the beginning of the array
    newData.unshift({tileType: 'edit', mail: "", password: "", firstName: "", lastName: "", createDate: "", signature: ""});
    this.setState({
      data: newData
    });
  }

  // Make a POST fetch to the backend using the data from the form
  handleAcceptPress(dataFromChild){
    console.log("HANDLING ACCEPT PRESS!");
    console.log(dataFromChild);
  }

  // Remove the parent of the button from the AdminUserContainer
  // By removing it from the state
  // Need to get the index or some identified for the parent
  handleCancelPress(dataFromChild){
    console.log("HANDLING CANCEL PRESS!");
    console.log("POSITION: " + dataFromChild);

    var newData = this.state.data;
    // Remove form newData the object at position in dataFromChild
    newData.splice( dataFromChild, 1 );

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
          // No names or signatures
          if(item.type === 'admin'){
            return(
              <AdminUserTile
                tileType={item.tileType}
                key={idx}
                position={idx}
                email={item.email}
                createDate={item.createDate}
                signature={item.signature}
                handleAcceptPress={this.handleAcceptPress}
                handleCancelPress={this.handleCancelPress}
              />
            );
          }else{ // generic type
            return(
              <AdminUserTile
                tileType={item.tileType}
                key={idx}
                position={idx}
                email={item.email}
                firstName={item.firstName}
                lastName={item.lastName}
                createDate={item.createDate}
                signature={item.signature}
                handleAcceptPress={this.handleAcceptPress}
                handleCancelPress={this.handleCancelPress}
              />
            );
          }
    });

    return (
      <div>EMPTY DIV: USER INFO HERE
        {tiles}
        <FunctionButton text="+" buttonClass="addButton" function={this.handleAddButtonPress} />
      </div>
    );
  }
}
