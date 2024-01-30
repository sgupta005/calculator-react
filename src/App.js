import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [screenValue, setScreenValue] = useState('');
  const operators = ['%', '/', '+', '-', '*'];

  const operator = screenValue
    .split('')
    .map((letter) => (operators.includes(letter) ? letter : ''))
    .find((operator) => operator !== '');

  const num1 = screenValue.split(operator)[0];
  const num2 = screenValue.split(operator)[1];
  console.log(operator, num1, num2);

  useEffect(
    function () {
      function callback(e) {
        if (e.key === 'Enter') {
          handleEqualsClick();
        }
        if (e.key === 'Backspace') {
          setScreenValue((value) => value.slice(0, value.length - 1));
        }
      }
      document.addEventListener('keydown', callback);
      return () => document.removeEventListener('keydown', callback);
    },
    [handleEqualsClick]
  );

  function handleOperationClick(operation) {
    if (!screenValue || ['%', '/', '+', '-'].includes(screenValue.slice(-1)))
      return;
    if (operator) {
      const result = performOperation();
      setScreenValue(result);
    }
    setScreenValue((value) => value + operation);
  }

  function performOperation() {
    let result;
    switch (operator) {
      case '%':
        result = +num1 % +num2;
        break;
      case '+':
        result = +num1 + +num2;
        break;
      case '-':
        result = +num1 - +num2;
        break;
      case '*':
        result = +num1 * +num2;
        break;
      case '/':
        result = +num1 / +num2;
        break;
      default:
        console.log('invalid operator');
        break;
    }
    return result.toString();
  }

  function handleEqualsClick() {
    if (!num1 || !num2 || !operator) return;
    const result = performOperation();
    setScreenValue(result);
  }

  function handleDecimalClick() {
    if (!screenValue || screenValue.slice(-1) === '.') return;
    setScreenValue((value) => value + '.');
  }

  function handleScreenInput(e) {
    const key = e.target.value.slice(-1);
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (![...digits, ...operators, '.'].includes(key)) return;
    if (operators.includes(key)) {
      handleOperationClick(key);
      return;
    }
    if (key === '.') {
      handleDecimalClick();
      return;
    }
    setScreenValue(e.target.value);
  }

  return (
    <>
      <Screen onScreenInput={handleScreenInput} screenValue={screenValue} />
      <KeyBoard>
        <AllClearButton setScreenValue={setScreenValue} />
        <ClearButton setScreenValue={setScreenValue} />
        <OperationButton
          operation={'%'}
          onOperationClick={handleOperationClick}
        />
        <OperationButton
          operation={'/'}
          onOperationClick={handleOperationClick}
        />
        <Digit digit={7} setScreenValue={setScreenValue} />
        <Digit digit={8} setScreenValue={setScreenValue} />
        <Digit digit={9} setScreenValue={setScreenValue} />
        <OperationButton
          operation={'+'}
          onOperationClick={handleOperationClick}
        />
        <Digit digit={4} setScreenValue={setScreenValue} />
        <Digit digit={5} setScreenValue={setScreenValue} />
        <Digit digit={6} setScreenValue={setScreenValue} />
        <OperationButton
          operation={'-'}
          onOperationClick={handleOperationClick}
        />
        <Digit digit={1} setScreenValue={setScreenValue} />
        <Digit digit={2} setScreenValue={setScreenValue} />
        <Digit digit={3} setScreenValue={setScreenValue} />
        <OperationButton
          operation={'*'}
          onOperationClick={handleOperationClick}
        />
        <Digit digit={0} setScreenValue={setScreenValue} />
        <Decimalbutton onDecimalClick={handleDecimalClick} />
        <EqualsButton onEqualsClick={handleEqualsClick} />
      </KeyBoard>
    </>
  );
}

function Screen({ screenValue, onScreenInput }) {
  return (
    <div className="screen">
      <input
        type="text"
        id="screen-input"
        value={screenValue}
        onChange={onScreenInput}
      />
    </div>
  );
}

function KeyBoard({ children }) {
  return <div className="button-grid">{children}</div>;
}

function OperationButton({ operation, onOperationClick }) {
  return (
    <button className="operators" onClick={() => onOperationClick(operation)}>
      {operation}
    </button>
  );
}

function Digit({ digit, setScreenValue }) {
  function handleDigitClick() {
    setScreenValue((value) => value + digit);
  }
  return (
    <button className="digits" onClick={handleDigitClick}>
      {digit}
    </button>
  );
}

function AllClearButton({ setScreenValue }) {
  return (
    <button className="all-clear" onClick={() => setScreenValue('')}>
      AC
    </button>
  );
}

function ClearButton({ setScreenValue }) {
  function handleClearClick() {
    setScreenValue((value) => value.slice(0, value.length - 1));
  }
  return (
    <button className="clear" onClick={handleClearClick}>
      C
    </button>
  );
}

function Decimalbutton({ onDecimalClick }) {
  return (
    <button className="decimal" onClick={onDecimalClick}>
      .
    </button>
  );
}

function EqualsButton({ onEqualsClick }) {
  return (
    <button className="equals" onClick={onEqualsClick}>
      =
    </button>
  );
}

export default App;
