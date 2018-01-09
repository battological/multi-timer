import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(this.props.order, event);
  }

  render() {
    return (
      <form onSubmit={this.props.nextTimer} className='timer form-inline'>
        <div id='description' className='timer-component form-group'>
          <input
            type='text'
            autoFocus
            placeholder='Description'
            name='description'
            onChange={this.handleChange} 
            className='form-control' />
        </div>

        <div id='duration' className='timer-component form-group'>
          <select
            name='hours'
            onChange={this.handleChange} 
            className='form-control custom-select'>
            <option value='0'>Hours</option>
            {Array.from(new Array(100), (e, i) => <option key={i} value={i}>{i}</option>)}
          </select>

          <select
            name='minutes'
            onChange={this.handleChange} 
            className='form-control custom-select'>
            <option value='0'>Minutes</option>
            {Array.from(new Array(60), (e, i) => <option key={i} value={i}>{i}</option>)}
          </select>

          <select
            name='seconds'
            onChange={this.handleChange} 
            className='form-control custom-select'>
            <option value='0'>Seconds</option>
            {Array.from(new Array(60), (e, i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        {<button id='add-timer' className='btn btn-primary' type='submit'>+</button>}
      </form>
    )
  }
}
