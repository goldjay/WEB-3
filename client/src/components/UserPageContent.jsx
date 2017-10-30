import React from 'react';
import '../styles/UserPageContent.css';
import TokenHandler from '../client-auth/TokenHandler';

class UserPageContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: 0,
    };
    this.refreshAwards = this.refreshAwards.bind(this);

  }

  refreshAwards(event) {
    console.log('Doing function!');
    event.preventDefault();

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

            //Appends created cells to generated table
            row2.appendChild(data1);
            row2.appendChild(data2);
            row2.appendChild(data3);
            row2.appendChild(data4);
            row2.appendChild(data5);
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
    return (
          <div className="userDiv">
            <h2 className="userHeader">User Page</h2>
            <br></br>
            <p>Please hit the Refresh Awards button below to view submitted awards!</p>
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
                   </tr>
                </tbody>
            </table>
          </div>
    );

  }

}

export default UserPageContent;
