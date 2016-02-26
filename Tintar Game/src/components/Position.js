require('normalize.css');
require('styles/App.css');

import React from 'react';

class Position extends React.Component {

  constructor(props) {
    super(props);
  }

  onClickFunc() {
    this.props.positionClicked(this.props.index);
  }

  render() {
    let style = this.props.posData;
    if (this.props.owner !== null) {
      style.background = this.props.owner == '1' ? 'black' : '#f3f3f3';
      style.color = this.props.owner == '1' ? 'white' : 'black';
      style.boxShadow = 'rgba(47, 47, 47 , 0.8) 1px 1px 5px 2px';
      style.border = '0';
    }
    return (
      <div className='tile' onClick={this.onClickFunc.bind(this)} style={style}>
      </div>
    );
  }
}

export default Position;
