import React, { Component, Suspense } from 'react'

export default class CommonLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static getDerivedStateFromProps(props, state) {
    let pathname = props.location.pathname
    let path = pathname.substring(pathname.indexOf('/', 2));
    state = {
      path
    }
    return state
  }
  
  render() {
    {
      // import('@r/views' + this.state.path).then(m => {
      //   console.log(m)
      // })
    }

    const DynamicComponent = React.lazy(() => import('@r/views' + this.state.path))
    function MyComponent() {
      return (
        <Suspense fallback={<div>loading...</div>}>
          <DynamicComponent />
        </Suspense>
      );
    }    
    return (
      <article>
        <MyComponent />
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
  handleBack() {
    history.go(-1);
  }
  render() {
    return (
      <div onClick={this.handleBack} className='floating-button' id='react-common-layout-floating-button'>
        <span className='cross'>+</span>
      </div>
    )
  }
}