import React from 'react'

import Timer from '@r/components/tutorials/Timer'


class TimerView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title
    }
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <Timer/>
      </div>
    )
  }
}

export default TimerView;