import React from 'react'

export default class AlgoLayout extends React.Component {
  constructor(props) {
    super(props);
    let pathname = this.props.location.pathname
    let path = pathname.substring(pathname.indexOf('/', 2))
    import('@/modules/algo' + path).then(m => {
      let state = { path }
      // surrender to jijitsu
      Object.keys(m.default).forEach(e => {
        state[e] = m.default[e]
        if (e !== 'inputs') {
          state['func_key'] = e
        } else {
          state['inputs_type'] = [...m.default[e].map(e => typeof e)]
        }
      })
      state['done'] = true;
      this.setState(state);
    })
  }
  // 在参数加载完成之前不进行渲染，即不执行 render 中的 f 函数，避免莫名其妙的错误
  shouldComponentUpdate(nextProps, nextState) {
    console.log({state: this.state, nextState})
    return nextState['done']
  }
  render() {
    console.log(this.state)
    let key = this.state && this.state['func_key'] || undefined
    return (
      <>
      {
        (<div>
          <pre>{key && String(this.state[key])}</pre>
          {key && this.state[key] && this.state['inputs'] && this.state['inputs_type'] && this.renderArgs()}
          {key && this.state[key] && this.state['inputs'] && this.renderResults(key)}
        </div>)
      }
      <FloatButton />
      </>)
  }
  renderArgs() {
    return this.state['inputs'].map((item, idx) => {
      return (
        <input 
          key={`${idx}`} 
          value={this.state['inputs'][idx]} 
          onChange={(e)=>this.handleArgChange(e.target.value, idx)}
          disabled={(this.state['inputs_type'][idx] === 'number' || this.state['inputs_type'][idx] === 'string' ? '' : 'disabled')}
        />
      )
    });
  }
  renderResults(key) {
    let f = this.state[key];
    return (
      <div>result:
        {JSON.stringify(f(...this.state['inputs']))}
      </div>
    )
  }
  handleArgChange(val, idx) {
    let newer = this.state['inputs'];
    if (this.state['inputs_type'][idx] === 'number') {
      if (val === '-') return -0;
      newer[idx] = Number(val);
    } else {
      newer[idx] = val;
    }
    this.setState({inputs: newer});
  }
} 

class FloatButton extends React.Component {
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