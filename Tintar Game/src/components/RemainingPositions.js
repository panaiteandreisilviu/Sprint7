require('normalize.css');
require('styles/App.css');

import React from 'react';

class RemainingPositions extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let style = {backgroundColor: this.props.color};
    return (
      <div className='tile' style={style}>
      </div>
    );
  }
}

export default RemainingPositions;
