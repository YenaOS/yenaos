import { useState } from 'react';

enum Operation {
  Add = '+',
  Divide = '/',
  Multiply = '*',
  Subtract = '-',
}

export const Calculator = () => {
  const [text, setText] = useState('');

  const [operand, setOperand] = useState('');
  const [operation, setOperation] = useState<Operation | undefined>();

  const handleClear = () => {
    setText('');

    setOperand('');
    setOperation(undefined);
  };

  const handleNegate = () =>
    setText(text.startsWith('-') ? text.substring(1) : `-${text}`);

  const handlePercent = () => undefined;

  const handleDigit = (value: string) => () => setText(text + value);

  const handleOperation = (value: Operation) => () => setOperation(value);

  const handleEqual = () => undefined;

  return (
    <div>
      <input readOnly value={text || 0} />
      <div>
        <button onClick={handleClear}>{}</button>
        <button onClick={handleNegate}>+/-</button>
        <button onClick={handlePercent}>%</button>
      </div>
      <div>
        <button onClick={handleDigit('0')}>0</button>
        <button onClick={handleDigit('1')}>1</button>
        <button onClick={handleDigit('2')}>2</button>
        <button onClick={handleDigit('3')}>3</button>
        <button onClick={handleDigit('4')}>4</button>
        <button onClick={handleDigit('5')}>5</button>
        <button onClick={handleDigit('6')}>6</button>
        <button onClick={handleDigit('7')}>7</button>
        <button onClick={handleDigit('8')}>8</button>
        <button onClick={handleDigit('9')}>9</button>
        <button>,</button>
      </div>
      <div>
        <button onClick={handleOperation(Operation.Divide)}>/</button>
        <button onClick={handleOperation(Operation.Multiply)}>x</button>
        <button onClick={handleOperation(Operation.Subtract)}>-</button>
        <button onClick={handleOperation(Operation.Add)}>+</button>
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  );
};
