import React from 'react';
import '../styles/UserPageContent.css';
<<<<<<< HEAD
=======
import TokenHandler from '../client-auth/TokenHandler';
import { refresh } from 'react-router-dom';
>>>>>>> af38203f1bda4b6703f70fb6e65408ca1189f91d
import { Redirect } from 'react-router-dom';
import ResetFormContent from '../components/ResetFormContent.jsx';

class UserPageContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { passedVar: props.resetVar,
    };
  }

  render() {
    let resetContent = null;

<<<<<<< HEAD
    if (this.props.resetVar === true)
    {
      resetContent = <ResetFormContent resetID={this.props.resetID}/>;
    } else if (this.props.resetVar === false) {
=======
    if (this.props.resetVar == true)
    {
      resetContent = <ResetFormContent resetID={this.props.resetID}/>;
    } else if (this.props.resetVar == false) {
>>>>>>> af38203f1bda4b6703f70fb6e65408ca1189f91d
      resetContent = <Redirect to='/' />;;
    } else {
      resetContent = '';
    }

    return (
    <div>{resetContent}</div>
    );

  }

}

export default UserPageContent;
