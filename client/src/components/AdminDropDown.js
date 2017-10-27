import React from 'react';
import Select from 'react-select'; //https://www.npmjs.com/package/react-select
import 'react-select/dist/react-select.css'; // Styles from react-select
var debounce = require('lodash.debounce'); // For delaying a function

export default class DropDown extends React.Component {
  constructor(props) {
     super(props);
     this.state = {value:''};
   }

   updateState(element) {
        if(element !== null){
          this.setState({value: element});
          // Change App state when dropdown is changed
          this.props.handleDropDownChange(element.value);
        }
   }

   // State is not updated for 1 second (1000ms) after input change
   // So the search won't run with each letter entered

   // TO DO: POSSIBLY USE QUERY TO SORT VALUES INSTEAD OF QUERY DATABASE
   updateStateWithQuery = debounce((e) => {
     this.setState({ value: e });
     this.props.handleSearch(e);
   }, 1000)

  render() {
    var options = [
      { value: 'GENERIC', label: 'GENERIC' },
      { value: 'ADMIN', label: 'ADMIN' },
      { value: 'ALL', label: 'ALL'}
    ];

    return (
      <div className="adminDropDown">
        <Select
          name="form-field-name"
          value={this.state.value}
          options={options}
          onChange={this.updateState.bind(this)}
          onInputChange={this.updateStateWithQuery.bind(this)}
          noResultsText={''}
        />
      </div>
    );
  }
}
