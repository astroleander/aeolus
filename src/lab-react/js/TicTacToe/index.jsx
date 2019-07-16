import React from 'react';
import './index.scss';

/**
 * 因为 Square 组件不再持有 state，
 * 因此每次它们被点击的时候，Square 组件就会从 Board 组件中接收值，
 * 并且通知 Board 组件。在 React 术语中，
 * 我们把目前的 Square 组件称做“受控组件”。
 * 在这种情况下，Board 组件完全控制了 Square 组件。
 * 
 * 如果你想写的组件只包含一个 render 方法，并且不包含 state，
 * 那么使用函数组件就会更简单。
 * 我们不需要定义一个继承于 React.Component 的类，
 * 我们可以定义一个函数，这个函数接收 props 作为参数，
 * 然后返回需要渲染的元素。函数组件写起来并不像 class 组件那么繁琐，
 * 很多组件都可以使用函数组件来写。
 */
// class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square" 
//         onClick={()=> { this.props.onClick() }}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
    renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history:[{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  handleClick(i) {
    // 点击棋盘的时候 冲刷掉【未来】的操作
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // 创建一个新的副本
    const squares = current.squares.slice();

    // 每一次点击都要进行重复的计算，这样好吗
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, 
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => { // (data, idx)
      const desc = move ?
        `Go to move #${move}` :
        'Go to the game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && 
      squares[a] === squares[c]) {
        return squares[a]
    }
  }
  return null;
}
// ========================================
export default Game
// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );
