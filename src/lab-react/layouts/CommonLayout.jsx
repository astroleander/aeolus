import React, { Component } from 'react'

export default class CommonLayout extends Component {
  render() {
    return (
      <article>
        
        <FloatButton />
      </article>
    )
  }
}

class FloatButton extends Component {
  constructor() {
    super();
    this.state = {
      rotateDeg: 45
    }
  }
  render() {
    return (
      <div className='floating-button' id='react-common-layout-floating-button'>
        <span className='cross'>+</span>
      </div>
    )
  }
}

const floating_button = {
  
}