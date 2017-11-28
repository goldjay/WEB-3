import React from 'react';
import '../styles/UserPageContent.css';
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

    if (this.props.resetVar === true)
    {
      resetContent = <ResetFormContent resetID={this.props.resetID}/>;
    } else if (this.props.resetVar === false) {

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
