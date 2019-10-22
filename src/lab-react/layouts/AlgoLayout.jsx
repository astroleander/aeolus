import React from 'react'

export default class AlgoLayout extends React.Component {
  constructor(props) {
    super(props);
    let pathname = this.props.location.pathname
    this.state = {
      path: pathname.substring(pathname.indexOf('/', 2))
    }
    import('@/modules/algo' + this.state.path).then(m => {
      // surrender to jijitsu
      Object.keys(m.default).forEach(e => {
        this.setState({
          [e]: m.default[e]
        })
        if (e !== 'inputs') {
          this.setState({
            func_key: e
          })
        } else {
          this.setState({
            inputs_type: [...m.default[e].map(e => typeof e)]
          })
        }
      })
    })
  }
  render() {
    // console.log(this.props.func(...this.props.inputs))
    let key = this.state.func_key
    return (
      <>
      {
        (<div>
          <pre>{String(this.state[key])}</pre>
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
        {String(f(...this.state['inputs']))}
      </div>
    )
  }
  handleArgChange(val, idx) {
    let newer = this.state['inputs'];
    if (this.state['inputs_type'][idx] === 'number') {
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