import React from 'react'
<<<<<<< HEAD
=======
import AdminDropDown from './AdminDropDown'
import AdminUserContainer from './AdminUserContainer'
>>>>>>> af38203f1bda4b6703f70fb6e65408ca1189f91d
import TokenHandler from '../client-auth/TokenHandler';
import { Redirect } from 'react-router-dom';
import AdminUserForm from './AdminUserForm';
import '../styles/AdminAddPage.css';
//import {Row, Col} from 'react-bootstrap'

export default class AdminAddPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userType: '', query: ''} // Set up the initial state

}

  render(props) {

    //Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
    //Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4

    return (
      <div>
        {TokenHandler.adminTokenPresent() === true ? (
        <div>
          <div className="addTile">
            <AdminUserForm
              tileType={'new'}
              clearFields={this.clearFields}
            />
          </div>
      </div>
    ) :
    (
       <Redirect to='/' />
     )
  }
    </div>
    );
  }
}
