import { range } from 'lodash';
import { useState } from 'react';

export const digits = range(0, 10);

export const decimalPoint = '.';

export const defaultDisplayValue = digits[0].toString();

export enum Operation {
  Add = '+',
  Divide = '/',
  Multiply = '*',
  Subtract = '-',
}

interface UseCalculatorResult {
  calculate(): void;
  clearInput(): void;
  input: string;
  insertDecimalPoint(): void;
  insertDigit(value: number): void;
  negate(): void;
  operation: Operation | undefined;
  perCent(): void;
  reset(): void;
  setOperation(value: Operation): void;
}

export const useCalculator = (): UseCalculatorResult => {
  const [input, setInput] = useState('');

  const [operand, setOperand] = useState('');
  const [op, setOp] = useState<Operation | undefined>();

  const insertDigit = (value: number) => {
    if (!digits.includes(value)) {
      return;
    }

    setInput(
      !input || input === defaultDisplayValue
        ? value.toString()
        : input + value,
    );
  };

  const insertDecimalPoint = () => {
    if (input.includes(decimalPoint)) {
      return;
    }

    setInput((input || defaultDisplayValue) + decimalPoint);
  };

  const setOperation = (value: Operation) => {
    if (!operand) {
      setOperand(input || defaultDisplayValue);
      setInput(defaultDisplayValue);
    }

    setOp(value);
  };

  const negate = () => {
    if (!input || input === defaultDisplayValue) {
      return;
    }

    setInput(input.startsWith('-') ? input.substring(1) : `-${input}`);
  };

  const perCent = () => setInput((Number(input) / 100).toString());

  const clearInput = () => setInput('');

  const reset = () => {
    setInput('');

    setOperand('');
    setOp(undefined);
  };

  const calculate = () => {
    if (!operand || !op) {
      return;
    }

    const leftOperand = Number(operand);
    const rightOperand = Number(input);

    const performOperation = (a: number, b: number, op: Operation) => {
      switch (op) {
        case Operation.Add:
          return a + b;
        case Operation.Subtract:
          return a - b;
        case Operation.Multiply:
          return a * b;
        case Operation.Divide:
          return a / b;
      }
    };

    const result = performOperation(leftOperand, rightOperand, op);

    setInput(result.toString());
  };

  return {
    calculate,
    clearInput,
    input,
    insertDecimalPoint,
    insertDigit,
    negate,
    operation: op,
    perCent,
    reset,
    setOperation,
  };
};
