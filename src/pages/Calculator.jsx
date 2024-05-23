import React, { useState } from 'react';
import Display from '../components/Display';
import Button from '../components/Button';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [value, setValue] = useState(null);
  const [keyPressed, setKeyPressed] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue);
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    setDisplayValue(String(currentValue / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (left, right, operator) => {
    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '%':
        return left % right;
      default:
        return right;
    }
  };

  const handleKeyDown = (event) => {
    let { key } = event;
    setKeyPressed(key);
    if (key === 'Enter') key = '=';

    if ((/\d/).test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key === '.') {
      event.preventDefault();
      inputDot();
    } else if (key === 'Backspace') {
      event.preventDefault();
      clearDisplay();
    } else if (key === 'Escape') {
      event.preventDefault();
      clearDisplay();
    } else if (key === '+') {
      event.preventDefault();
      performOperation('+');
    } else if (key === '-') {
      event.preventDefault();
      performOperation('-');
    } else if (key === '*') {
      event.preventDefault();
      performOperation('*');
    } else if (key === '/') {
      event.preventDefault();
      performOperation('/');
    } else if (key === '%') {
      event.preventDefault();
      performOperation('%');
    } else if (key === '=') {
      event.preventDefault();
      performOperation(operator);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, operator, value, waitingForOperand]);

  const handleButtonClick = (label) => {
    setKeyPressed(null);
    if (!isNaN(label)) {
      inputDigit(parseInt(label, 10));
    } else if (label === '.') {
      inputDot();
    } else if (label === 'C') {
      clearDisplay();
    } else if (label === '+/-') {
      toggleSign();
    } else if (label === '%') {
      inputPercent();
    } else if (label === '=') {
      performOperation(operator);
    } else {
      performOperation(label);
    }
  };

  const buttonLabels = ['C', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
  const keyMap = {
    '/': '/',
    '*': '*',
    '-': '-',
    '+': '+',
    '=': '=',
    'Enter': '=',
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': '.',
    'Backspace': 'C',
    'Escape': 'C',
    '%': '%'
  };
  return (
    <div className="calculator">
    <Display value={displayValue} />
    <div className="buttons">
      {buttonLabels.map(label => (
        <Button
          key={label}
          label={label}
          highlight={keyMap[keyPressed] === label}
          onClick={() => handleButtonClick(label)}
        />
      ))}
    </div>
  </div>
  );
};

export default Calculator;



