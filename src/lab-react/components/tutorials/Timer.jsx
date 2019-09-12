import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() =>  this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    /**
     * 两者完全等价
     */
    // return (
    //   <div>
    //     Seconds: {this.state.seconds}
    //   </div>
    // )
    return React.createElement(
      'div',
      {},
      `Seconds: ${this.state.seconds}`
    )
  }
}

export default Timer;
