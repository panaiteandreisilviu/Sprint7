require('normalize.css');
require('styles/App.css');

import React from 'react';

class Position extends React.Component {

  constructor(props) {
    super(props);
  }

  setStyle() {
    this.state.style.backgroundColor = 'black';
    this.forceUpdate();
  }

  render() {
    let style = this.props.posData;
    this.state = {style};
    return (
      <div className='tile' onClick={this.setStyle.bind(this)} style={this.state.style}>
      </div>
    );
  }
}

export default Position;
