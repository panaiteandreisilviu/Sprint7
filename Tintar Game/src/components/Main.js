require('normalize.css');
require('styles/App.css');

import React from 'react';
import Board from './Board'

window.onclick = function (event) {
  document.getElementById('test').innerHTML = 'X : ' + event.clientX + ' Y : ' + event.clientY;
};

var App = React.createClass({

  render: function () {
    return (
      <div>
        <Board />
      </div>);
  }

});

App.defaultProps = {};

export default App;
