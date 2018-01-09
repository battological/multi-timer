import React from 'react';

import Timer from './timer';
import './timer.css';


export default class Timers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [{}],
      currentClock: null,
      currentDescription: '',
      currentTimout: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
    this.duration = this.duration.bind(this);
  }

  handleChange(i, event) {
    const name = event.target.name;
    const timers = this.state.timers.slice();
    timers[i][name] = event.target.value;
    this.setState({timers: timers});
  }

  addTimer(event) {
    event.preventDefault();

    const lastTimer = this.state.timers[this.state.timers.length-1];
    if (!lastTimer.hasOwnProperty('hours') && !lastTimer.hasOwnProperty('minutes') && !lastTimer.hasOwnProperty('seconds')) {
      return;
    }

    const timers = this.state.timers.slice();

    timers.push({});

    this.setState({
      timers: timers
    });
  }

  tick(i, time) {
    if (time-1 <= 0) {
      var timeout = setTimeout(() => this.go(i+1), 1000);
    } else {
      timeout = setTimeout(() => this.tick(i, time-1), 1000);
    }

    this.setState({
      currentClock: this.displayClock(time),
      currentTimout: timeout
    })
  }

  displayClock(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds % 3600 / 60);
    const seconds = Math.floor(timeInSeconds % 3600 % 60);

    const zeroPad = quantity => quantity < 10 ? `0${quantity}` : quantity;

    return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
  }

  go(i) {
    this.stop();
    if (i < this.state.timers.length) {
      const timer = this.state.timers[i];

      this.setState({
        currentDescription: timer.description,
      });

      this.tick(i, this.duration(i));
    } else {
      this.setState({
        currentClock: null,
        currentDescription: 'Complete',
        currentTimout: null
      });
    }
  }

  stop() {
    clearTimeout(this.state.currentTimout);
    this.setState({
      currentClock: null,
      currentDescription: this.state.currentTimout ? 'Canceled' : this.state.currentDescription,
      currentTimout: null
    });
  }

  // Convert hours/minutes/seconds to seconds
  duration(i) {
    const hours = parseInt(this.state.timers[i].hours, 10) || 0;
    const minutes = parseInt(this.state.timers[i].minutes, 10) || 0;
    const seconds = parseInt(this.state.timers[i].seconds, 10) || 0;

    return hours*3600 + minutes*60 + seconds;
  }

  render() {
    return (
      <div id='interface'>
        <div id='timers'>
          {this.state.timers.map(
            (timer, i, timers) => {
              return (
                <Timer
                  key={i}
                  order={i}
                  handleChange={this.handleChange}
                  nextTimer={this.addTimer} 
                  last={i === timers.length-1} />
              );
            }
          )}
        </div>

        <div id='controls'>
          <button type='button' className='btn btn-primary' onClick={() => this.go(0)}>Go!</button>
          <button type='button' className='btn btn-secondary' onClick={() => this.stop()}>Cancel</button>
        </div>

        <div id='current'>
          <div id='description'>{this.state.currentDescription}</div>
          <div id='clock'>{this.state.currentClock}</div>
        </div>
      </div>
    )
  }
}
