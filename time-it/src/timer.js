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
      <form onSubmit={this.props.nextTimer}>
        <label>
          Description:
          <input
            type='text'
            autoFocus
            name='description'
            onChange={this.handleChange} />
        </label>

        <label>
          Duration:
          <input
            type='number'
            name='hours'
            placeholder='hours'
            onChange={this.handleChange} />:
          <input
            type='number'
            name='minutes'
            placeholder='minutes'
            onChange={this.handleChange} />:
          <input
            type='number'
            name='seconds'
            placeholder='seconds'
            onChange={this.handleChange} />
        </label>

        <button type='submit'>+</button>
      </form>
    )
  }
}
