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
  clear(): void;
  displayedValue: string;
  insertDecimalPoint(): void;
  insertDigit(value: number): void;
  negate(): void;
  operation: Operation | undefined;
  perCent(): void;
  setOperation(value: Operation): void;
}

export const useCalculator = (): UseCalculatorResult => {
  const [displayedValue, setDisplayedValue] = useState('');

  const [operand, setOperand] = useState('');
  const [op, setOp] = useState<Operation | undefined>();

  const insertDigit = (value: number) =>
    setDisplayedValue(
      !displayedValue || displayedValue === defaultDisplayValue
        ? value.toString()
        : displayedValue + value,
    );

  const insertDecimalPoint = () => {
    if (displayedValue.includes(decimalPoint)) {
      return;
    }

    setDisplayedValue((displayedValue || defaultDisplayValue) + decimalPoint);
  };

  const setOperation = (value: Operation) => {
    if (!operand) {
      setOperand(displayedValue || defaultDisplayValue);
      setDisplayedValue(defaultDisplayValue);
    }

    setOp(value);
  };

  const negate = () => {
    if (!displayedValue || displayedValue === defaultDisplayValue) {
      return;
    }

    setDisplayedValue(
      displayedValue.startsWith('-')
        ? displayedValue.substring(1)
        : `-${displayedValue}`,
    );
  };

  const perCent = () =>
    setDisplayedValue((Number(displayedValue) / 100).toString());

  const clear = () => {
    setDisplayedValue('');

    setOperand('');
    setOp(undefined);
  };

  const calculate = () => {
    if (!operand || !op) {
      return;
    }

    const leftOperand = Number(operand);
    const rightOperand = Number(displayedValue);

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

    setDisplayedValue(result.toString());
  };

  return {
    calculate,
    clear,
    displayedValue,
    insertDecimalPoint,
    insertDigit,
    negate,
    operation: op,
    perCent,
    setOperation,
  };
};
