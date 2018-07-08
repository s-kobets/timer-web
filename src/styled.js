import styled from 'styled-components';

const WrapperTimer = styled.div`
  position: relative;
  margin: 10px;
  width: 1em;
  height: 1em;
  font-size: 300px;
  border-radius: 50%;
  background-color: #cccccc;
  box-sizing: content-box;

  &::after {
    position: absolute;
    top: 0.025em;
    left: 0.025em;
    display: block;
    content: ' ';
    border-radius: 50%;
    background-color: #f5f5f5;
    width: 0.95em;
    height: 0.95em;
    transition-property: all;
    transition-duration: 0.2s;
    transition-timing-function: ease-in;
  }
`;
const CliceTimer = styled.div`
  position: absolute;
  width: 1em;
  height: 1em;
  clip: ${({ spin }) =>
    spin <= 180
      ? 'rect(0em, 1em, 1em, 0.5em)'
      : 'rect(auto, auto, auto, auto)'};
`;

const BarTimer = styled.div`
  position: absolute;
  border: 0.025em solid #307bbb;
  width: 0.95em;
  height: 0.95em;
  clip: rect(0em, 0.5em, 1em, 0em);
  border-radius: 50%;
  transform: rotate(10deg);
  transform: ${({ spin }) => `rotate(${spin}deg)`};
  transition: all 0.25s ease-in-out;
`;
const FillTimer = BarTimer.extend`
  transform: ${({ spin }) => (spin <= 180 ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: all 0.25s ease-in-out;
`;

const InputTime = styled.input`
  position: absolute;
  width: calc(100% - 1em);
  margin: 0 0.5em;
  z-index: 1;
  top: calc(50% - 0.85em);
  font-size: 0.15em;
  color: black;
  display: block;
  text-align: center;
  white-space: nowrap;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  border: none;
  border-bottom: 1px solid black;
  outline: none;

  &:focus {
    border-bottom-color: blue;
  }
`;

const Content = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddTimer = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;

  button {
    position: relative;
    padding: 40px;
    background: #41addd;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    transition: transform 0.25s ease-in-out;

    &:hover {
      transform: scale(1.15);
    }

    &::before {
      content: '×';
      display: inline-block;
      font-size: 70px;
      position: absolute;
      top: -7px;
      left: 25px;
      transform: rotate(45deg);
      color: #fff;
    }
  }
`;

const Button = styled.button`
  display: inline-block;
  box-sizing: border-box;
  margin: 1em;
  padding: 0.7em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41addd;
  color: #41addd;

  &:hover {
    background: #41addd;
    color: #fff;
  }
`;

export {
  WrapperTimer,
  CliceTimer,
  BarTimer,
  FillTimer,
  InputTime,
  Content,
  AddTimer,
  Button
};
