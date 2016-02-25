require('normalize.css');
require('styles/App.css');

import React from 'react';

class Position extends React.Component {

  constructor(props) {
    super(props);
  }

  setStyle() {
    this.props.myFunc(this.props.index);
  }

  render() {
    let style = this.props.posData;
    if (this.props.owner !== null) {
      style.background = this.props.owner == '1' ? '#555555' : '#f3f3f3';
    }
    return (
      <div className='tile' onClick={this.setStyle.bind(this)} style={style}>
      </div>
    );
  }
}

export default Position;
