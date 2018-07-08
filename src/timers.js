import React, { PureComponent } from 'react';
import {
  WrapperTimer,
  CliceTimer,
  BarTimer,
  FillTimer,
  InputTime,
  Content,
  AddTimer,
  Button
} from './styled';

function addZero(number) {
  return number > 9 ? number : `0${number}`;
}

function convertInTimer(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec - h * 3600) / 60);
  const s = Math.floor(sec - h * 3600 - m * 60);

  return `${addZero(h)}:${addZero(m)}:${addZero(s)}`;
}

function convertInSecond(timer) {
  let t = timer.split(':');

  switch (t.length) {
    case 3:
      t = Number(t[0]) * 3600 + Number(t[1]) * 60 + Number(t[2]);
      break;
    case 2:
      t = Number(t[0]) * 3600 + Number(t[1]) * 60;
      break;
    case 1:
      t = Number(t[0]) * 3600;
      break;
  }
  return t;
}

function* generate(list) {
  yield* list;
}

class Timers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timers: [{ value: 0 }], // {value: 0},
      timersValue: [0]
    };
  }

  addTimer = () => {
    this.setState({
      timers: [...this.state.timers, { value: 0 }],
      timersValue: [...this.state.timersValue, 0]
    });
  };

  handleChangeTimer = e => {
    const { currentTarget } = e;
    const id = currentTarget.getAttribute('name').match(/[0-9]/)[0];
    let { value } = currentTarget;

    const array = value.split(':');
    if (array.length === 2) {
      value += ':00';
    }

    const { timers, timersValue } = this.state;
    value = convertInSecond(value);
    timers[id] = { value };
    timersValue[id] = value;

    this.setState({
      timers: [...timers],
      timersValue: [...timersValue]
    });
  };

  startTimer = e => {
    e.preventDefault();
    const { timers } = this.state;

    this.timers = generate(timers);
    this.calledTimer();
  };

  calledTimer = (changeTimer, changeId) => {
    const { timers, timersValue } = this.state;

    if (!changeTimer) {
      clearTimeout(this.time);
      const nextTimer = this.timers.next().value;

      // change id
      if (changeId !== undefined) {
        timers[changeId].value = timersValue[changeId];
        this.setState({
          timers: [...timers]
        });
      }

      // call next timer from timers
      if (nextTimer) {
        const { value } = nextTimer;
        const id = timersValue.indexOf(value);
        this.calledTimer(value, id);
      }
    }

    // change value timer
    if (changeTimer > 0) {
      let t = changeTimer;

      t -= 1;
      this.time = setTimeout(() => {
        timers[changeId] = { value: t };

        this.setState({
          timers: [...timers]
        });

        return this.calledTimer(t, changeId);
      }, 1000);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.time);
  }

  stopTimers = () => {
    let { timers, timersValue } = this.state;
    clearTimeout(this.time);

    timersValue.forEach((value, index) => {
      timers[index].value = value;
    });
    this.setState({ timers: [...timers] });
  };

  currentDeg = (value, deg360) => {
    if (deg360 === 0) return 0;
    if (value === deg360) return 360;
    return ((deg360 - value) * 360) / deg360;
  };

  render() {
    const { timers, timersValue } = this.state;
    return (
      <div>
        <Content onSubmit={this.startTimer}>
          {timers.map((timer, index) => (
            <WrapperTimer key={index}>
              <InputTime
                type="time"
                step="1"
                name={`time-${index}`}
                value={convertInTimer(timer.value)}
                onChange={this.handleChangeTimer}
              />
              <CliceTimer
                spin={this.currentDeg(timer.value, timersValue[index])}
              >
                <BarTimer
                  spin={this.currentDeg(timer.value, timersValue[index])}
                />
                <FillTimer
                  spin={this.currentDeg(timer.value, timersValue[index])}
                />
              </CliceTimer>
            </WrapperTimer>
          ))}

          <div>
            <Button type="submit">Start</Button>
            <Button type="button" onClick={this.stopTimers}>
              Stop
            </Button>
          </div>
        </Content>

        {/* <button>Pause</button> */}
        <AddTimer>
          <button onClick={this.addTimer} />
        </AddTimer>
      </div>
    );
  }
}

export default Timers;
