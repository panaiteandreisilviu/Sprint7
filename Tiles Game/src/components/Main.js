require('normalize.css');
require('styles/App.css');

import React from 'react';


var App = React.createClass({

  render: function () {
    return (
      <div>
        <Board tiles={5} size={600}/>
      </div>);
  }

});

var Board = React.createClass({
  getInitialState: function () {
    var tilesPerLine = this.props.tiles;
    var sizeOfBoard = this.props.size;
    var numberOfTiles = tilesPerLine * tilesPerLine;
    var cellSize = sizeOfBoard / tilesPerLine;
    var board = [];
    for (var i = 0; i < numberOfTiles - 1; i++) {
      var x = Math.floor(i % tilesPerLine) * cellSize;
      var y = Math.floor(i / tilesPerLine) * cellSize;
      var pos = {x: x, y: y};
      var firstPos = {x: x, y: y};
      board.push({number: i + 1, pos: pos, firstPos: firstPos})
    }
    return {
      emptyPos: {
        x: sizeOfBoard - cellSize,
        y: sizeOfBoard - cellSize
      },
      tilesPerLine: tilesPerLine,
      sizeOfBoard: sizeOfBoard,
      board: board

    }
  },

  render: function () {
    var tiles = [];
    var tilesPerLine = this.state.tilesPerLine;
    var sizeOfBoard = this.state.sizeOfBoard;
    var numberOfTiles = tilesPerLine * tilesPerLine;
    var cellSize = sizeOfBoard / tilesPerLine;
    var boardStyle = {height: sizeOfBoard, width: sizeOfBoard};
    for (var i = 0; i < numberOfTiles - 1; i++) {
      var tile = <Tile
        index={i}
        key={i}
        number={i+1}
        position={this.state.board[i].pos}
        startPosition={this.state.board[i].firstPos}
        onClick={this.onTileClick}
        cellSize={cellSize}
        sizeOfBoard={sizeOfBoard}
      />;
      tiles.push(tile)
    }


    return (
      <div>
        <div className="board" style={boardStyle}>
          {tiles}
        </div>
      </div>);
  },

  onTileClick: function (index) {
    var isValidMove = this.isValidMove(this.state.board[index].pos, this.state.emptyPos);
    if (!isValidMove) {
      return alert('Invalid Move');
    }
    var obj = {};
    obj = this.state.board[index].pos;
    this.state.board[index].pos = this.state.emptyPos;
    this.state.emptyPos = obj;
    this.forceUpdate();
  },

  isValidMove: function (startPos, targetPos) {
    var tilesPerLine = this.state.tilesPerLine;
    var sizeOfBoard = this.state.sizeOfBoard;
    var diff = sizeOfBoard / tilesPerLine;
    var diffX = Math.abs(targetPos.x - startPos.x);
    var diffY = Math.abs(targetPos.y - startPos.y);
    var validX = diffX === diff && diffY === 0;
    var validY = diffY === diff && diffX === 0;

    return validX || validY;
  }


});

var Tile = React.createClass({

  onClick: function () {
    this.props.onClick(this.props.index)
  },

  render: function () {
    var pos = this.props.position;
    var startPos = this.props.startPosition;
    var cellSize = this.props.cellSize;
    var boardSize = this.props.sizeOfBoard;
    console.log(this.state);
    var background = 'url(\'http://i.imgur.com/yfdOju1.jpg\') no-repeat';
    var backgroundPosition = ' -' + startPos.x + 'px' + ' -' + startPos.y + 'px';
    var style = {
      left: pos.x,
      top: pos.y,
      background: background + backgroundPosition,
      backgroundSize: boardSize,
      height: cellSize,
      width: cellSize
    };
    return (
      <div className="tile" style={style} onClick={this.onClick}>
      </div>);
  }

});

App.defaultProps = {};

export default App;
