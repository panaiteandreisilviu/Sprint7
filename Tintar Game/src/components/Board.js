require('normalize.css');
require('styles/App.css');

import React from 'react';
import Position from './Position';
import GameEngine from './GameEngine'
import RemainingPositions from './RemainingPositions'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posData: this._calculatePosData(),
      boardArray: this._generateBoardArray(),
      gamePhase: 'Phase I',
      playerOneMustMove: false,
      remainingPositions: [9, 9]
    }
  }

  _arrayContainsValue(array, value) {
    return array.indexOf(value) > -1;
  }

  _generateBoardArray() {
    let board = [];
    for (let i = 0; i < 24; i++) {
      board.push(null);
    }

    return board;
  }

  _getX(index, offset) {
    if (this._arrayContainsValue([0, 6, 7], index)) {
      return 0 + offset;
    }

    else if (this._arrayContainsValue([8, 14, 15], index)) {
      return 50 + offset;
    }

    else if (this._arrayContainsValue([1, 5, 9, 13, 17, 21], index)) {
      return offset + 252;
    }

    else if (this._arrayContainsValue([16, 22, 23], index)) {
      return offset + 100;
    }

    else if (this._arrayContainsValue([18, 19, 20], index)) {
      return offset + 400;
    }

    else if (this._arrayContainsValue([10, 11, 12], index)) {
      return offset + 450;
    }
    else if (this._arrayContainsValue([2, 3, 4], index)) {
      return offset + 500;
    }
  }

  _getY(index, offset) {
    if (this._arrayContainsValue([0, 1, 2], index)) {
      return 0 + offset;
    }

    else if (this._arrayContainsValue([8, 9, 10], index)) {
      return 50 + offset;
    }

    else if (this._arrayContainsValue([16, 17, 18], index)) {
      return offset + 100;
    }

    else if (this._arrayContainsValue([3, 7, 11, 15, 19, 23], index)) {
      return offset + 250;
    }

    else if (this._arrayContainsValue([20, 21, 22], index)) {
      return offset + 400;
    }

    else if (this._arrayContainsValue([12, 13, 14], index)) {
      return offset + 450;
    }
    else if (this._arrayContainsValue([4, 5, 6], index)) {
      return offset + 500;
    }
  }

  _calculatePosData() {
    let posData = [];
    let offset = {x: 35, y: 35};
    for (let i = 0; i < 24; i++) {
      let position = {left: this._getX(i, offset.x), top: this._getY(i, offset.y), index: i};
      posData.push(position);
    }
    return posData;
  }

  positionClicked(index) {
    if (this.state.boardArray[index] == null && this.state.gamePhase != 'Phase II') {
      let player = this.state.playerOneMustMove;
      this.state.playerOneMustMove = !this.state.playerOneMustMove;
      this.state.boardArray[index] = player ? 1 : -1;
      this.state.getRemaining = this.getRemaining();
      this.forceUpdate();
    }

    else if (this.state.gamePhase == 'Phase II') {
      console.log(this);
    }
  }

  checkRemaining() {
    return this.state.remainingPositions[0] + this.state.remainingPositions[1] > 0;
  }


  getRemaining() {
    if (this.checkRemaining()) {
      if (this.state.playerOneMustMove) {
        this.state.remainingPositions[0]--;
      }
      else {
        this.state.remainingPositions[1]--;
      }
    }
    if (!this.checkRemaining()) {
      this.setState({gamePhase: 'Phase II'});
    }

    this.forceUpdate();
  }


  render() {
    let posData = this.state.posData;
    let gameInformationStyle;
    let gamePhaseStyle;
    let positions = posData.map((posData, index) => <Position key={index} owner={this.state.boardArray[index]}
                                                              index={index}
                                                              posData={posData}
                                                              myFunc={this.positionClicked.bind(this)}
                                                              className="tile"/>);
    if (this.state.gamePhase == 'Phase II') {
      gameInformationStyle = {background: 'rgba(28 , 54 , 77 , 0.70)', color: '#f5f5f5'};
      gamePhaseStyle = {'fontWeight': 'bold'};
    }


    let grayPositions = [];
    for (let i = 0; i < this.state.remainingPositions[0]; i++) {
      let pos = <RemainingPositions key={i} color="#555555"/>;
      grayPositions.push(pos);
    }

    return (
      <div>
        <div className='rectangle outerRectangle'></div>
        <div className='rectangle centerRectangle'></div>
        <div className='rectangle innerRectangle'></div>
        <div className="rectangle cornerRectangleTopLeft"></div>
        <div className="rectangle cornerRectangleTopRight"></div>
        <div className="rectangle cornerRectangleBottomLeft"></div>
        <div className="rectangle cornerRectangleBottomRight"></div>
        {positions}
        <div id="test"></div>
        <div className="gameInformation" style={gameInformationStyle}>
          <p style={gamePhaseStyle}>{this.state.gamePhase}</p>
          <p>{this.state.playerOneMustMove ? 'Current Player : Gray' : 'Current Player: White'}</p>
          <p>{'Gray: ' + this.state.remainingPositions[0]}</p>
          <p>{'White: ' + this.state.remainingPositions[1]}</p>


        </div>
      </div>);
  }
}


export
default
Board;
