import React, { Component } from 'react'

export default class LifecycleContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ouputComponentDidUpdate: false, 
      lifecycleArray: []
    }
    const msg = '[ constructor  ] [ Updated List ] can\'t use setState'
    const lifecycleArray = this.state.lifecycleArray.concat()
    console.log(msg)
    lifecycleArray.push(msg)
    this.state.lifecycleArray = lifecycleArray 
  }
  componentDidMount() {
    const msg = '[ componentDidMount ] \n (will trigger an extra render)'
    const lifecycleArray = this.state.lifecycleArray.concat()
    lifecycleArray.push(msg)
    console.log(msg)
    this.setState({lifecycleArray})
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(
      '[ shouldComponentUpdate ]', 
      '\nnextProps:', nextProps, 
      '\nnextState:', nextState,
      '\nnextContext:', nextContext,
    );
    return '[snapshot] from getSnapshotBeforeUpdate';
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(
      '[ getSnapshotBeforeUpdate ]', 
      '\nprevProps:', prevProps, 
      '\nprevState:', prevState,
      '\nreturn [snapshot] from getSnapshotBeforeUpdate'
    );
    return '[snapshot] from getSnapshotBeforeUpdate';
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[ componentDidUpdate ] [ Updated List ]', 
      '\nprevProps:', prevProps, 
      '\nprevState:', prevState,
      '\nsnapshot:', snapshot,
      '\ncomponentDidUpdate() 中可以直接调用 setState()，但请注意它必须被包裹在一个条件语件里，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。'
    );
    const componentDidUpdateHint = '[ componentDidUpdate ]\n[ if (lifecycleArray[lifecycleArray.length - 2 ] !== componentDidUpdateHint)] \n (will trigger an extra render)'
    const lifecycleArray = this.state.lifecycleArray.concat()
    if (this.state.ouputComponentDidUpdate && lifecycleArray[lifecycleArray.length -2] !== componentDidUpdateHint) {
      lifecycleArray.push(componentDidUpdateHint)
      this.setState({lifecycleArray})
    }
  }
  componentWillUnmount() {
    console.log('[ componentWillUnmount ] componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。')
  }
  // static getDerivedStateFromProps(props, state) {

  // }
  render() {
    const msg = '[ render ] [ Updated List ]'
    const array = this.state.lifecycleArray.concat();
    array.push(msg)
    console.log(msg)
    this.state.lifecycleArray = array 
    const renderedArray = array.map((item, idx) => {
      return (
        <li key={`${idx}`}>
            <span style={{whiteSpace: 'pre'}}>{item}</span>
        </li>
      )
    })   
    return (
        <>
            <h1>I'm a lifecyle test container</h1>
            <button onClick={()=>{this.forceUpdate()}}>
              我是一个无情的 forceUpdate() 按钮
            </button>
            <button onClick={()=>{this.setState({ouputComponentDidUpdate: !this.state.ouputComponentDidUpdate})}}>
              { this.state.ouputComponentDidUpdate ? '停止' : '开始'} 
              输出 componentDidUpdate 
            </button>
            <ul>
                {renderedArray}
            </ul>
        </>
    )
    }
}