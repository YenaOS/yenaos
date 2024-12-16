import { range } from 'lodash';
import { useState } from 'react';

const digits = range(0, 10);

const decimalSeparator = '.';

const inputFallback = '0';

export enum Operation {
  Add = '+',
  Divide = '/',
  Multiply = '*',
  Subtract = '-',
}

const isInputEmpty = (value: string) => !value || value === '0';

interface UseCalculatorResult {
  calculate(): void;
  clearInput(): void;
  readonly decimalSeparator: string;
  readonly digits: readonly number[];
  readonly input: string;
  readonly inputFallback: string;
  insertDecimalSeparator(): void;
  insertDigit(value: number): void;
  negate(): void;
  readonly operation: Operation | undefined;
  perCent(): void;
  reset(): void;
  readonly result: number | undefined;
  setOperation(value: Operation): void;
}

export const useCalculator = (): UseCalculatorResult => {
  const [input, setInput] = useState('');

  const [operand, setOperand] = useState('');
  const [op, setOp] = useState<Operation | undefined>();

  const [result, setResult] = useState<number | undefined>();

  const insertDigit = (value: number) => {
    if (!digits.includes(value)) {
      return;
    }

    setInput(isInputEmpty(input) ? value.toString() : input + value);
  };

  const insertDecimalSeparator = () => {
    if (input.includes(decimalSeparator)) {
      return;
    }

    setInput((input || inputFallback) + decimalSeparator);
  };

  const setOperation = (value: Operation) => {
    if (!operand) {
      setOperand(input || inputFallback);
      setInput(inputFallback);
    }

    setOp(value);
  };

  const negate = () => {
    if (isInputEmpty(input)) {
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
    setResult(undefined);
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

    setResult(result);

    setInput(result.toString());
  };

  return {
    calculate,
    clearInput,
    decimalSeparator,
    digits,
    input,
    inputFallback,
    insertDecimalSeparator,
    insertDigit,
    negate,
    operation: op,
    perCent,
    reset,
    result,
    setOperation,
  };
};
