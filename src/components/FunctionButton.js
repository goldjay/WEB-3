import React from 'react';

// NOTE: Probably not needed as separate component because onclick event can be passed to normal button
// and this button will not need to store the state
export default class functionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  returnPosition(element){
    var pos = this.props.position;
    console.log("POSITION INSIDE RETURN POSITION: " + pos);

    // Send back the position of the button's tile
    this.props.handleCancelPress(pos);

  }

  render(props) {
    return (
      <button className={this.props.buttonClass} type="button" onClick={this.props.function}>{this.props.text}</button>
    );
  }
}
