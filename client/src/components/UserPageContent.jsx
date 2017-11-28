import React from 'react';
import '../styles/UserPageContent.css';
import TokenHandler from '../client-auth/TokenHandler';
import { refresh } from 'react-router-dom';

class UserPageContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: 0,
      value2: '',
      value3: '',
    };
    this.refreshAwards = this.refreshAwards.bind(this);
    this.rowDelete = this.rowDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.refreshAwards();
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  handleEdit(event) {
    event.preventDefault();
    console.log('Editing User!');
    const editFirst = encodeURIComponent(this.state.value2);
    const editLast = encodeURIComponent(this.state.value3);

    const formData = `firstName=${editFirst}&lastName=${editLast}`;
    var authHeader = 'bearer ' + TokenHandler.returnUserToken();

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/editUser');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', authHeader);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {},
        });

        console.log('User was edited!');

        var resetHeader = { fName: editFirst,
            lName: editLast, };
        localStorage.setItem('headerName', JSON.stringify(resetHeader));

        window.location.reload();

      } else {

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        console.log(this.eMessage);

        console.log(xhr.response.message);
        if (xhr.response.message) {

          this.setState({ warningText: xhr.response.message });
        }

        this.setState({
          errors,
        });
      }
    });
    xhr.send(formData);
  }

  toggleEdit() {
    document.getElementById('renderedName').style.display = 'none';
    document.getElementById('editName').style.display = 'table-row';
  }

  rowDelete(passedRow, rowNumber, event)
  {
    console.log(passedRow);
    console.log(rowNumber);
    console.log('This is the event:');
    console.log(event.target.parentNode.parentNode.rowIndex);
    const rowID = encodeURIComponent(passedRow);

    const formData = `id=${rowID}`;
    var authHeader = 'bearer ' + TokenHandler.returnUserToken();

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/awardDelete');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', authHeader);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {},
        });

        console.log('Award Deleted');
        var currentTable = document.getElementById('awardTable');

        //Referenced: https://stackoverflow.com/questions/6654179/removing-a-row-from-the-table-and-re-indexing-the-table
        currentTable.deleteRow(event.target.parentNode.parentNode.rowIndex);

        var originalRowsNum = this.state.value;
        originalRowsNum--;
        this.setState({ value: originalRowsNum });

      } else {

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        console.log(this.eMessage);

        console.log(xhr.response.message);
        if (xhr.response.message) {

          this.setState({ warningText: xhr.response.message });
        }

        this.setState({
          errors,
        });
      }
    });
    xhr.send(formData);

  }

  refreshAwards(event) {
    console.log('Doing function!');
    //event.preventDefault();
    const self = this;
    const formData = '';
    var authHeader = 'bearer ' + TokenHandler.returnUserToken();

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/awardReturn');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', authHeader);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {

        console.log('Here is the contents of the refresh response.');
        console.log(xhr.response);

        var rData = xhr.response;

        console.log(Object.keys(rData).length);
        console.log(this.state.value);

        var resLength = Object.keys(rData).length;

        if (this.state.value != resLength) {
          //Dynamically adds award info to user page.
          var table = document.getElementById('awardTableBody');

          for (var index = 0; index < resLength; index++)
          {
            //Creates celle elements
            var row2 = document.createElement('tr');
            var data1 = document.createElement('td');

            //Assigns cells returned information
            data1.textContent = rData[index].type;
            var data2 = document.createElement('td');
            data2.textContent = rData[index].receiverFirstName;
            var data3 = document.createElement('td');
            data3.textContent = rData[index].receiverLastName;
            var data4 = document.createElement('td');
            data4.textContent = rData[index].receiverEmail;
            var data5 = document.createElement('td');
            data5.textContent = rData[index].timeGiven;
            var deleteButtonData = document.createElement("td");
            var deleteButton = document.createElement("input");
            deleteButton.type = "button";
            deleteButton.value = "delete";
            deleteButton.onclick = this.rowDelete.bind(this, rData[index].id, event);

            //Appends created cells to generated table
            row2.appendChild(data1);
            row2.appendChild(data2);
            row2.appendChild(data3);
            row2.appendChild(data4);
            row2.appendChild(data5);
            row2.appendChild(data5);
            deleteButtonData.appendChild(deleteButton);
            row2.appendChild(deleteButtonData);
            table.appendChild(row2);

          }

          this.setState({ value: resLength });
        }

      } else {
        console.log('Error from the server');
      }
    });
    xhr.send(formData);
  }

  render() {
    let userName = null;
    var userFName;
    var userLName;
    userFName = JSON.parse(localStorage.getItem('headerName')).fName;
    userLName = JSON.parse(localStorage.getItem('headerName')).lName;

    return (
          <div className="userDiv">
            <h2 className="userHeader">User Page</h2>
            <br></br>
            <h3>Modify User</h3>
            <br></br>
            <form className="editUser" onSubmit={this.handleEdit}>
              <table id='userTable'>
                <tbody id='userTableBody'>
                   <tr id='userTableHead'>
                     <th className="userTH">First Name</th>
                     <th className="userTH">Last Name</th>
                     <th></th>
                   </tr>
                   <tr id="renderedName">
                     <td>{ userFName }</td>
                     <td>{ userLName }</td>
                     <td><input type="button" value="Edit" onClick={this.toggleEdit} /></td>
                   </tr>
                   <tr id="editName" style={{ display: 'none' }}>
                     <td><input className="userEdit" type="text" onChange={this.handleChange.bind(this, 'value2')} /></td>
                     <td><input className="userEdit" type="text" onChange={this.handleChange.bind(this, 'value3')} /></td>
                     <td><input type="submit" value="Submit" /></td>
                   </tr>
                </tbody>
            </table>
          </form>
            <br></br>
            <h3>Award Summary</h3>
            <br></br>
            <input id="clickMe" type="button" value="Refresh Awards" onClick={this.refreshAwards} />
            <br></br>
              <table id='awardTable'>
                <tbody id='awardTableBody'>
                   <tr>
                     <th>Award Type</th>
                     <th>Recipient First Name</th>
                     <th>Recipient Last Name</th>
                     <th>Recipient Email</th>
                     <th>Award Creation Date</th>
                     <th>Delete Award</th>
                   </tr>
                </tbody>
            </table>
          </div>
    );

  }

}

export default UserPageContent;
